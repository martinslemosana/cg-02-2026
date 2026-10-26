function generateCubeVertices(size) {

    const h = size / 2;

    return [
        // Face frontal: z = +h
        -h, -h,  h,
         h, -h,  h,
         h,  h,  h,
        -h,  h,  h,

        // Face traseira: z = -h
         h, -h, -h,
        -h, -h, -h,
        -h,  h, -h,
         h,  h, -h,

        // Face direita: x = +h
         h, -h,  h,
         h, -h, -h,
         h,  h, -h,
         h,  h,  h,

        // Face esquerda: x = -h
        -h, -h, -h,
        -h, -h,  h,
        -h,  h,  h,
        -h,  h, -h,

        // Face superior: y = +h
        -h,  h,  h,
         h,  h,  h,
         h,  h, -h,
        -h,  h, -h,

        // Face inferior: y = -h
        -h, -h, -h,
         h, -h, -h,
         h, -h,  h,
        -h, -h,  h
    ];
}

function generateCubeIndices() {

    const indices = [];

    for (let face = 0; face < 6; face++) {

        const first = face * 4;

        // Primeiro triângulo
        indices.push(
            first,
            first + 1,
            first + 2
        );

        // Segundo triângulo
        indices.push(
            first,
            first + 2,
            first + 3
        );
    }

    return indices;
}

function generateSphereVertices(radius, latitudeBands = 20, longitudeBands = 30) {
    const vertices = [];

    for (let lat = 0; lat <= latitudeBands; lat++) {

        const theta = lat * Math.PI / latitudeBands;

        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let lon = 0; lon <= longitudeBands; lon++) {

            const phi = lon * 2 * Math.PI / longitudeBands;

            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = radius * sinTheta * cosPhi;
            const y = radius * cosTheta;
            const z = radius * sinTheta * sinPhi;

            vertices.push(x, y, z);
        }
    }

    return vertices;
}

function generateSphereIndices(latitudeBands = 20, longitudeBands = 30) {
    const indices = [];

    for (let lat = 0; lat < latitudeBands; lat++) {

        for (let lon = 0; lon < longitudeBands; lon++) {

            const first =
                lat * (longitudeBands + 1) + lon;

            const second =
                first + longitudeBands + 1;

            // Primeiro triângulo
            indices.push(
                first,
                first + 1,
                second
            );

            // Segundo triângulo
            indices.push(
                second,
                first + 1,
                second + 1
            );
        }
    }

    return indices;
}

function generateTorusVertices(
    majorRadius,
    minorRadius,
    majorSegments = 32,
    minorSegments = 16
) {
    const vertices = [];

    for (let i = 0; i <= majorSegments; i++) {

        const u = i * 2 * Math.PI / majorSegments;

        const cosU = Math.cos(u);
        const sinU = Math.sin(u);

        for (let j = 0; j <= minorSegments; j++) {

            const v = j * 2 * Math.PI / minorSegments;

            const cosV = Math.cos(v);
            const sinV = Math.sin(v);

            const x = (majorRadius + minorRadius * cosV) * cosU;
            const y = minorRadius * sinV;
            const z = (majorRadius + minorRadius * cosV) * sinU;

            vertices.push(x, y, z);
        }
    }

    return vertices;
}

function generateTorusIndices(
    majorSegments = 32,
    minorSegments = 16
) {
    const indices = [];

    for (let i = 0; i < majorSegments; i++) {

        for (let j = 0; j < minorSegments; j++) {

            const first =
                i * (minorSegments + 1) + j;

            const second =
                first + minorSegments + 1;

            indices.push(
                first,
                first + 1,
                second
            );

            // Segundo triângulo
            indices.push(
                second,
                first + 1,
                second + 1
            );
        }
    }

    return indices;
}

function generateEllipsoidVertices(
    radiusX,
    radiusY,
    radiusZ,
    latitudeBands = 20,
    longitudeBands = 30
) {
    const vertices = [];

    for (let lat = 0; lat <= latitudeBands; lat++) {

        const theta = lat * Math.PI / latitudeBands;

        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let lon = 0; lon <= longitudeBands; lon++) {

            const phi = lon * 2 * Math.PI / longitudeBands;

            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = radiusX * sinTheta * cosPhi;
            const y = radiusY * cosTheta;
            const z = radiusZ * sinTheta * sinPhi;

            vertices.push(x, y, z);
        }
    }

    return vertices;
}

