const canvas_T2 = document.getElementById("glCanvas2");
const gl_T2 = canvas_T2.getContext("webgl2");

if (!gl_T2) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

const vertices_T2 = new Float32Array([
         0.0,  0.5,
        -0.5, -0.5,
         0.5, -0.5
    ]);

// --------------------------------------------------
// COLORS
// --------------------------------------------------

const colors_T2 = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    ]);

// --------------------------------------------------
// 2. BUFFER
// --------------------------------------------------

const verticesBuffer_T2 = gl_T2.createBuffer();

gl_T2.bindBuffer(gl_T2.ARRAY_BUFFER, verticesBuffer_T2);

gl_T2.bufferData(
    gl_T2.ARRAY_BUFFER,
    vertices_T2,
    gl_T2.STATIC_DRAW
);

const colorsBuffer_T2 = gl_T2.createBuffer();

gl_T2.bindBuffer(gl_T2.ARRAY_BUFFER, colorsBuffer_T2);

gl_T2.bufferData(
    gl_T2.ARRAY_BUFFER,
    colors_T2,
    gl_T2.STATIC_DRAW
);

// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_T2 = `#version 300 es

in vec2 aPosition;
in vec3 aColor;

out vec3 vColor;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vColor = aColor;
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_T2 = `#version 300 es

precision mediump float;

in vec3 vColor;

out vec4 outColor;

void main() {
    outColor = vec4(vColor, 1.0);
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


const vertexShader_T2 = createShader(
    gl_T2,
    gl_T2.VERTEX_SHADER,
    vertexShaderSource_T2
);

const fragmentShader_T2 = createShader(
    gl_T2,
    gl_T2.FRAGMENT_SHADER,
    fragmentShaderSource_T2
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_T2 = gl_T2.createProgram();

gl_T2.attachShader(program_T2, vertexShader_T2);
gl_T2.attachShader(program_T2, fragmentShader_T2);

gl_T2.linkProgram(program_T2);

if (!gl_T2.getProgramParameter(program_T2, gl_T2.LINK_STATUS)) {

    throw new Error(
        gl_T2.getProgramInfoLog(program_T2)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_T2 =
    gl_T2.getAttribLocation(
        program_T2,
        "aPosition"
    );

const colorLocation_T2 =
    gl_T2.getAttribLocation(
        program_T2,
        "aColor"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_T2.bindBuffer(gl_T2.ARRAY_BUFFER, verticesBuffer_T2);

gl_T2.enableVertexAttribArray(positionLocation_T2);

gl_T2.vertexAttribPointer(
    positionLocation_T2,
    2,
    gl_T2.FLOAT,
    false,
    0,
    0
);

gl_T2.bindBuffer(gl_T2.ARRAY_BUFFER, colorsBuffer_T2);

gl_T2.enableVertexAttribArray(colorLocation_T2);

gl_T2.vertexAttribPointer(
    colorLocation_T2,
    3,
    gl_T2.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_T2.clearColor(0.1, 0.1, 0.1, 1.0);

gl_T2.clear(gl_T2.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_T2.useProgram(program_T2);

gl_T2.drawArrays(
    gl_T2.TRIANGLES,
    0, 
    vertices_T2.length / 2
);