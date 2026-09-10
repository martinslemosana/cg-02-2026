const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

console.log("MAIN.JS FOI CARREGADO");

// ==================================================
// SHADERS
// ==================================================

const vertexShaderSource = `#version 300 es

in vec2 aPosition;

uniform mat3 u_viewTransform;
uniform mat3 u_modelTransform;

void main() {

    vec3 position =
        u_viewTransform *
        u_modelTransform *
        vec3(aPosition, 1.0);

    gl_Position =
        vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es

precision mediump float;

uniform vec3 uColor;

out vec4 outColor;

void main() {

    outColor =
        vec4(uColor, 1.0);
}
`;


// ==================================================
// CRIAR SHADER
// ==================================================

function createShader(gl, type, source) {

    const shader =
        gl.createShader(type);

    gl.shaderSource(
        shader,
        source
    );

    gl.compileShader(shader);

    if (
        !gl.getShaderParameter(
            shader,
            gl.COMPILE_STATUS
        )
    ) {

        const error =
            gl.getShaderInfoLog(shader);

        gl.deleteShader(shader);

        throw new Error(error);
    }

    return shader;
}


// ==================================================
// CRIAR PROGRAMA
// ==================================================

function createProgram(
    gl,
    vertexShaderSource,
    fragmentShaderSource
) {

    const vertexShader =
        createShader(
            gl,
            gl.VERTEX_SHADER,
            vertexShaderSource
        );

    const fragmentShader =
        createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );

    const program =
        gl.createProgram();

    gl.attachShader(
        program,
        vertexShader
    );

    gl.attachShader(
        program,
        fragmentShader
    );

    gl.linkProgram(program);

    if (
        !gl.getProgramParameter(
            program,
            gl.LINK_STATUS
        )
    ) {

        throw new Error(
            gl.getProgramInfoLog(program)
        );
    }

    return program;
}


const program =
    createProgram(
        gl,
        vertexShaderSource,
        fragmentShaderSource
    );


// ==================================================
// CLASSE RENDERER
// ==================================================

class Renderer {

    constructor(gl, program) {

        this.gl = gl;
        this.program = program;

        // ------------------------------------------
        // LOCALIZAÇÕES
        // ------------------------------------------

        this.positionLocation =
            gl.getAttribLocation(
                program,
                "aPosition"
            );

        this.colorLocation =
            gl.getUniformLocation(
                program,
                "uColor"
            );

        this.viewTransformLocation =
            gl.getUniformLocation(
                program,
                "u_viewTransform"
            );

        this.modelTransformLocation =
            gl.getUniformLocation(
                program,
                "u_modelTransform"
            );

        // ------------------------------------------
        // VIEW TRANSFORM
        // ------------------------------------------

        this.viewTransform =
            m3.identity();

        // ------------------------------------------
        // BUFFER
        // ------------------------------------------

        this.verticesBuffer =
            gl.createBuffer();
    }


    // ==================================================
    // DEFINIR VIEW TRANSFORM
    // ==================================================

    definirViewTransform(viewTransform) {

        this.viewTransform =
            viewTransform;
    }


    // ==================================================
    // DESENHAR OBJETO
    // ==================================================

    desenhar(objeto) {

        const gl = this.gl;

        // ------------------------------------------
        // BUFFER
        // ------------------------------------------

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.verticesBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            objeto.vertices,
            gl.STATIC_DRAW
        );

        // ------------------------------------------
        // ATRIBUTO DE POSIÇÃO
        // ------------------------------------------

        gl.enableVertexAttribArray(
            this.positionLocation
        );

        gl.vertexAttribPointer(
            this.positionLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        // ------------------------------------------
        // COR
        // ------------------------------------------

        gl.uniform3fv(
            this.colorLocation,
            objeto.color
        );

        // ------------------------------------------
        // MODEL TRANSFORM
        // ------------------------------------------

        gl.uniformMatrix3fv(
            this.modelTransformLocation,
            false,
            objeto.modelTransform
        );

        // ------------------------------------------
        // VIEW TRANSFORM
        // ------------------------------------------

        gl.uniformMatrix3fv(
            this.viewTransformLocation,
            false,
            this.viewTransform
        );

        // ------------------------------------------
        // DESENHAR
        // ------------------------------------------

        gl.drawArrays(
            gl.TRIANGLES,
            0,
            objeto.vertices.length / 2
        );
    }
}


