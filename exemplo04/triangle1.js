const canvas_T1 = document.getElementById("glCanvas1");
const gl_T1 = canvas_T1.getContext("webgl2");

if (!gl_T1) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

const vertices_T1 = new Float32Array([
         0.0,  0.5,
        -0.5, -0.5,
         0.5, -0.5
    ]);



// --------------------------------------------------
// 2. BUFFER
// --------------------------------------------------

const verticesBuffer_T1 = gl_T1.createBuffer();

gl_T1.bindBuffer(gl_T1.ARRAY_BUFFER, verticesBuffer_T1);

gl_T1.bufferData(
    gl_T1.ARRAY_BUFFER,
    vertices_T1,
    gl_T1.STATIC_DRAW
);

// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_T1 = `#version 300 es

in vec2 aPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_T1 = `#version 300 es

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


const vertexShader_T1 = createShader(
    gl_T1,
    gl_T1.VERTEX_SHADER,
    vertexShaderSource_T1
);

const fragmentShader_T1 = createShader(
    gl_T1,
    gl_T1.FRAGMENT_SHADER,
    fragmentShaderSource_T1
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_T1 = gl_T1.createProgram();

gl_T1.attachShader(program_T1, vertexShader_T1);
gl_T1.attachShader(program_T1, fragmentShader_T1);

gl_T1.linkProgram(program_T1);

if (!gl_T1.getProgramParameter(program_T1, gl_T1.LINK_STATUS)) {

    throw new Error(
        gl_T1.getProgramInfoLog(program_T1)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_T1 =
    gl_T1.getAttribLocation(
        program_T1,
        "aPosition"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_T1.bindBuffer(gl_T1.ARRAY_BUFFER, verticesBuffer_T1);

gl_T1.enableVertexAttribArray(positionLocation_T1);

gl_T1.vertexAttribPointer(
    positionLocation_T1,
    2,
    gl_T1.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_T1.clearColor(0.1, 0.1, 0.1, 1.0);

gl_T1.clear(gl_T1.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_T1.useProgram(program_T1);

gl_T1.drawArrays(
    gl_T1.TRIANGLES,
    0, 
    vertices_T1.length / 2
);