const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

// --------------------------------------------------
// INTERFACE
// --------------------------------------------------

const modoAtualElement =
    document.getElementById("modoAtual");

const matrizElement =
    document.getElementById("matrizTransformacao");

// --------------------------------------------------
// 1. VERTICES
// --------------------------------------------------

let vertices = new Float32Array([
   0.0,   0.25,
  -0.25, -0.25,
   0.25, -0.25
]);


// --------------------------------------------------
// 1. CORES
// --------------------------------------------------

let colors = new Float32Array([
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
]);

// --------------------------------------------------
// 1. TRANSFORMAÇÃO
// --------------------------------------------------

let M = m3.identity();

// --------------------------------------------------
// 2. BUFFERS
// --------------------------------------------------

const verticesBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

gl.bufferData(
    gl.ARRAY_BUFFER,
    vertices,
    gl.STATIC_DRAW
);

const colorsBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);

gl.bufferData(
    gl.ARRAY_BUFFER,
    colors,
    gl.STATIC_DRAW
);

// --------------------------------------------------
// 3. VERTEX SHADER
// --------------------------------------------------

const vertexShaderSource = `#version 300 es

in vec2 aPosition;
in vec3 aColor;

uniform mat3 u_transform;

out vec3 vColor;

void main() {
    vec3 position = u_transform * vec3(aPosition, 1.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
    vColor = aColor;
}

`;


// --------------------------------------------------
// 4. FRAGMENT SHADER
// --------------------------------------------------

const fragmentShaderSource = `#version 300 es

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


const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
);

const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
);


// --------------------------------------------------
// 6. CRIAR PROGRAMA
// --------------------------------------------------

const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

    throw new Error(
        gl.getProgramInfoLog(program)
    );
}


// --------------------------------------------------
// 7. LOCAL DOS ATRIBUTOS E DO UNIFORM
// --------------------------------------------------

const positionLocation =
    gl.getAttribLocation(
        program,
        "aPosition"
    );

const colorLocation =
    gl.getAttribLocation(
        program,
        "aColor"
    );

const transformLocation = 
    gl.getUniformLocation( 
        program,
        "u_transform" 
    );

// --------------------------------------------------
// 8. CONFIGURAR ATRIBUTOS E UNIFORM
// --------------------------------------------------

gl.useProgram(program);

gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);

gl.enableVertexAttribArray(positionLocation);

gl.vertexAttribPointer(
    positionLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
);

gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);

gl.enableVertexAttribArray(colorLocation);

gl.vertexAttribPointer(
    colorLocation,
    3,
    gl.FLOAT,
    false,
    0,
    0
);

gl.uniformMatrix3fv(
    transformLocation,
    false,
    M 
);

// --------------------------------------------------
// 9. INTERAÇÃO COM O TECLADO
// --------------------------------------------------

document.addEventListener(
  "keydown",
  keyboardClick,
  false
);

let modo = "translacao";

function keyboardClick(event) {

  switch(event.key) {
      case "t":
        modo = "translacao";
        break;
      case "s":
        modo = "escala";
        break;
      case "r":
        modo = "rotacao";
        break;
      case "ArrowUp":
        switch(modo){
            case "translacao":
              M = m3.multiply(m3.translation(0, 0.05), M);
              break;
            case "escala":
              M = m3.multiply(m3.scaling(1.05, 1.05), M);
              break;
        }
        break;
      case "ArrowDown":
        switch(modo){
            case "translacao":
              M = m3.multiply(m3.translation(0, -0.05), M);
              break;
            case "escala":
              M = m3.multiply(m3.scaling(0.95, 0.95), M);
              break;
        }
        break;
      case "ArrowRight":
                switch(modo){
            case "translacao":
              M = m3.multiply(m3.translation(0.05, 0), M);
              break;
            case "rotacao":
              M = m3.multiply(m3.rotation(-0.05), M);
              break;
        }
        break;
      case "ArrowLeft":
                switch(modo){
            case "translacao":
              M = m3.multiply(m3.translation(-0.05, 0), M);
              break;
            case "rotacao":
              M = m3.multiply(m3.rotation(0.05), M);
              break;
        }
        break;
      default:
          return;
  }

  gl.useProgram(program);

  gl.uniformMatrix3fv(
    transformLocation,
    false,
    M 
  );

  console.log(M);

  atualizarInterface();
  // Redesenhar
  drawScene();
}

// --------------------------------------------------
// ATUALIZAÇÃO DA INTERFACE
// --------------------------------------------------

function atualizarInterface() {

    // Atualiza o modo
    switch (modo) {

        case "translacao":
            modoAtualElement.textContent = "Translação";
            break;

        case "escala":
            modoAtualElement.textContent = "Escala";
            break;

        case "rotacao":
            modoAtualElement.textContent = "Rotação";
            break;
    }


    // Atualiza a matriz
    matrizElement.textContent =
    `[ ${M[0].toFixed(2)}\t${M[3].toFixed(2)}\t${M[6].toFixed(2)} ]
[ ${M[1].toFixed(2)}\t${M[4].toFixed(2)}\t${M[7].toFixed(2)} ]
[ ${M[2].toFixed(2)}\t${M[5].toFixed(2)}\t${M[8].toFixed(2)} ]`;
}


// --------------------------------------------------
// 10. LIMPAR TELA
// --------------------------------------------------

gl.clearColor(0.1, 0.1, 0.1, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);


// --------------------------------------------------
// 11. DESENHAR
// --------------------------------------------------

const numComponents = 2;

function drawScene(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.drawArrays(
        gl.TRIANGLES,
        0,
        vertices.length / numComponents
    );
}

atualizarInterface();
drawScene();
