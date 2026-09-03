const canvas1 = document.getElementById("canvas-translacao");
const gl1 = canvas1.getContext("webgl2");

if (!gl1) {
    throw new Error("WebGL 2 não é suportado.");
}

const canvas2 = document.getElementById("canvas-rotacao");
const gl2 = canvas2.getContext("webgl2");

if (!gl2) {
    throw new Error("WebGL 2 não é suportado.");
}

const canvas3 = document.getElementById("canvas-escala");
const gl3 = canvas3.getContext("webgl2");

if (!gl3) {
    throw new Error("WebGL 2 não é suportado.");
}

// --------------------------------------------------
// INTERFACE
// --------------------------------------------------



// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

let verticesTriangulo = new Float32Array([
   0.0,   0.15,
  -0.15, -0.15,
   0.15, -0.15
]);

let verticesEixos = new Float32Array([
  -1.0,  0.0,
   1.0,  0.0,
   0.0, -1.0,
   0.0,  1.0,
   -0.25, 0.03,
    -0.25, -0.03,
    0.25, 0.03,
    0.25, -0.03,
    -0.5, 0.03,
    -0.5, -0.03,
    0.5, 0.03,
    0.5, -0.03,
    -0.75, 0.03,
    -0.75, -0.03,
    0.75, 0.03,
    0.75, -0.03,
    0.03, -0.25,
    -0.03, -0.25,
    0.03, 0.25,
    -0.03, 0.25,
    0.03, -0.5,
    -0.03, -0.5,
    0.03, 0.5,
    -0.03, 0.5,
    0.03, -0.75,
    -0.03, -0.75,
    0.03, 0.75,
    -0.03, 0.75
]);

// --------------------------------------------------
// 1. CORES
// --------------------------------------------------

let color = new Float32Array([
  1.0, 1.0, 1.0,
]);

// --------------------------------------------------
// 1. TRANSFORMAÇÃO
// --------------------------------------------------

let tx = 0.0;
let ty = 0.0;

let txOffset = 0.005;
let tyOffset = 0.005;

let theta = 0.0

let sx = 1.0;
let sy = 1.0;

let sxOffset = 0.005;
let syOffset = 0.005;

let thetaOffset = 1.0;

let M_translacao = m3.translation(tx,ty);
let M_rotacao = m3.translation(-0.5, 0.0);
let M_escala = m3.translation(0.25, 0.25);

// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBufferTranslacao = gl1.createBuffer();

gl1.bindBuffer(gl1.ARRAY_BUFFER, verticesBufferTranslacao);

gl1.bufferData(
    gl1.ARRAY_BUFFER,
    verticesTriangulo,
    gl1.STATIC_DRAW
);

const verticesBufferRotacao = gl2.createBuffer();

gl2.bindBuffer(gl2.ARRAY_BUFFER, verticesBufferRotacao);

gl2.bufferData(
    gl2.ARRAY_BUFFER,
    verticesTriangulo,
    gl2.STATIC_DRAW
);

const verticesBufferEscala = gl3.createBuffer();

gl3.bindBuffer(gl3.ARRAY_BUFFER, verticesBufferEscala);

gl3.bufferData(
    gl3.ARRAY_BUFFER,
    verticesTriangulo,
    gl3.STATIC_DRAW
);

// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource = `#version 300 es

in vec2 aPosition;

uniform mat3 u_transform;

