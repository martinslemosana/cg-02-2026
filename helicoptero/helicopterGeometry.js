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
        0.1, 0.5, 0.7,
        0.1, 0.5, 0.7,
        0.1, 0.5, 0.7,
        0.1, 0.5, 0.7
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
        0.4, 0.4, 0.4,
        0.4, 0.4, 0.4,
        0.4, 0.4, 0.4,
        0.4, 0.4, 0.4
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

        0.6, 0.1, 0.1,
        0.6, 0.1, 0.1,
        0.6, 0.1, 0.1,
        0.6, 0.1, 0.1
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

function helicopterTailPropellerIndices(){

    return new Uint16Array([

        // ==========================================
        // PÁ 1
        // ==========================================

        // Frente
        0, 1, 2,
        0, 2, 3,

        // Trás
        4, 6, 5,
        4, 7, 6,

        // Lateral
        0, 4, 5,
        0, 5, 1,

        // Lateral
        3, 2, 6,
        3, 6, 7,

        // Lateral
        0, 3, 7,
        0, 7, 4,

        // Lateral
        1, 5, 6,
        1, 6, 2,


        // ==========================================
        // PÁ 2
        // ==========================================

        // Frente
        8, 9, 10,
        8, 10, 11,

        // Trás
        12, 14, 13,
        12, 15, 14,

        // Lateral
        8, 12, 13,
        8, 13, 9,

        // Lateral
        11, 10, 14,
        11, 14, 15,

        // Lateral
        8, 11, 15,
        8, 15, 12,

        // Lateral
        9, 13, 14,
        9, 14, 10
    ]);
}

// ==================================================
// GEOMETRY
// ==================================================

const helicopterBodyGeometry = {
    vertices: helicopterBodyVertices(),
    colors: helicopterBodyColors(),
    indices: helicopterBodyIndices()
};

const helicopterTopShaftGeometry = {
    vertices: helicopterTopShaftVertices(),
    colors: helicopterTopShaftColors(),
    indices: helicopterTopShaftIndices()
};

const helicopterTailGeometry = {
    vertices: helicopterTailVertices(),
    colors: helicopterTailColors(),
    indices: helicopterTailIndices()
};

const helicopterPropellersGeometry = {
    vertices: helicopterPropellersVertices(),
    colors: helicopterPropellersColors(),
    indices: helicopterPropellersIndices()
};

const helicopterTailPropellerGeometry = {
    vertices: helicopterTailPropellerVertices(),
    colors: helicopterTailPropellerColors(),
    indices: helicopterTailPropellerIndices()
};