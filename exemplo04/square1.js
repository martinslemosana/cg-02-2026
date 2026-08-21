const canvas_square1 = document.getElementById("glCanvas3");
const gl_square1 = canvas_square1.getContext("webgl2");

if (!gl_square1) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

const vertices_square1 = new Float32Array([
        -0.5,  0.5,
         0.5,  0.5,
         0.5, -0.5,
        -0.5, -0.5,
         0.5, -0.5,
        -0.5,  0.5
    ]);

// --------------------------------------------------
// COLORS
// --------------------------------------------------

function squareColors_square1(){
    let color = [Math.random(), Math.random(), Math.random()];
    let colorValues = [];
    for(let i=0;i<6;i++){
        colorValues.push(color[0], color[1], color[2]); // Push individual RGB values
    }
    return new Float32Array(colorValues);
}

const colors_square1 = squareColors_square1();

// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_square1 = gl_square1.createBuffer();

gl_square1.bindBuffer(gl_square1.ARRAY_BUFFER, verticesBuffer_square1);

gl_square1.bufferData(
    gl_square1.ARRAY_BUFFER,
    vertices_square1,
    gl_square1.STATIC_DRAW
);

const colorsBuffer_square1 = gl_square1.createBuffer();

gl_square1.bindBuffer(gl_square1.ARRAY_BUFFER, colorsBuffer_square1);

gl_square1.bufferData(
    gl_square1.ARRAY_BUFFER,
    colors_square1,
    gl_square1.STATIC_DRAW
);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_square1 = `#version 300 es

in vec2 aPosition;
in vec3 aColors;

out vec3 vColors;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vColors = aColors;
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource_square1 = `#version 300 es

precision mediump float;

in vec3 vColors;

out vec4 outColor;

void main() {
    outColor = vec4(vColors, 1.0);
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


const vertexShader_square1 = createShader(
    gl_square1,
    gl_square1.VERTEX_SHADER,
    vertexShaderSource_square1
);

const fragmentShader_square1 = createShader(
    gl_square1,
    gl_square1.FRAGMENT_SHADER,
    fragmentShaderSource_square1
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_square1 = gl_square1.createProgram();

gl_square1.attachShader(program_square1, vertexShader_square1);
gl_square1.attachShader(program_square1, fragmentShader_square1);

gl_square1.linkProgram(program_square1);

if (!gl_square1.getProgramParameter(program_square1, gl_square1.LINK_STATUS)) {

    throw new Error(
        gl_square1.getProgramInfoLog(program_square1)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_square1 =
    gl_square1.getAttribLocation(
        program_square1,
        "aPosition"
    );

const colorsLocation_square1 =
    gl_square1.getAttribLocation(
        program_square1,
        "aColors"
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_square1.bindBuffer(gl_square1.ARRAY_BUFFER, verticesBuffer_square1);

gl_square1.enableVertexAttribArray(positionLocation_square1);

gl_square1.vertexAttribPointer(
    positionLocation_square1,
    2,
    gl_square1.FLOAT,
    false,
    0,
    0
);

gl_square1.bindBuffer(gl_square1.ARRAY_BUFFER, colorsBuffer_square1);

gl_square1.enableVertexAttribArray(colorsLocation_square1);

gl_square1.vertexAttribPointer(
    colorsLocation_square1,
    3,
    gl_square1.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 9. LIMPAR TELA
// --------------------------------------------------

gl_square1.clearColor(0.1, 0.1, 0.1, 1.0);

gl_square1.clear(gl_square1.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_square1.useProgram(program_square1);

gl_square1.drawArrays(
    gl_square1.TRIANGLES,
    0, 
    vertices_square1.length / 2
);