// ==================================================
// HELICOPTER BODY VERTICES
// ==================================================

function helicopterBodyVertices(){

    return new Float32Array([
        // Front
        -0.2, -0.2,  0.2,
         0.2, -0.2,  0.2,
         0.2,  0.2,  0.2,
        -0.2,  0.2,  0.2,

        // Back
        -0.2, -0.2, -0.2,
         0.2, -0.2, -0.2,
         0.2,  0.2, -0.2,
        -0.2,  0.2, -0.2
    ]);
}

// ==================================================
// HELICOPTER BODY COLORS
// ==================================================

function helicopterBodyColors(){
    return new Float32Array([
        // Front
        0.2, 0.7, 0.9,
        0.2, 0.7, 0.9,
        0.2, 0.7, 0.9,
        0.2, 0.7, 0.9,

        // Back
        0.2, 0.7, 0.9,
        0.2, 0.7, 0.9,
        0.2, 0.7, 0.9,
        0.2, 0.7, 0.9,
    ]);
}

// ==================================================
// HELICOPTER BODY INDICES
// ==================================================

function helicopterBodyIndices(){
    return new Uint16Array([
        // Front
        0, 1, 2,
        0, 2, 3,

        // Back
        4, 6, 5,
        4, 7, 6,

        // Left
        0, 3, 7,
        0, 7, 4,

        // Right
        1, 5, 6,
        1, 6, 2,

        // Top
        3, 2, 6,
        3, 6, 7,

        // Bottom
        0, 4, 5,
        0, 5, 1
    ])
}

// ==================================================
// HELICOPTER TOP SHAFT VERTICES
// ==================================================

function helicopterTopShaftVertices(){

    return new Float32Array([

        // ==========================================
        // Haste vertical
        // x: -0.03 até 0.03
        // y:  0.20 até 0.30
        // z: -0.03 até 0.03
        // ==========================================

        // Face inferior
        -0.03, 0.20, -0.03,
         0.03, 0.20, -0.03,
         0.03, 0.20,  0.03,
        -0.03, 0.20,  0.03,

        // Face superior
        -0.03, 0.30, -0.03,
         0.03, 0.30, -0.03,
         0.03, 0.30,  0.03,
        -0.03, 0.30,  0.03
    ]);
}

// ==================================================
// HELICOPTER TOP SHAFT COLORS
// ==================================================

function helicopterTopShaftColors(){

    return new Float32Array([

        // Face inferior
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,

        // Face superior
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
    ]);
}

// ==================================================
// HELICOPTER TOP SHAFT INDICES
// ==================================================

function helicopterTopShaftIndices(){

    return new Uint16Array([

        // Bottom
        0, 1, 2,
        0, 2, 3,

        // Top
        4, 6, 5,
        4, 7, 6,

        // Front
        0, 4, 5,
        0, 5, 1,

        // Back
        3, 2, 6,
        3, 6, 7,

        // Left
        0, 3, 7,
        0, 7, 4,

        // Right
        1, 5, 6,
        1, 6, 2
    ]);
}


// ==================================================
// HELICOPTER TAIL VERTICES
// ==================================================

function helicopterTailVertices(){

    return new Float32Array([
         0.0, -0.05,  0.05,
         0.7, -0.05,  0.05,
         0.7,  0.05,  0.05,
         0.0,  0.05,  0.05,

         0.0, -0.05, -0.05,
         0.7, -0.05, -0.05,
         0.7,  0.05, -0.05,
         0.0,  0.05, -0.05
    ]);
}

// ==================================================
// HELICOPTER TAIL COLORS
// ==================================================

function helicopterTailColors(){
    return new Float32Array([
        0.8, 0.2, 0.2,
        0.8, 0.2, 0.2,
        0.8, 0.2, 0.2,
        0.8, 0.2, 0.2,

        0.8, 0.2, 0.2,
        0.8, 0.2, 0.2,
        0.8, 0.2, 0.2,
        0.8, 0.2, 0.2,
    ]);
}

// ==================================================
// HELICOPTER TAIL INDICES
// ==================================================

