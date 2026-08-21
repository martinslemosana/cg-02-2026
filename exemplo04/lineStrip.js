const canvas_strip = document.getElementById("glCanvasStrip");
const gl_strip = canvas_strip.getContext("webgl2");

if (!gl_strip) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

const vertices_strip = new Float32Array([
        -0.8, -0.5,  // Start point (bottom-left)
        -0.4,  0.5,  // Up
         0.0, -0.5,  // Down
         0.4,  0.5,  // Up
         0.8, -0.5   // Down (end point)
    ]);


// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_strip = gl_strip.createBuffer();

gl_strip.bindBuffer(gl_strip.ARRAY_BUFFER, verticesBuffer_strip);

gl_strip.bufferData(
    gl_strip.ARRAY_BUFFER,
    vertices_strip,
    gl_strip.STATIC_DRAW
);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_strip = `#version 300 es

in vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_strip = `#version 300 es

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


const vertexShader_strip = createShader(
    gl_strip,
    gl_strip.VERTEX_SHADER,
    vertexShaderSource_strip
);

const fragmentShader_strip = createShader(
    gl_strip,
    gl_strip.FRAGMENT_SHADER,
    fragmentShaderSource_strip
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_strip = gl_strip.createProgram();

gl_strip.attachShader(program_strip, vertexShader_strip);
gl_strip.attachShader(program_strip, fragmentShader_strip);

gl_strip.linkProgram(program_strip);

if (!gl_strip.getProgramParameter(program_strip, gl_strip.LINK_STATUS)) {

    throw new Error(
        gl_strip.getProgramInfoLog(program_strip)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_strip =
    gl_strip.getAttribLocation(
        program_strip,
        "aPosition"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_strip.bindBuffer(gl_strip.ARRAY_BUFFER, verticesBuffer_strip);

gl_strip.enableVertexAttribArray(positionLocation_strip);

gl_strip.vertexAttribPointer(
    positionLocation_strip,
    2,
    gl_strip.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_strip.clearColor(0.1, 0.1, 0.1, 1.0);

gl_strip.clear(gl_strip.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_strip.useProgram(program_strip);

gl_strip.drawArrays(
    gl_strip.LINE_STRIP,
    0, 
    vertices_strip.length / 2
);