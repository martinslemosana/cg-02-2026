// ==================================================
// GENERATE CUBE VERTICES
// ==================================================

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

// ==================================================
// GENERATE CUBE INDICES
// ==================================================

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

// ==================================================
// GENERATE SPHERE VERTICES
// ==================================================

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

// ==================================================
// GENERATE SPHERE INDICES
// ==================================================

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

// ==================================================
// GENERATE TORUS VERTICES
// ==================================================

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

// ==================================================
// GENERATE TORUS INDICES
// ==================================================

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

// ==================================================
// GENERATE ELLIPSOID VERTICES
// ==================================================

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

// ==================================================
// GENERATE ELLIPSOID INDICES
// ==================================================

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

// ==================================================
// GENERATE SUPERQUADRIC VERTICES
// ==================================================

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

// ==================================================
// GENERATE SUPERQUADRIC INDICES
// ==================================================

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

// ==================================================
// WINE GLASS PROFILE
// ==================================================

const wineGlassProfile = [
    [0.00, -2.00],
    [0.49, -2.00],
    [0.82, -1.92],
    [0.94, -1.84],
    [0.88, -1.76],
    [0.55, -1.66],

    // Haste
    [0.16, -1.60],
    [0.088, -1.46],
    [0.088, -0.23],
    [0.14, -0.08],

    // Transição para o bojo
    [0.27, 0.08],
    [0.55, 0.23],

    // Parte externa do bojo
    [0.84, 0.49],
    [1.09, 0.84],
    [1.25, 1.29],
    [1.33, 1.71],
    [1.33, 1.99],

    // Borda da taça
    [1.29, 2.00],
    [1.23, 1.94],

    // Parte interna do bojo
    [1.21, 1.69],
    [1.13, 1.33],
    [0.98, 0.94],
    [0.76, 0.64],
    [0.49, 0.45],
    [0.23, 0.35],
    [0.00, 0.33]
];

const wineGlassSlices = 40;


// ==================================================
// GENERATE WINE GLASS VERTICES
// ==================================================

function generateWineGlassVertices() {

    const vertices = [];

    for (let i = 0; i < wineGlassProfile.length; i++) {

        const r = wineGlassProfile[i][0];
        const y = wineGlassProfile[i][1];

        for (let j = 0; j < wineGlassSlices; j++) {

            const theta = 2 * Math.PI * j / wineGlassSlices;

            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);

            vertices.push(x, y, z);
        }
    }

    return vertices;
}


// ==================================================
// GENERATE WINE GLASS INDICES
// ==================================================

function generateWineGlassIndices() {

    const indices = [];

    for (let i = 0; i < wineGlassProfile.length - 1; i++) {

        for (let j = 0; j < wineGlassSlices; j++) {

            const nextJ = (j + 1) % wineGlassSlices;

            const first = i * wineGlassSlices + j;
            const nextAngle = i * wineGlassSlices + nextJ;

            const nextProfile =
                (i + 1) * wineGlassSlices + j;

            const nextProfileAngle =
                (i + 1) * wineGlassSlices + nextJ;

            // Primeiro triângulo
            indices.push(
                first,
                nextProfile,
                nextAngle
            );

            // Segundo triângulo
            indices.push(
                nextAngle,
                nextProfile,
                nextProfileAngle
            );
        }
    }

    return indices;
}

// ==================================================
// GENERATE WAVY CYLINDER VERTICES
// ==================================================

function generateWavyCylinderVertices() {

    const vertices = [];

    const radius = 1.0;
    const height = 8.0;

    const slices = 40;
    const stacks = 40;

    let sinAngle = 0.0;
    let sinAngleStep = 4*Math.PI/stacks;

    // Gera as circunferências ao longo do eixo z
    for (let i = 0; i <= stacks; i++) {

        const z = (height * i / stacks)-(height/2);

        // Gera os vértices de uma circunferência
        for (let j = 0; j < slices; j++) {

            const theta = 2 * Math.PI * j / slices;

            const x = radius * Math.cos(theta) + 0.5 * Math.sin(sinAngle);
            const y = radius * Math.sin(theta) + 0.5 * Math.sin(sinAngle);

            vertices.push(x, y, z);
        }
        
        console.log(Math.sin(sinAngle));
        sinAngle += sinAngleStep;
    }

    return vertices;
}