function helicopterTailIndices(){
    return new Uint16Array([
        0, 1, 2,
        0, 2, 3,

        4, 6, 5,
        4, 7, 6,

        0, 3, 7,
        0, 7, 4,

        1, 5, 6,
        1, 6, 2,

        3, 2, 6,
        3, 6, 7,

        0, 4, 5,
        0, 5, 1
    ])
}

// ==================================================
// HELICOPTER PROPELLERS VERTICES
// ==================================================

function helicopterPropellersVertices(){

    return new Float32Array([

        // ==========================================
        // PROPELLER 1
        // Comprimento: 1.6
        // Largura:     0.2
        // Espessura:   0.05
        // ==========================================

        // Face inferior
        -0.8, 0.30, -0.05,
         0.8, 0.30, -0.05,
         0.8, 0.30,  0.05,
        -0.8, 0.30,  0.05,

        // Face superior
        -0.8, 0.35, -0.05,
         0.8, 0.35, -0.05,
         0.8, 0.35,  0.05,
        -0.8, 0.35,  0.05,


        // ==========================================
        // PROPELLER 2
        // Comprimento: 1.6
        // Largura:     0.2
        // Espessura:   0.1
        // ==========================================

        // Face inferior
        -0.05, 0.35, -0.8,
         0.05, 0.35, -0.8,
         0.05, 0.35,  0.8,
        -0.05, 0.35,  0.8,

        // Face superior
        -0.05, 0.4, -0.8,
         0.05, 0.4, -0.8,
         0.05, 0.4,  0.8,
        -0.05, 0.4,  0.8
    ]);
}

// ==================================================
// HELICOPTER PROPELLERS COLORS
// ==================================================

function helicopterPropellersColors(){
    return new Float32Array([
        // Verde suave
        0.4, 0.8, 0.4,
        0.4, 0.8, 0.4,
        0.4, 0.8, 0.4,
        0.4, 0.8, 0.4,

        0.4, 0.8, 0.4,
        0.4, 0.8, 0.4,
        0.4, 0.8, 0.4,
        0.4, 0.8, 0.4,

        // Ciano suave
        0.4, 0.85, 0.85,
        0.4, 0.85, 0.85,
        0.4, 0.85, 0.85,
        0.4, 0.85, 0.85,

        0.4, 0.85, 0.85,
        0.4, 0.85, 0.85,
        0.4, 0.85, 0.85,
        0.4, 0.85, 0.85
    ]);
}

// ==================================================
// HELICOPTER PROPELLERS INDICES
// ==================================================

function helicopterPropellersIndices(){

    return new Uint16Array([

        // ==========================================
        // PROPELLER 1
        // ==========================================

        // Face inferior
        0, 1, 2,
        0, 2, 3,

        // Face superior
        4, 6, 5,
        4, 7, 6,

        // Frente
        0, 4, 5,
        0, 5, 1,

        // Trás
        3, 2, 6,
        3, 6, 7,

        // Esquerda
        0, 3, 7,
        0, 7, 4,

        // Direita
        1, 5, 6,
        1, 6, 2,


        // ==========================================
        // PROPELLER 2
        // ==========================================

        // Face inferior
        8, 9, 10,
        8, 10, 11,

        // Face superior
        12, 14, 13,
        12, 15, 14,

        // Frente
        8, 12, 13,
        8, 13, 9,

        // Trás
        11, 10, 14,
        11, 14, 15,

        // Esquerda
        8, 11, 15,
        8, 15, 12,

        // Direita
        9, 13, 14,
        9, 14, 10
    ]);
}

// ==================================================
// HELICOPTER TAIL PROPELLER VERTICES
// ==================================================

function helicopterTailPropellerVertices(){
    return new Float32Array([

        // ==========================================
        // PÁ 1 — direção X
        // ==========================================

        // Face inferior
        0.55, -0.025, 0.05,
        0.85, -0.025, 0.05,
        0.85,  0.025, 0.05,
        0.55,  0.025, 0.05,

        // Face superior
        0.55, -0.025,  0.06,
        0.85, -0.025,  0.06,
        0.85,  0.025,  0.06,
        0.55,  0.025,  0.06,


        // ==========================================
        // PÁ 2 — direção Y
        // ==========================================

        // Face inferior
        0.675, -0.15, 0.06,
        0.725, -0.15, 0.06,
        0.725,  0.15, 0.06,
        0.675,  0.15, 0.06,

        // Face superior
        0.675, -0.15,  0.07,
        0.725, -0.15,  0.07,
        0.725,  0.15,  0.07,
        0.675,  0.15,  0.07
    ]);
}

