const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
    throw new Error("WebGL 2 não é suportado.");
}

const vertexShaderSource = `#version 300 es

in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;

out vec3 vNormal;
flat out vec3 vFlatNormal;

out vec2 vTexCoord;
out vec3 vSurfacePosition;

out float vGouraudDiffuse;
out vec3 vGouraudSpecular;

uniform mat4 u_modelTransform;
uniform mat4 u_viewTransform;
uniform mat4 u_projectionTransform;

uniform highp vec3 u_lightPositions[4];
uniform highp int u_numLights;
uniform highp vec3 u_viewPosition;

uniform highp int u_shadingMode;


// Calcula a iluminação em um ponto da superfície
void calculateLighting(
    vec3 position,
    vec3 normal,
    out float diffuseResult,
    out vec3 specularResult
) {

    vec3 N = normalize(normal);
    vec3 V = normalize(u_viewPosition - position);

    // Componente ambiente
    diffuseResult = 0.2;
    specularResult = vec3(0.0);

    for (int i = 0; i < 4; i++) {

        if (i >= u_numLights) {
            break;
        }

        vec3 surfaceToLight =
            u_lightPositions[i] - position;

        float distanceToLight = length(surfaceToLight);

        vec3 L = normalize(surfaceToLight);

        // Atenuação
        float attenuation = 1.0 / (
            1.0 +
            0.05 * distanceToLight +
            0.005 * distanceToLight * distanceToLight
        );

        // Difusa
        float diffuseFactor = max(dot(N, L), 0.0);

        diffuseResult += attenuation * diffuseFactor;

        // Especular - Blinn-Phong
        if (diffuseFactor > 0.0) {

            vec3 H = normalize(L + V);

            float specularFactor = pow(
                max(dot(N, H), 0.0),
                64.0
            );

            specularResult +=
                attenuation * specularFactor * vec3(1.0);
        }
    }
}


void main() {

    vec4 worldPosition =
        u_modelTransform * vec4(aPosition, 1.0);

    // Matriz normal
    mat3 normalMatrix =
        transpose(inverse(mat3(u_modelTransform)));

    vec3 worldNormal =
        normalize(normalMatrix * aNormal);

    vNormal = worldNormal;
    vFlatNormal = worldNormal;

    vTexCoord = aTexCoord;
    vSurfacePosition = worldPosition.xyz;

    // Gouraud: iluminação calculada no vértice
    if (u_shadingMode == 1) {

        calculateLighting(
            vSurfacePosition,
            worldNormal,
            vGouraudDiffuse,
            vGouraudSpecular
        );
    }

    gl_Position =
        u_projectionTransform *
        u_viewTransform *
        worldPosition;
}
`;


const fragmentShaderSource = `#version 300 es

precision mediump float;

in vec3 vNormal;
flat in vec3 vFlatNormal;

in vec2 vTexCoord;
in vec3 vSurfacePosition;

in float vGouraudDiffuse;
in vec3 vGouraudSpecular;

uniform sampler2D u_texture;

uniform highp vec3 u_lightPositions[4];
uniform highp int u_numLights;
uniform highp vec3 u_viewPosition;

uniform highp int u_shadingMode;

out vec4 outColor;


// Calcula iluminação por fragmento
void calculateLighting(
    vec3 position,
    vec3 normal,
    out float diffuseResult,
    out vec3 specularResult
) {

    vec3 N = normalize(normal);
    vec3 V = normalize(u_viewPosition - position);

    diffuseResult = 0.2;
    specularResult = vec3(0.0);

    for (int i = 0; i < 4; i++) {

        if (i >= u_numLights) {
            break;
        }

        vec3 surfaceToLight =
            u_lightPositions[i] - position;

        float distanceToLight = length(surfaceToLight);

        vec3 L = normalize(surfaceToLight);

        float attenuation = 1.0 / (
            1.0 +
            0.05 * distanceToLight +
            0.005 * distanceToLight * distanceToLight
        );

        float diffuseFactor = max(dot(N, L), 0.0);

        diffuseResult += attenuation * diffuseFactor;

        if (diffuseFactor > 0.0) {

            vec3 H = normalize(L + V);

            float specularFactor = pow(
                max(dot(N, H), 0.0),
                64.0
            );

            specularResult +=
                attenuation * specularFactor * vec3(1.0);
        }
    }
}


void main() {

    vec3 textureColor =
        texture(u_texture, vTexCoord).rgb;

    float diffuse;
    vec3 specular;

    if (u_shadingMode == 1) {

        // GOURAUD
        // A iluminação já foi calculada nos vértices.

        diffuse = vGouraudDiffuse;
        specular = vGouraudSpecular;
    }

    else {

        // FLAT ou PHONG
        // A iluminação é calculada por fragmento.

        vec3 N;

        if (u_shadingMode == 0) {
            // FLAT: normal constante por triângulo
            N = normalize(vFlatNormal);
        }
        else {
            // PHONG: normal interpolada
            N = normalize(vNormal);
        }

        calculateLighting(
            vSurfacePosition,
            N,
            diffuse,
            specular
        );
    }

    // A textura é o material difuso e ambiente.
    // A reflexão especular permanece branca.

    vec3 finalColor =
        textureColor * diffuse + specular;

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