// ==================================================
// GEOMETRIA DA RUA
// ==================================================

function verticesRua() {

    return new Float32Array([

        -2.0,  0.4,
        -2.0, -0.4,
         2.0,  0.4,

         2.0,  0.4,
        -2.0, -0.4,
         2.0, -0.4

    ]);
}


// ==================================================
// GEOMETRIA DO CARRO
// ==================================================

function verticesCarro() {

    return new Float32Array([

        // ------------------------------------------
        // Parte inferior esquerda
        // ------------------------------------------

        -0.2,  0.1,
        -0.2,  0.0,
        -0.1,  0.1,

        -0.1,  0.1,
        -0.2,  0.0,
        -0.1,  0.0,


        // ------------------------------------------
        // Parte central
        // ------------------------------------------

        -0.1,  0.2,
        -0.1,  0.0,
         0.1,  0.2,

         0.1,  0.2,
        -0.1,  0.0,
         0.1,  0.0,


        // ------------------------------------------
        // Parte inferior direita
        // ------------------------------------------

         0.1,  0.1,
         0.1,  0.0,
         0.2,  0.1,

         0.2,  0.1,
         0.1,  0.0,
         0.2,  0.0

    ]);
}


// ==================================================
// GEOMETRIA DA RODA
// ==================================================

function verticesRoda() {

    const vertices = [];

    const numSegments = 6;
    const radius = 0.1;

    for (
        let i = 0;
        i < numSegments;
        i++
    ) {

        const theta1 =
            (i / numSegments) *
            2 * Math.PI;

        const theta2 =
            ((i + 1) / numSegments) *
            2 * Math.PI;


        // ------------------------------------------
        // CENTRO
        // ------------------------------------------

        vertices.push(
            0,
            0
        );


        // ------------------------------------------
        // PRIMEIRO PONTO
        // ------------------------------------------

        vertices.push(
            radius * Math.cos(theta1),
            radius * Math.sin(theta1)
        );


        // ------------------------------------------
        // SEGUNDO PONTO
        // ------------------------------------------

        vertices.push(
            radius * Math.cos(theta2),
            radius * Math.sin(theta2)
        );
    }

    return new Float32Array(vertices);
}


// ==================================================
// CLASSE SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(vertices, color) {

        // ------------------------------------------
        // GEOMETRIA
        // ------------------------------------------

        this.vertices =
            vertices;

        // ------------------------------------------
        // APARÊNCIA
        // ------------------------------------------

        this.color =
            color;

        // ------------------------------------------
        // MODEL TRANSFORM
        // ------------------------------------------

        this.modelTransform =
            m3.identity();
    }


    // ==================================================
    // ATUALIZAR TRANSFORMAÇÃO
    // ==================================================

    atualizarTransformacao(modelTransform) {

        this.modelTransform =
            modelTransform;
    }
}


// ==================================================
// CLASSE RUA
// ==================================================

class Rua
    extends SceneObject {

    constructor() {

        super(

            verticesRua(),

            new Float32Array([
                0.2,
                0.2,
                0.2
            ])
        );
    }


    desenhar(renderer) {

        renderer.desenhar(this);
    }
}


// ==================================================
// CLASSE CORPO DO CARRO
// ==================================================

class CorpoCarro
    extends SceneObject {

    constructor(cor) {

        super(

            verticesCarro(),

            cor
        );
    }
}


// ==================================================
// CLASSE RODA
// ==================================================

