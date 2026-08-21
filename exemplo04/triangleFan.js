const canvas_TFan = document.getElementById("glCanvasFan");
const gl_TFan = canvas_TFan.getContext("webgl2");

if (!gl_TFan) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

function circleVertices() {
    const vertices = [];

    // Center point of the pentagon
    vertices.push(0.0, 0.0);

    // Calculate pentagon vertices
    const radius = 0.6;
    const numSides = 40;

    for (let i = 0; i <= numSides; i++) {
        const angle = i * 2 * Math.PI / numSides;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        vertices.push(x, y);
    }

    return new Float32Array(vertices);
}

const vertices_TFan = circleVertices();


// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_TFan = gl_TFan.createBuffer();

gl_TFan.bindBuffer(gl_TFan.ARRAY_BUFFER, verticesBuffer_TFan);

gl_TFan.bufferData(
    gl_TFan.ARRAY_BUFFER,
    vertices_TFan,
    gl_TFan.STATIC_DRAW
);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_TFan = `#version 300 es

in vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_TFan = `#version 300 es

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


const vertexShader_TFan = createShader(
    gl_TFan,
    gl_TFan.VERTEX_SHADER,
    vertexShaderSource_TFan
);

const fragmentShader_TFan = createShader(
    gl_TFan,
    gl_TFan.FRAGMENT_SHADER,
    fragmentShaderSource_TFan
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_TFan = gl_TFan.createProgram();

gl_TFan.attachShader(program_TFan, vertexShader_TFan);
gl_TFan.attachShader(program_TFan, fragmentShader_TFan);

gl_TFan.linkProgram(program_TFan);

if (!gl_TFan.getProgramParameter(program_TFan, gl_TFan.LINK_STATUS)) {

    throw new Error(
        gl_TFan.getProgramInfoLog(program_TFan)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_TFan =
    gl_TFan.getAttribLocation(
        program_TFan,
        "aPosition"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_TFan.bindBuffer(gl_TFan.ARRAY_BUFFER, verticesBuffer_TFan);

gl_TFan.enableVertexAttribArray(positionLocation_TFan);

gl_TFan.vertexAttribPointer(
    positionLocation_TFan,
    2,
    gl_TFan.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_TFan.clearColor(0.1, 0.1, 0.1, 1.0);

gl_TFan.clear(gl_TFan.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_TFan.useProgram(program_TFan);

gl_TFan.drawArrays(
    gl_TFan.TRIANGLE_FAN,
    0, 
    42
);