// ==================================================
// HELICOPTER TAIL PROPELLER COLORS
// ==================================================

function helicopterTailPropellerColors(){

    return new Float32Array([

        // Pá 1
        0.35, 0.75, 0.65,
        0.35, 0.75, 0.65,
        0.35, 0.75, 0.65,
        0.35, 0.75, 0.65,

        0.35, 0.75, 0.65,
        0.35, 0.75, 0.65,
        0.35, 0.75, 0.65,
        0.35, 0.75, 0.65,

        // Pá 2
        0.35, 0.85, 0.85,
        0.35, 0.85, 0.85,
        0.35, 0.85, 0.85,
        0.35, 0.85, 0.85,

        0.35, 0.85, 0.85,
        0.35, 0.85, 0.85,
        0.35, 0.85, 0.85,
        0.35, 0.85, 0.85
    ]);
}

// ==================================================
// HELICOPTER TAIL PROPELLER INDICES
// ==================================================


function helicopterTailPropellerIndices() {

    return new Uint16Array([

        // ==========================================
        // PÁ 1 — direção X
        // ==========================================

        // Face em z = 0.05: normal -Z
        0, 2, 1,
        0, 3, 2,

        // Face em z = 0.06: normal +Z
        4, 5, 6,
        4, 6, 7,

        // Face em y = -0.025: normal -Y
        0, 5, 4,
        0, 1, 5,

        // Face em y = +0.025: normal +Y
        3, 6, 2,
        3, 7, 6,

        // Face em x = 0.55: normal -X
        0, 7, 3,
        0, 4, 7,

        // Face em x = 0.85: normal +X
        1, 6, 5,
        1, 2, 6,


        // ==========================================
        // PÁ 2 — direção Y
        // ==========================================

        // Face em z = 0.06: normal -Z
        8, 10, 9,
        8, 11, 10,

        // Face em z = 0.07: normal +Z
        12, 13, 14,
        12, 14, 15,

        // Face em y = -0.15: normal -Y
        8, 13, 12,
        8, 9, 13,

        // Face em y = +0.15: normal +Y
        11, 14, 10,
        11, 15, 14,

        // Face em x = 0.675: normal -X
        8, 15, 11,
        8, 12, 15,

        // Face em x = 0.725: normal +X
        9, 14, 13,
        9, 10, 14

    ]);
}



// ==================================================
// GEOMETRY
// ==================================================

function addNormalsToGeometry(vertices, colors, indices) {

    const newVertices = [];
    const newColors = [];
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

        if (length === 0) {
            throw new Error("Triângulo degenerado: normal indefinida.");
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

            newColors.push(
                colors[index * 3],
                colors[index * 3 + 1],
                colors[index * 3 + 2]
            );

            newNormals.push(nx, ny, nz);

            newIndices.push(newIndices.length);
        }
    }

    return {
        vertices: new Float32Array(newVertices),
        colors: new Float32Array(newColors),
        normals: new Float32Array(newNormals),
        indices: new Uint16Array(newIndices)
    };
}

const helicopterBodyGeometry = addNormalsToGeometry(
    helicopterBodyVertices(),
    helicopterBodyColors(),
    helicopterBodyIndices()
);

const helicopterTopShaftGeometry = addNormalsToGeometry(
    helicopterTopShaftVertices(),
    helicopterTopShaftColors(),
    helicopterTopShaftIndices()
);

const helicopterTailGeometry = addNormalsToGeometry(
    helicopterTailVertices(),
    helicopterTailColors(),
    helicopterTailIndices()
);

const helicopterPropellersGeometry = addNormalsToGeometry(
    helicopterPropellersVertices(),
    helicopterPropellersColors(),
    helicopterPropellersIndices()
);

const helicopterTailPropellerGeometry = addNormalsToGeometry(
    helicopterTailPropellerVertices(),
    helicopterTailPropellerColors(),
    helicopterTailPropellerIndices()
);