class Roda
    extends SceneObject {

    constructor(posicaoX, angleSpeed) {

        super(

            verticesRoda(),

            new Float32Array([
                0.5,
                0.5,
                0.5
            ])
        );

        // ------------------------------------------
        // POSIÇÃO LOCAL
        // ------------------------------------------

        this.posicaoX =
            posicaoX;

        // ------------------------------------------
        // ESCALA
        // ------------------------------------------

        this.scale =
            0.5;

        // ------------------------------------------
        // ÂNGULO
        // ------------------------------------------

        this.theta =
            0.0;

        // ------------------------------------------
        // VELOCIDADE ANGULAR
        // ------------------------------------------

        this.angleSpeed =
            angleSpeed;
    }


    // ==================================================
    // DEFINIR VELOCIDADE ANGULAR
    // ==================================================

    definirVelocidadeAngular(angleSpeed) {

        this.angleSpeed =
            angleSpeed;
    }


    // ==================================================
    // ATUALIZAR ROTAÇÃO
    // ==================================================

    girar(deltaTime) {

        const dt =
            deltaTime / 1000;

        this.theta +=
            this.angleSpeed * dt;
    }


    // ==================================================
    // ATUALIZAR TRANSFORMAÇÃO
    // ==================================================

    atualizarTransformacao(
        transformacaoCarro
    ) {

        // ------------------------------------------
        // TRANSFORMAÇÃO LOCAL DA RODA
        // ------------------------------------------

        const transformacaoLocal =

            m3.multiply(

                m3.translation(
                    this.posicaoX,
                    0.0
                ),

                m3.multiply(

                    m3.rotation(
                        this.theta
                    ),

                    m3.scaling(
                        this.scale,
                        this.scale
                    )
                )
            );


        // ------------------------------------------
        // TRANSFORMAÇÃO GLOBAL
        // ------------------------------------------

        this.modelTransform =

            m3.multiply(

                transformacaoCarro,

                transformacaoLocal
            );
    }
}


// ==================================================
// CLASSE CARRO
// ==================================================

class Carro {

    constructor(tx, ty, cor, speed) {

        // ------------------------------------------
        // ESTADO DO CARRO
        // ------------------------------------------

        this.tx =
            tx;

        this.ty =
            ty;

        this.speed =
            speed;

        this.angleSpeed =
            -5.0;


        // ------------------------------------------
        // PARTES DO CARRO
        // ------------------------------------------

        this.corpo =
            new CorpoCarro(cor);

        this.rodaEsquerda =
            new Roda(
                -0.1,
                this.angleSpeed
            );

        this.rodaDireita =
            new Roda(
                0.1,
                this.angleSpeed
            );
    }


    // ==================================================
    // MOVER CARRO
    // ==================================================

    mover(deltaTime) {

        const dt =
            deltaTime / 1000;


        // ------------------------------------------
        // ATUALIZAR POSIÇÃO
        // ------------------------------------------

        this.tx +=
            this.speed * dt;


        // ------------------------------------------
        // INVERTER DIREÇÃO
        // ------------------------------------------

        if (
            this.tx > 1.8 ||
            this.tx < -1.8
        ) {

            this.speed =
                -this.speed;

            this.angleSpeed =
                -this.angleSpeed;


            // --------------------------------------
            // ATUALIZAR VELOCIDADE DAS RODAS
            // --------------------------------------

            this.rodaEsquerda
                .definirVelocidadeAngular(
                    this.angleSpeed
                );

            this.rodaDireita
                .definirVelocidadeAngular(
                    this.angleSpeed
                );
        }


        // ------------------------------------------
        // TRANSFORMAÇÃO DO CARRO
        // ------------------------------------------

        const transformacaoCarro =

            m3.translation(
                this.tx,
                this.ty
            );


        // ------------------------------------------
        // TRANSFORMAÇÃO DO CORPO
        // ------------------------------------------

        this.corpo.atualizarTransformacao(
            transformacaoCarro
        );


        // ------------------------------------------
        // GIRAR RODAS
        // ------------------------------------------

        this.rodaEsquerda.girar(
            deltaTime
        );

        this.rodaDireita.girar(
            deltaTime
        );


        // ------------------------------------------
        // TRANSFORMAÇÃO DAS RODAS
        // ------------------------------------------

        this.rodaEsquerda
            .atualizarTransformacao(
                transformacaoCarro
            );

        this.rodaDireita
            .atualizarTransformacao(
                transformacaoCarro
            );
    }


    // ==================================================
    // DESENHAR CARRO
    // ==================================================

    desenhar(renderer) {

        // ------------------------------------------
        // CORPO
        // ------------------------------------------

        renderer.desenhar(
            this.corpo
        );


        // ------------------------------------------
        // RODA ESQUERDA
        // ------------------------------------------

        renderer.desenhar(
            this.rodaEsquerda
        );


        // ------------------------------------------
        // RODA DIREITA
        // ------------------------------------------

        renderer.desenhar(
            this.rodaDireita
        );
    }
}