// ==================================================
// GENERATE WAVY CYLINDER INDICES
// ==================================================

function generateWavyCylinderIndices() {

    const indices = [];

    const slices = 40;
    const stacks = 40;

    for (let i = 0; i < stacks; i++) {

        for (let j = 0; j < slices; j++) {

            const nextJ = (j + 1) % slices;

            const current = i * slices + j;
            const currentNext = i * slices + nextJ;

            const next = (i + 1) * slices + j;
            const nextNext = (i + 1) * slices + nextJ;

            // Primeiro triângulo
            indices.push(
                current,
                currentNext,
                next
            );

            // Segundo triângulo
            indices.push(
                currentNext,
                nextNext,
                next
            );
        }
    }

    return indices;
}

// ==================================================
// GENERATE SPRING VERTICES
// ==================================================

function generateSpringVertices() {

    const vertices = [];

    const springRadius = 0.8;  // Raio da mola
    const wireRadius = 0.15;   // Espessura do fio
    const height = 8.0;        // Altura total
    const turns = 8;           // Número de voltas

    const slices = 12;
    const stacks = 200;

    const pitch = height / (2 * Math.PI * turns);

    for (let i = 0; i <= stacks; i++) {

        const t = i / stacks;

        // Ângulo da hélice
        const alpha = 2 * Math.PI * turns * t;

        // Centro do fio: trajetória helicoidal
        const cx = springRadius * Math.cos(alpha);
        const cy = springRadius * Math.sin(alpha);
        const cz = height * (t - 0.5);

        // Direção radial da hélice
        const nx = Math.cos(alpha);
        const ny = Math.sin(alpha);
        const nz = 0.0;

        // Segundo vetor da base perpendicular à trajetória
        let bx = -pitch * Math.sin(alpha);
        let by =  pitch * Math.cos(alpha);
        let bz = -springRadius;

        const bLength = Math.sqrt(
            bx * bx + by * by + bz * bz
        );

        bx /= bLength;
        by /= bLength;
        bz /= bLength;

        // Gera a seção circular do fio
        for (let j = 0; j < slices; j++) {

            const theta = 2 * Math.PI * j / slices;

            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);

            const x = cx + wireRadius * (
                cosTheta * nx + sinTheta * bx
            );

            const y = cy + wireRadius * (
                cosTheta * ny + sinTheta * by
            );

            const z = cz + wireRadius * (
                cosTheta * nz + sinTheta * bz
            );

            vertices.push(x, y, z);
        }
    }

    return vertices;
}

// ==================================================
// GENERATE SPRING INDICES
// ==================================================

function generateSpringIndices() {

    const indices = [];

    const slices = 12;
    const stacks = 200;

    for (let i = 0; i < stacks; i++) {

        for (let j = 0; j < slices; j++) {

            const nextJ = (j + 1) % slices;

            const current = i * slices + j;
            const currentNext = i * slices + nextJ;

            const next = (i + 1) * slices + j;
            const nextNext = (i + 1) * slices + nextJ;

            // Primeiro triângulo
            indices.push(current, currentNext, next);

            // Segundo triângulo
            indices.push(currentNext, nextNext, next);
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
    generateEllipsoidVertices(4, 2, 1),
    generateEllipsoidIndices()
);

const superquadricGeometry = addNormalsToGeometry(
    generateSuperquadricVertices(2, 2, 2, 2.5, 2.5),
    generateSuperquadricIndices()
);

const wineGlassGeometry = addNormalsToGeometry(
    generateWineGlassVertices(),
    generateWineGlassIndices()
);

const wavyCylinderGeometry = addNormalsToGeometry(
    generateWavyCylinderVertices(),
    generateWavyCylinderIndices()
);

const springGeometry = addNormalsToGeometry(
    generateSpringVertices(),
    generateSpringIndices()  
);