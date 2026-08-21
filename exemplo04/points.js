const canvas_points = document.getElementById("glCanvasPoints");
const gl_points = canvas_points.getContext("webgl2");

if (!gl_points) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------


const vertices_points = new Float32Array([
    -0.7,  0.6,   // Top-left
    -0.2,  0.8,   // Top-center
     0.3,  0.4,   // Top-right
    -0.8,  0.0,   // Middle-left
     0.0,  0.0,   // Center
     0.6, -0.2,   // Middle-right
    -0.4, -0.6,   // Bottom-left
     0.1, -0.8,   // Bottom-center
     0.7, -0.5    // Bottom-right
]);


const pointSizes = new Float32Array([
    5.0,
    10.0,
    15.0,
    20.0,
    25.0,
    30.0,
    35.0,
    40.0,
    45.0
]);

// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_points = gl_points.createBuffer();

gl_points.bindBuffer(gl_points.ARRAY_BUFFER, verticesBuffer_points);

gl_points.bufferData(
    gl_points.ARRAY_BUFFER,
    vertices_points,
    gl_points.STATIC_DRAW
);

const sizeBuffer_points = gl_points.createBuffer();

gl_points.bindBuffer(gl_points.ARRAY_BUFFER, sizeBuffer_points);

gl_points.bufferData(
    gl_points.ARRAY_BUFFER, 
    pointSizes,
    gl_points.STATIC_DRAW);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_points = `#version 300 es

in vec2 aPosition;
in float aPointSize;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    gl_PointSize = aPointSize;
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_points = `#version 300 es

precision mediump float;

out vec4 outColor;

void main() {
    outColor = vec4(1.0, 0.0, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 5. COMPILAR SHADERS
// --------------------------------------------------

function createShader(gl, type, source) {

    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

        const error = gl.getShaderInfoLog(shader);

        gl.deleteShader(shader);

        throw new Error(error);
    }

    return shader;
}


const vertexShader_points = createShader(
    gl_points,
    gl_points.VERTEX_SHADER,
    vertexShaderSource_points
);

const fragmentShader_points = createShader(
    gl_points,
    gl_points.FRAGMENT_SHADER,
    fragmentShaderSource_points
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_points = gl_points.createProgram();

gl_points.attachShader(program_points, vertexShader_points);
gl_points.attachShader(program_points, fragmentShader_points);

gl_points.linkProgram(program_points);

if (!gl_points.getProgramParameter(program_points,gl_points.LINK_STATUS)) {

    throw new Error(
        gl_points.getProgramInfoLog(program_points)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_points =
    gl_points.getAttribLocation(
        program_points,
        "aPosition"
    );

const pointSizeLocation_points = 
    gl_points.getAttribLocation(
        program_points, 
        "aPointSize"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_points.bindBuffer(gl_points.ARRAY_BUFFER, verticesBuffer_points);

gl_points.enableVertexAttribArray(positionLocation_points);

gl_points.vertexAttribPointer(
    positionLocation_points,
    2,
    gl_points.FLOAT,
    false,
    0,
    0
);

gl_points.bindBuffer(gl_points.ARRAY_BUFFER, sizeBuffer_points);

gl_points.enableVertexAttribArray(pointSizeLocation_points);
    
gl_points.vertexAttribPointer(pointSizeLocation_points, 1, gl_points.FLOAT, false, 0, 0);
    

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_points.clearColor(0.1, 0.1, 0.1, 1.0);

gl_points.clear(gl_points.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_points.useProgram(program_points);

gl_points.drawArrays(
    gl_points.LINE_POINTS,
    0, 
    vertices_points.length / 2
);