function generateEllipsoidIndices(
    latitudeBands = 20,
    longitudeBands = 30
) {
    const indices = [];

    for (let lat = 0; lat < latitudeBands; lat++) {

        for (let lon = 0; lon < longitudeBands; lon++) {

            const first =
                lat * (longitudeBands + 1) + lon;

            const second =
                first + longitudeBands + 1;

            // Primeiro triângulo
            indices.push(
                first,
                first + 1,
                second
            );

            // Segundo triângulo
            indices.push(
                second,
                first + 1,
                second + 1
            );
        }
    }

    return indices;
}

function signedPower(value, exponent) {
    return Math.sign(value) * Math.pow(Math.abs(value), exponent);
}

function generateSuperquadricVertices(
    a = 1,
    b = 1,
    c = 1,
    n1 = 1,
    n2 = 1,
    latitudeBands = 30,
    longitudeBands = 40
) {
    const vertices = [];

    for (let i = 0; i <= latitudeBands; i++) {

        const u = -Math.PI / 2
            + i * Math.PI / latitudeBands;

        const cosU = Math.cos(u);
        const sinU = Math.sin(u);

        for (let j = 0; j <= longitudeBands; j++) {

            const v = -Math.PI
                + j * 2 * Math.PI / longitudeBands;

            const cosV = Math.cos(v);
            const sinV = Math.sin(v);

            const x = a
                * signedPower(cosU, n1)
                * signedPower(cosV, n2);

            const y = b
                * signedPower(cosU, n1)
                * signedPower(sinV, n2);

            const z = c * signedPower(sinU, n1);

            vertices.push(x, y, z);
        }
    }

    return vertices;
}

function generateSuperquadricIndices(
    latitudeBands = 30,
    longitudeBands = 40
) {
    const indices = [];

    for (let i = 0; i < latitudeBands; i++) {

        for (let j = 0; j < longitudeBands; j++) {

            const first =
                i * (longitudeBands + 1) + j;

            const second =
                first + longitudeBands + 1;

            // Primeiro triângulo
            indices.push(
                first,
                first + 1,
                second
            );

            // Segundo triângulo
            indices.push(
                second,
                first + 1,
                second + 1
            );
        }
    }

    return indices;
}

function addNormalsToGeometry(vertices, indices) {

    const newVertices = [];
    const newNormals = [];
    const newIndices = [];

    // Cada triângulo terá seus próprios vértices.
    // Isso permite atribuir uma normal constante
    // aos três vértices de cada triângulo.

    for (let i = 0; i < indices.length; i += 3) {

        const ia = indices[i];
        const ib = indices[i + 1];
        const ic = indices[i + 2];

        const a = [
            vertices[ia * 3],
            vertices[ia * 3 + 1],
            vertices[ia * 3 + 2]
        ];

        const b = [
            vertices[ib * 3],
            vertices[ib * 3 + 1],
            vertices[ib * 3 + 2]
        ];

        const c = [
            vertices[ic * 3],
            vertices[ic * 3 + 1],
            vertices[ic * 3 + 2]
        ];

        // Vetores das arestas
        const u = [
            b[0] - a[0],
            b[1] - a[1],
            b[2] - a[2]
        ];

        const v = [
            c[0] - a[0],
            c[1] - a[1],
            c[2] - a[2]
        ];

        // Produto vetorial: u x v
        let nx = u[1] * v[2] - u[2] * v[1];
        let ny = u[2] * v[0] - u[0] * v[2];
        let nz = u[0] * v[1] - u[1] * v[0];

        // Normalização
        const length = Math.sqrt(
            nx * nx + ny * ny + nz * nz
        );

        if (length < 1e-8) {
            continue;
        }

        nx /= length;
        ny /= length;
        nz /= length;

        // Copia os três vértices do triângulo.
        // Cada vértice recebe a mesma normal.

        for (const index of [ia, ib, ic]) {

            newVertices.push(
                vertices[index * 3],
                vertices[index * 3 + 1],
                vertices[index * 3 + 2]
            );

            newNormals.push(nx, ny, nz);

            newIndices.push(newIndices.length);
        }
    }

    return {
        vertices: new Float32Array(newVertices),
        normals: new Float32Array(newNormals),
        indices: new Uint16Array(newIndices)
    };
}


const cubeGeometry = addNormalsToGeometry(
    generateCubeVertices(4),
    generateCubeIndices()
);

const sphereGeometry = addNormalsToGeometry(
    generateSphereVertices(2),
    generateSphereIndices()
);

const torusGeometry = addNormalsToGeometry(
    generateTorusVertices(2, 1),
    generateTorusIndices()
);

const ellipsoidGeometry = addNormalsToGeometry(
    generateEllipsoidVertices(2, 1, 0.5),
    generateEllipsoidIndices()
);

const superquadricGeometry = addNormalsToGeometry(
    generateSuperquadricVertices(2.5, 1.5, 1, 2, 0.5),
    generateSuperquadricIndices()
);