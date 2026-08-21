const canvas_square2 = document.getElementById("glCanvas4");
const gl_square2 = canvas_square2.getContext("webgl2");

if (!gl_square2) {
    throw new Error("WebGL 2 não é suportado.");
}


// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

let vertices_square2 = [];

function setSquareVertices_square2(x,y,weight,height){
    return new Float32Array([
        x,y+height,
        x+weight,y+height,
        x+weight,y,
        x,y,
        x+weight,y,
        x,y+height
    ]);
}


// --------------------------------------------------
// COLORS
// --------------------------------------------------

let colors_square2 = [];

function setSquareColors_square2(){
    let color = [Math.random(), Math.random(), Math.random()];
    let colorValues = [];
    for(let i=0;i<6;i++)
        colorValues.push(...color);
    return new Float32Array(colorValues);
}

// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer_square2 = gl_square2.createBuffer();

const colorsBuffer_square2 = gl_square2.createBuffer();

gl_square2.bindBuffer(gl_square2.ARRAY_BUFFER, colorsBuffer_square2);

gl_square2.bufferData(
    gl_square2.ARRAY_BUFFER,
    colors_square2,
    gl_square2.STATIC_DRAW
);


// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource_square2 = `#version 300 es

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

const fragmentShaderSource_square2 = `#version 300 es

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


const vertexShader_square2 = createShader(
    gl_square2,
    gl_square2.VERTEX_SHADER,
    vertexShaderSource_square2
);

const fragmentShader_square2 = createShader(
    gl_square2,
    gl_square2.FRAGMENT_SHADER,
    fragmentShaderSource_square2
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program_square2 = gl_square2.createProgram();

gl_square2.attachShader(program_square2, vertexShader_square2);
gl_square2.attachShader(program_square2, fragmentShader_square2);

gl_square2.linkProgram(program_square2);

if (!gl_square2.getProgramParameter(program_square2, gl_square2.LINK_STATUS)) {

    throw new Error(
        gl_square2.getProgramInfoLog(program_square2)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS
// --------------------------------------------------

const positionLocation_square2 =
    gl_square2.getAttribLocation(
        program_square2,
        "aPosition"
    );

const colorsLocation_square2 =
    gl_square2.getAttribLocation(
        program_square2,
        "aColors"
    );

// --------------------------------------------------
// 8. LIMPAR TELA
// --------------------------------------------------

gl_square2.clearColor(0.1, 0.1, 0.1, 1.0);

gl_square2.clear(gl_square2.COLOR_BUFFER_BIT);

// --------------------------------------------------
// 9. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_square2.bindBuffer(gl_square2.ARRAY_BUFFER, verticesBuffer_square2);

vertices_square2 = setSquareVertices_square2(0.25,0.25,0.25,0.25);

gl_square2.bufferData(
    gl_square2.ARRAY_BUFFER,
    vertices_square2,
    gl_square2.STATIC_DRAW
);

gl_square2.enableVertexAttribArray(positionLocation_square2);

gl_square2.vertexAttribPointer(
    positionLocation_square2,
    2,
    gl_square2.FLOAT,
    false,
    0,
    0
);

gl_square2.bindBuffer(gl_square2.ARRAY_BUFFER, colorsBuffer_square2);

colors_square2 = setSquareColors_square2();

gl_square2.bufferData(
    gl_square2.ARRAY_BUFFER,
    colors_square2,
    gl_square2.STATIC_DRAW
);

gl_square2.enableVertexAttribArray(colorsLocation_square2);

gl_square2.vertexAttribPointer(
    colorsLocation_square2,
    3,
    gl_square2.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 10. DESENHAR
// --------------------------------------------------

gl_square2.useProgram(program_square2);

gl_square2.drawArrays(
    gl_square2.TRIANGLES,
    0, 
    vertices_square2.length / 2
);

// --------------------------------------------------
// 11. CONFIGURAR ATRIBUTOS
// --------------------------------------------------

gl_square2.bindBuffer(gl_square2.ARRAY_BUFFER, verticesBuffer_square2);

vertices_square2 = setSquareVertices_square2(-0.5,-0.5,0.25,0.25);

gl_square2.bufferData(
    gl_square2.ARRAY_BUFFER,
    vertices_square2,
    gl_square2.STATIC_DRAW
);

gl_square2.enableVertexAttribArray(positionLocation_square2);

gl_square2.vertexAttribPointer(
    positionLocation_square2,
    2,
    gl_square2.FLOAT,
    false,
    0,
    0
);

gl_square2.bindBuffer(gl_square2.ARRAY_BUFFER, colorsBuffer_square2);

colors_square2 = setSquareColors_square2();

gl_square2.bufferData(
    gl_square2.ARRAY_BUFFER,
    colors_square2,
    gl_square2.STATIC_DRAW
);

gl_square2.enableVertexAttribArray(colorsLocation_square2);

gl_square2.vertexAttribPointer(
    colorsLocation_square2,
    3,
    gl_square2.FLOAT,
    false,
    0,
    0
);

// --------------------------------------------------
// 12. DESENHAR
// --------------------------------------------------

gl_square2.useProgram(program_square2);

gl_square2.drawArrays(
    gl_square2.TRIANGLES,
    0, 
    vertices_square2.length / 2
);