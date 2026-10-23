const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

const vertexShaderSource = `#version 300 es

in vec3 aPosition;
in vec3 aColor;
in vec3 aNormal;

out vec3 vColor;
out vec3 vNormal;
out vec3 vSurfacePosition;

uniform mat4 u_modelTransform;
uniform mat4 u_viewTransform;
uniform mat4 u_projectionTransform;

void main() {

    vColor = aColor;

    vNormal = transpose(inverse(mat3(u_modelTransform))) * aNormal;
    vSurfacePosition = (u_modelTransform * vec4(aPosition, 1)).xyz;

    gl_Position = u_projectionTransform * u_viewTransform * u_modelTransform * vec4(aPosition, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es

precision mediump float;

in vec3 vColor;
in vec3 vNormal;
in vec3 vSurfacePosition;

uniform vec3 u_lightPosition;
uniform vec3 u_viewPosition;

out vec4 outColor;

void main() {

    vec3 ambientReflection = vColor;
    vec3 diffuseReflection = vColor;
    vec3 specularReflection = vec3(1.0);

    vec3 surfaceToLight = u_lightPosition - vSurfacePosition;
    vec3 surfaceToView = u_viewPosition - vSurfacePosition;

    vec3 N = normalize(vNormal);
    vec3 L = normalize(surfaceToLight);
    vec3 V = normalize(surfaceToView);

    float distanceToLight = length(surfaceToLight);

    // 1. Componente ambiente: não depende desta luz
    vec3 ambient = 0.2 * ambientReflection;

    // 2. Componente difusa
    float diffuseFactor = max(dot(N, L), 0.0);

    vec3 diffuse = diffuseFactor * diffuseReflection;

    // 3. Componente especular
    float specularFactor = 0.0;

    if (diffuseFactor > 0.0) {

        vec3 H = normalize(L + V);

        specularFactor = pow(
            max(dot(N, H), 0.0),
            64.0
        );
    }

    vec3 specular = specularFactor * specularReflection;

    // 4. Atenuação em função da distância
    float a0 = 1.0;
    float a1 = 0.05;
    float a2 = 0.005;

    float attenuation = 1.0 / (
        a0 +
        a1 * distanceToLight +
        a2 * distanceToLight * distanceToLight
    );
    
    // 5. Atenuação aplicada à luz direta
    vec3 directLight = attenuation * (diffuse + specular);

    // 6. Cor final
    vec3 finalColor = ambient + directLight;

    outColor = vec4(
        clamp(finalColor, 0.0, 1.0),
        1.0
    );
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