// ==================================================
// CLASSE SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        // ------------------------------------------
        // RENDERER
        // ------------------------------------------

        this.renderer =
            new Renderer(
                gl,
                program
            );


        // ------------------------------------------
        // VIEW TRANSFORM
        // ------------------------------------------

        this.viewTransform =
            m3.scaling(
                0.5,
                1.0
            );


        // ------------------------------------------
        // INFORMAR A VIEW AO RENDERER
        // ------------------------------------------

        this.renderer
            .definirViewTransform(
                this.viewTransform
            );


        // ------------------------------------------
        // OBJETOS DA CENA
        // ------------------------------------------

        this.rua =
            new Rua();


        // ------------------------------------------
        // CARROS
        // ------------------------------------------

        this.carros = [

            new Carro(
                0.5,
                0.2,
                new Float32Array([
                    1.0,
                    0.0,
                    0.0
                ]),
                0.3
            ),

            new Carro(
                0.0,
                0.0,
                new Float32Array([
                    1.0,
                    1.0,
                    0.0
                ]),
                0.4
            ),

            new Carro(
                -0.2,
                -0.1,
                new Float32Array([
                    0.0,
                    0.0,
                    1.0
                ]),
                0.5
            ),

            new Carro(
                -0.9,
                -0.3,
                new Float32Array([
                    0.0,
                    1.0,
                    0.0
                ]),
                0.1
            )
        ];


        // ------------------------------------------
        // CONTROLE DO TEMPO
        // ------------------------------------------

        this.ultimoTempo =
            null;
    }


    // ==================================================
    // ATUALIZAR
    // ==================================================

    atualizar(deltaTime) {

        for (
            const carro of this.carros
        ) {

            carro.mover(
                deltaTime
            );
        }
    }


    // ==================================================
    // DESENHAR
    // ==================================================

    desenhar() {

        // ------------------------------------------
        // LIMPAR TELA
        // ------------------------------------------

        gl.clear(
            gl.COLOR_BUFFER_BIT
        );


        // ------------------------------------------
        // USAR PROGRAMA
        // ------------------------------------------

        gl.useProgram(
            program
        );


        // ------------------------------------------
        // DESENHAR RUA
        // ------------------------------------------

        this.rua.desenhar(
            this.renderer
        );


        // ------------------------------------------
        // DESENHAR CARROS
        // ------------------------------------------

        for (
            const carro of this.carros
        ) {

            carro.desenhar(
                this.renderer
            );
        }
    }


    // ==================================================
    // LOOP DA ANIMAÇÃO
    // ==================================================

    executar(tempoAtual) {

        // ------------------------------------------
        // PRIMEIRO FRAME
        // ------------------------------------------

        if (
            this.ultimoTempo === null
        ) {

            this.ultimoTempo =
                tempoAtual;

            requestAnimationFrame(
                (tempo) =>
                    this.executar(tempo)
            );

            return;
        }


        // ------------------------------------------
        // DELTA TIME
        // ------------------------------------------

        const deltaTime =

            tempoAtual -
            this.ultimoTempo;


        // ------------------------------------------
        // GUARDAR TEMPO ATUAL
        // ------------------------------------------

        this.ultimoTempo =
            tempoAtual;


        // ------------------------------------------
        // ATUALIZAR
        // ------------------------------------------

        this.atualizar(
            deltaTime
        );


        // ------------------------------------------
        // DESENHAR
        // ------------------------------------------

        this.desenhar();


        // ------------------------------------------
        // PRÓXIMO FRAME
        // ------------------------------------------

        requestAnimationFrame(
            (tempo) =>
                this.executar(tempo)
        );
    }


    // ==================================================
    // INICIAR
    // ==================================================

    iniciar() {

        requestAnimationFrame(
            (tempo) =>
                this.executar(tempo)
        );
    }
}


// ==================================================
// CONFIGURAÇÃO INICIAL DO WEBGL
// ==================================================

gl.clearColor(
    0.1,
    0.1,
    0.1,
    1.0
);


// ==================================================
// VIEWPORT
// ==================================================

gl.viewport(
    0,
    0,
    canvas.width,
    canvas.height
);


// ==================================================
// CRIAR CENA
// ==================================================

const scene =
    new Scene(
        gl,
        program
    );


// ==================================================
// INICIAR ANIMAÇÃO
// ==================================================

scene.iniciar();