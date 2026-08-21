const canvas_lineLoop = document.getElementById("glCanvasLoop");
const gl_lineLoop = canvas_lineLoop.getContext("webgl2");

if (!gl_lineLoop) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

function hexagonVertices() {
    const vertices = [];
    const radius = 0.6;
    const numSides = 6;
    
    for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        vertices.push(x, y);
    }
    
    return new Float32Array(vertices);
}

const vertices_lineLoop = hexagonVertices();


// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_lineLoop = gl_lineLoop.createBuffer();

gl_lineLoop.bindBuffer(gl_lineLoop.ARRAY_BUFFER, verticesBuffer_lineLoop);

gl_lineLoop.bufferData(
    gl_lineLoop.ARRAY_BUFFER,
    vertices_lineLoop,
    gl_lineLoop.STATIC_DRAW
);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_lineLoop = `#version 300 es

in vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_lineLoop = `#version 300 es

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


const vertexShader_lineLoop = createShader(
    gl_lineLoop,
    gl_lineLoop.VERTEX_SHADER,
    vertexShaderSource_lineLoop
);

const fragmentShader_lineLoop = createShader(
    gl_lineLoop,
    gl_lineLoop.FRAGMENT_SHADER,
    fragmentShaderSource_lineLoop
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_lineLoop = gl_lineLoop.createProgram();

gl_lineLoop.attachShader(program_lineLoop, vertexShader_lineLoop);
gl_lineLoop.attachShader(program_lineLoop, fragmentShader_lineLoop);

gl_lineLoop.linkProgram(program_lineLoop);

if (!gl_lineLoop.getProgramParameter(program_lineLoop, gl_lineLoop.LINK_STATUS)) {

    throw new Error(
        gl_lineLoop.getProgramInfoLog(program_lineLoop)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_lineLoop =
    gl_lineLoop.getAttribLocation(
        program_lineLoop,
        "aPosition"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_lineLoop.bindBuffer(gl_lineLoop.ARRAY_BUFFER, verticesBuffer_lineLoop);

gl_lineLoop.enableVertexAttribArray(positionLocation_lineLoop);

gl_lineLoop.vertexAttribPointer(
    positionLocation_lineLoop,
    2,
    gl_lineLoop.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_lineLoop.clearColor(0.1, 0.1, 0.1, 1.0);

gl_lineLoop.clear(gl_lineLoop.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_lineLoop.useProgram(program_lineLoop);

gl_lineLoop.drawArrays(
    gl_lineLoop.LINE_LOOP,
    0, 
    vertices_lineLoop.length / 2
);