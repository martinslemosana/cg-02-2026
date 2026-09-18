const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

const vertexShaderSource = `#version 300 es

in vec3 aPosition;
in vec3 aColor;

out vec3 vColor;

uniform mat4 u_modelTransform;

void main() {

    vColor = aColor;
    gl_Position =
        u_modelTransform * vec4(aPosition, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es

precision mediump float;

in vec3 vColor;

out vec4 outColor;

void main() {

    outColor =
        vec4(vColor, 1.0);
}
`;

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
// CONFIGURAÇÃO INICIAL DO WEBGL
// ==================================================

gl.clearColor(
    0.1,
    0.1,
    0.1,
    1.0
);

gl.viewport(
    0,
    0,
    canvas.width,
    canvas.height
);

gl.enable(
    gl.DEPTH_TEST
);

// ==================================================
// CRIAR CENA
// ==================================================

const scene =
    new Scene(gl,program);


// ==================================================
// INICIAR ANIMAÇÃO
// ==================================================

scene.init();