void main() {
    vec3 position = u_transform * vec3(aPosition, 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource = `#version 300 es

precision mediump float;

uniform vec3 u_color;

out vec4 outColor;

void main() {
    outColor = vec4(u_color, 1.0);
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


const vertexShaderTranslacao = createShader(
    gl1,
    gl1.VERTEX_SHADER,
    vertexShaderSource
);

const fragmentShaderTranslacao = createShader(
    gl1,
    gl1.FRAGMENT_SHADER,
    fragmentShaderSource    
);

const vertexShaderRotacao = createShader(
    gl2,
    gl2.VERTEX_SHADER,
    vertexShaderSource
);

const fragmentShaderRotacao = createShader(
    gl2,
    gl2.FRAGMENT_SHADER,
    fragmentShaderSource
);

const vertexShaderEscala = createShader(
    gl3,
    gl3.VERTEX_SHADER,
    vertexShaderSource
);

const fragmentShaderEscala = createShader(
    gl3,
    gl3.FRAGMENT_SHADER,
    fragmentShaderSource
);

// --------------------------------------------------
// 6. CRIAR PROGRAMAS
// --------------------------------------------------

const programTranslacao = gl1.createProgram();

gl1.attachShader(programTranslacao, vertexShaderTranslacao);
gl1.attachShader(programTranslacao, fragmentShaderTranslacao);

gl1.linkProgram(programTranslacao);

if (!gl1.getProgramParameter(programTranslacao, gl1.LINK_STATUS)) {

    throw new Error(
        gl1.getProgramInfoLog(programTranslacao)
    );
}

const programRotacao = gl2.createProgram();

gl2.attachShader(programRotacao, vertexShaderRotacao);
gl2.attachShader(programRotacao, fragmentShaderRotacao);

gl2.linkProgram(programRotacao);

if (!gl2.getProgramParameter(programRotacao, gl2.LINK_STATUS)) {

    throw new Error(
        gl2.getProgramInfoLog(programRotacao)
    );
}

const programEscala = gl3.createProgram();

gl3.attachShader(programEscala, vertexShaderEscala);
gl3.attachShader(programEscala, fragmentShaderEscala);

gl3.linkProgram(programEscala);

if (!gl3.getProgramParameter(programEscala, gl3.LINK_STATUS)) {

    throw new Error(
        gl3.getProgramInfoLog(programEscala)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS E DO UNIFORM
// --------------------------------------------------

const positionLocationTranslacao =
    gl1.getAttribLocation(
        programTranslacao,
        "aPosition"
    );

const colorLocationTranslacao = 
    gl1.getUniformLocation( 
        programTranslacao,
        "u_color"
    );

const transformLocationTranslacao = 
    gl1.getUniformLocation( 
        programTranslacao,
        "u_transform"
    );

const positionLocationRotacao =
    gl2.getAttribLocation(
        programRotacao,
        "aPosition"
    );

const colorLocationRotacao = 
    gl2.getUniformLocation( 
        programRotacao,
        "u_color"
    );

const transformLocationRotacao = 
    gl2.getUniformLocation( 
        programRotacao,
        "u_transform"
    );

const positionLocationEscala =
    gl3.getAttribLocation(
        programEscala,
        "aPosition"
    );

const colorLocationEscala = 
    gl3.getUniformLocation( 
        programEscala,
        "u_color"
    );

const transformLocationEscala = 
    gl3.getUniformLocation( 
        programEscala,
        "u_transform" 
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS E UNIFORM
// --------------------------------------------------

gl1.useProgram(programTranslacao);

gl1.bindBuffer(gl1.ARRAY_BUFFER, verticesBufferTranslacao);

gl1.enableVertexAttribArray(positionLocationTranslacao);

gl1.vertexAttribPointer(
    positionLocationTranslacao,
    2,
    gl1.FLOAT,
    false,
    0,
    0
);

gl1.uniform3fv(
    colorLocationTranslacao,
    color
);

gl1.uniformMatrix3fv(
    transformLocationTranslacao,
    false,
    M_translacao 
);

gl2.useProgram(programRotacao);

gl2.bindBuffer(gl2.ARRAY_BUFFER, verticesBufferRotacao);

gl2.enableVertexAttribArray(positionLocationRotacao);

gl2.vertexAttribPointer(
    positionLocationRotacao,
    2,
    gl2.FLOAT,
    false,
    0,
    0
);

gl2.uniform3fv(
    colorLocationRotacao,
    color
);

gl2.uniformMatrix3fv(
    transformLocationRotacao,
    false,
    M_rotacao
);

gl3.useProgram(programEscala);

gl3.bindBuffer(gl3.ARRAY_BUFFER, verticesBufferEscala);

gl3.enableVertexAttribArray(positionLocationEscala);

gl3.vertexAttribPointer(
    positionLocationEscala,
    2,
    gl3.FLOAT,
    false,
    0,
    0
);

gl3.uniform3fv(
    colorLocationEscala,
    color
);

gl3.uniformMatrix3fv(
    transformLocationEscala,
    false,
    M_escala
);

// --------------------------------------------------
// 10. LIMPAR TELAS
// --------------------------------------------------

gl1.clearColor(0.0, 0.0, 0.0, 1.0);

gl2.clearColor(0.0, 0.0, 0.0, 1.0);

gl3.clearColor(0.0, 0.0, 0.0, 1.0);

// --------------------------------------------------
// 11. DESENHAR
// --------------------------------------------------

const numComponents = 2;

function drawScene(){
    atualizaTransformacao();

    drawTranslacao();

    drawRotacao();

    drawEscala();

    requestAnimationFrame(drawScene);
}

function atualizaTransformacao(){
    tx += txOffset;
    ty += tyOffset;

    if (tx > 1.0 || tx < 0.0) {
        txOffset = -txOffset;
    }

    if (ty > 1.0 || ty < 0.0) {
        tyOffset = -tyOffset;
    }

    theta += thetaOffset;
    if (theta > 360) {
        theta = 0;
    }

    sx += sxOffset;
    sy += syOffset;
    
    if (sx > 2.0 || sx < 0.5) {
        sxOffset = -sxOffset;
    }

    if (sy > 2.0 || sy < 0.5) {
        syOffset = -syOffset;
    }
}

function drawTranslacao(){
    gl1.clear(gl1.COLOR_BUFFER_BIT);
    gl1.useProgram(programTranslacao);

    drawEixos(gl1, programTranslacao, verticesBufferTranslacao, colorLocationTranslacao, transformLocationTranslacao);

    M_translacao = m3.translation(-0.5, -0.5);
    color = new Float32Array([1.0, 0.3, 0.3]);
    drawTriangulo(gl1, verticesBufferTranslacao, colorLocationTranslacao, transformLocationTranslacao, M_translacao, color);

    M_translacao = m3.translation(-0.5, -0.5);
    M_translacao = m3.multiply(m3.translation(tx, ty),M_translacao);
    color = new Float32Array([0.2, 0.6, 1.0]);
    drawTriangulo(gl1, verticesBufferTranslacao, colorLocationTranslacao, transformLocationTranslacao, M_translacao, color);

    M_translacao = m3.translation(tx, ty);
    atualizarMatrizTranslacao();
}

function atualizarMatrizTranslacao() {

    document.getElementById("trans00").textContent =
        M_translacao[0].toFixed(2);

    document.getElementById("trans01").textContent =
        M_translacao[3].toFixed(2);

    document.getElementById("trans02").textContent =
        M_translacao[6].toFixed(2);

    document.getElementById("trans10").textContent =
        M_translacao[1].toFixed(2);

    document.getElementById("trans11").textContent =
        M_translacao[4].toFixed(2);

    document.getElementById("trans12").textContent =
        M_translacao[7].toFixed(2);

    document.getElementById("trans20").textContent =
        M_translacao[2].toFixed(2);

    document.getElementById("trans21").textContent =
        M_translacao[5].toFixed(2);

    document.getElementById("trans22").textContent =
        M_translacao[8].toFixed(2);

    document.getElementById("valorTx").textContent = tx.toFixed(2);
    document.getElementById("valorTy").textContent = ty.toFixed(2);
}

function drawRotacao(){
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    gl2.useProgram(programRotacao);

    drawEixos(gl2, programRotacao, verticesBufferRotacao, colorLocationRotacao, transformLocationRotacao);

    M_rotacao = m3.translation(0.5, 0.0);
    color = new Float32Array([1.0, 0.3, 0.3]);
    drawTriangulo(gl2, verticesBufferRotacao, colorLocationRotacao, transformLocationRotacao, M_rotacao, color);

    M_rotacao = m3.translation(0.5, 0.0);
    M_rotacao = m3.multiply(m3.rotation(theta * Math.PI / 180), M_rotacao);
    color = new Float32Array([0.2, 0.6, 1.0]);
    drawTriangulo(gl2, verticesBufferRotacao, colorLocationRotacao, transformLocationRotacao, M_rotacao, color);

    M_rotacao = m3.rotation(theta * Math.PI / 180);
    atualizarMatrizRotacao();
}

function atualizarMatrizRotacao() {

    document.getElementById("rot00").textContent =
        M_rotacao[0].toFixed(2);

    document.getElementById("rot01").textContent =
        M_rotacao[3].toFixed(2);

    document.getElementById("rot02").textContent =
        M_rotacao[6].toFixed(2);

    document.getElementById("rot10").textContent =
        M_rotacao[1].toFixed(2);

    document.getElementById("rot11").textContent =
        M_rotacao[4].toFixed(2);

    document.getElementById("rot12").textContent =
        M_rotacao[7].toFixed(2);

    document.getElementById("rot20").textContent =
        M_rotacao[2].toFixed(2);

    document.getElementById("rot21").textContent =
        M_rotacao[5].toFixed(2);

    document.getElementById("rot22").textContent =
        M_rotacao[8].toFixed(2);

    document.getElementById("valorAngulo").textContent = theta.toFixed(2);
}

function drawEscala(){
    gl3.clear(gl3.COLOR_BUFFER_BIT);
    gl3.useProgram(programEscala);
    drawEixos(gl3, programEscala, verticesBufferEscala, colorLocationEscala, transformLocationEscala);

    M_escala = m3.translation(0.25, 0.25);
    color = new Float32Array([1.0, 0.3, 0.3]);
    drawTriangulo(gl3, verticesBufferEscala, colorLocationEscala, transformLocationEscala, M_escala, color);

    M_escala = m3.translation(0.25, 0.25);
    M_escala = m3.multiply(m3.scaling(sx,sy), M_escala);
    color = new Float32Array([0.2, 0.6, 1.0]);
    drawTriangulo(gl3, verticesBufferEscala, colorLocationEscala, transformLocationEscala, M_escala, color);

    M_escala = m3.scaling(sx,sy);
    atualizarMatrizEscala();
}

function atualizarMatrizEscala() {

    document.getElementById("esc00").textContent =
        M_escala[0].toFixed(2);

    document.getElementById("esc01").textContent =
        M_escala[3].toFixed(2);

    document.getElementById("esc02").textContent =
        M_escala[6].toFixed(2);

    document.getElementById("esc10").textContent =
        M_escala[1].toFixed(2);

    document.getElementById("esc11").textContent =
        M_escala[4].toFixed(2);

    document.getElementById("esc12").textContent =
        M_escala[7].toFixed(2);

    document.getElementById("esc20").textContent =
        M_escala[2].toFixed(2);

    document.getElementById("esc21").textContent =
        M_escala[5].toFixed(2);

    document.getElementById("esc22").textContent =
        M_escala[8].toFixed(2);

    document.getElementById("valorSx").textContent = sx.toFixed(2);
    document.getElementById("valorSy").textContent = sy.toFixed(2);
}

function drawEixos(gl, program, verticesBuffer, colorLocation, transformLocation) {
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

    gl.bufferData(
        gl.ARRAY_BUFFER,
        verticesEixos,
        gl.STATIC_DRAW
    );

    let M_eixos = m3.identity();
    let color_eixos = new Float32Array([1.0, 1.0, 1.0]);

    gl.uniform3fv(
        colorLocation,
        color_eixos
    );

    gl.uniformMatrix3fv(
        transformLocation,
        false,
        M_eixos
    );

    gl.drawArrays(
        gl.LINES,
        0,
        verticesEixos.length / numComponents
    );
}

function drawTriangulo(gl, verticesBuffer, colorLocation, transformLocation, M_transform, color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

    gl.bufferData(
        gl.ARRAY_BUFFER,
        verticesTriangulo,
        gl.STATIC_DRAW
    );

    gl.uniform3fv(
        colorLocation,
        color
    );

    gl.uniformMatrix3fv(
        transformLocation,
        false,
        M_transform
    );

    gl.drawArrays(
        gl.LINE_LOOP,
        0,
        verticesTriangulo.length / numComponents
    );
}

drawScene();