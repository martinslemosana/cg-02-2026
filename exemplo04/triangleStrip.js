const canvas_TStrip = document.getElementById("glCanvasTStrip");
const gl_TStrip = canvas_TStrip.getContext("webgl2");

if (!gl_TStrip) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

const vertices_TStrip = new Float32Array([
        -0.8,  0.2,  // 0: Top-left
        -0.8, -0.2,  // 1: Bottom-left
        -0.4,  0.4,  // 2: Top-center-left
        -0.4, -0.4,  // 3: Bottom-center-left
         0.0,  0.2,  // 4: Top-center
         0.0, -0.2,  // 5: Bottom-center
         0.4,  0.4,  // 6: Top-center-right
         0.4, -0.4,  // 7: Bottom-center-right
         0.8,  0.2,  // 8: Top-right
         0.8, -0.2   // 9: Bottom-right
    ]);


// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_TStrip = gl_TStrip.createBuffer();

gl_TStrip.bindBuffer(gl_TStrip.ARRAY_BUFFER, verticesBuffer_TStrip);

gl_TStrip.bufferData(
    gl_TStrip.ARRAY_BUFFER,
    vertices_TStrip,
    gl_TStrip.STATIC_DRAW
);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_TStrip = `#version 300 es

in vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_TStrip = `#version 300 es

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


const vertexShader_TStrip = createShader(
    gl_TStrip,
    gl_TStrip.VERTEX_SHADER,
    vertexShaderSource_TStrip
);

const fragmentShader_TStrip = createShader(
    gl_TStrip,
    gl_TStrip.FRAGMENT_SHADER,
    fragmentShaderSource_TStrip
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_TStrip = gl_TStrip.createProgram();

gl_TStrip.attachShader(program_TStrip, vertexShader_TStrip);
gl_TStrip.attachShader(program_TStrip, fragmentShader_TStrip);

gl_TStrip.linkProgram(program_TStrip);

if (!gl_TStrip.getProgramParameter(program_TStrip, gl_TStrip.LINK_STATUS)) {

    throw new Error(
        gl_TStrip.getProgramInfoLog(program_TStrip)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_TStrip =
    gl_TStrip.getAttribLocation(
        program_TStrip,
        "aPosition"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_TStrip.bindBuffer(gl_TStrip.ARRAY_BUFFER, verticesBuffer_TStrip);

gl_TStrip.enableVertexAttribArray(positionLocation_TStrip);

gl_TStrip.vertexAttribPointer(
    positionLocation_TStrip,
    2,
    gl_TStrip.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_TStrip.clearColor(0.1, 0.1, 0.1, 1.0);

gl_TStrip.clear(gl_TStrip.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_TStrip.useProgram(program_TStrip);

gl_TStrip.drawArrays(
    gl_TStrip.TRIANGLE_STRIP,
    0, 
    10
);