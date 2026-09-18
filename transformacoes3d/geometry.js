// ==================================================
// CUBE VERTICES
// ==================================================

function cubeVertices(sideSize){
    let pos = sideSize/2;
    return new Float32Array([
            // Front
            -pos,-pos, pos,
             pos,-pos, pos,
             pos, pos, pos,
            -pos, pos, pos,

            // Back
            -pos,-pos,-pos,
            -pos, pos,-pos,
             pos, pos,-pos,
             pos,-pos,-pos,

            // Top
            -pos, pos,-pos,
            -pos, pos, pos,
             pos, pos, pos,
             pos, pos,-pos,

            // Bottom
            -pos,-pos,-pos,
             pos,-pos,-pos,
             pos,-pos, pos,
            -pos,-pos, pos,

            // Right
             pos,-pos,-pos,
             pos, pos,-pos,
             pos, pos, pos,
             pos,-pos, pos,

            // Left
            -pos,-pos,-pos,
            -pos,-pos, pos,
            -pos, pos, pos,
            -pos, pos,-pos
    ]);
}

// ==================================================
// CUBE COLORS
// ==================================================

function cubeColors(){
    return new Float32Array([
            // Front - red
            1,0,0,  1,0,0,  1,0,0,  1,0,0,

            // Back - green
            0,1,0,  0,1,0,  0,1,0,  0,1,0,

            // Top - blue
            0,0,1,  0,0,1,  0,0,1,  0,0,1,

            // Bottom - yellow
            1,1,0,  1,1,0,  1,1,0,  1,1,0,

            // Right - magenta
            1,0,1,  1,0,1,  1,0,1,  1,0,1,

            // Left - cyan
            0,1,1,  0,1,1,  0,1,1,  0,1,1
    ]);
}

// ==================================================
// CUBE INDICES
// ==================================================

function cubeIndices(){
    return new Uint16Array([
             0,1,2,  0,2,3,       // front
             4,5,6,  4,6,7,       // back
             8,9,10, 8,10,11,     // top
            12,13,14,12,14,15,    // bottom
            16,17,18,16,18,19,    // right
            20,21,22,20,22,23     // left
    ])
}

// ==================================================
// PYRAMID VERTICES
// ==================================================

function pyramidVertices(sideSize, height) {

    let s = sideSize / 2;
    let h = height / 2;

    return new Float32Array([

        // Bottom
        -s,-h,-s,
         s,-h,-s,
         s,-h, s,
        -s,-h, s,

        // Front
        -s,-h, s,
         s,-h, s,
         0, h, 0,

        // Right
         s,-h, s,
         s,-h,-s,
         0, h, 0,

        // Back
         s,-h,-s,
        -s,-h,-s,
         0, h, 0,

        // Left
        -s,-h,-s,
        -s,-h, s,
         0, h, 0
    ]);
}

// ==================================================
// PYRAMID COLORS
// ==================================================

function pyramidColors() {

    return new Float32Array([

        // Bottom - yellow
        1,1,0,
        1,1,0,
        1,1,0,
        1,1,0,

        // Front - red
        1,0,0,
        1,0,0,
        1,0,0,

        // Right - green
        0,1,0,
        0,1,0,
        0,1,0,

        // Back - blue
        0,0,1,
        0,0,1,
        0,0,1,

        // Left - magenta
        1,0,1,
        1,0,1,
        1,0,1
    ]);
}

// ==================================================
// PYRAMID INDICES
// ==================================================

function pyramidIndices() {

    return new Uint16Array([

        // Base
         0,1,2,
         0,2,3,

        // Frente
         4,5,6,

        // Direita
         7,8,9,

        // Trás
        10,11,12,

        // Esquerda
        13,14,15
    ]);
}

// ==================================================
// OCTAHEDRON VERTICES
// ==================================================

function octahedronVertices(sideSize, height) {

    let s = sideSize / 2;
    let h = height / 2;

    return new Float32Array([

        // Top Front
        -s, 0, s,
         s, 0, s,
         0, h, 0,

        // Top Right
         s, 0, s,
         s, 0,-s,
         0, h, 0,

        // Top Back
         s, 0,-s,
        -s, 0,-s,
         0, h, 0,

        // Top Left
        -s, 0,-s,
        -s, 0, s,
         0, h, 0,

        // Bottom Front
         s, 0, s,
        -s, 0, s,
         0,-h, 0,

        // Bottom Right
         s, 0,-s, 
         s, 0, s,
         0,-h, 0,

        // Bottom Back
        -s, 0,-s,
         s, 0,-s,
         0,-h, 0,

        // Bottom Left
        -s, 0, s,
        -s, 0,-s,
         0,-h, 0
    ]);
}

// ==================================================
// OCTAHEDRON COLORS
// ==================================================

function octahedronColors() {

    return new Float32Array([

        // Top Front - red
         1, 0, 0,
         1, 0, 0,
         1, 0, 0,

        // Top Right - green
         0, 1, 0,
         0, 1, 0,
         0, 1, 0,

        // Top Back - blue
         0, 0, 1,
         0, 0, 1,
         0, 0, 1,

        // Top Left - yellow
         1, 1, 0,
         1, 1, 0,
         1, 1, 0,

        // Bottom Front - magenta
         1, 0, 1,
         1, 0, 1,
         1, 0, 1,

        // Bottom Right - cyan
         0, 1, 1,
         0, 1, 1,
         0, 1, 1,

        // Bottom Back - white
         1, 1, 1,
         1, 1, 1,
         1, 1, 1,

        // Bottom Left - gray
         0.5, 0.5, 0.5,
         0.5, 0.5, 0.5,
         0.5, 0.5, 0.5
    ]);
}

// ==================================================
// OCTAHEDRON INDICES
// ==================================================

function octahedronIndices() {

    return new Uint16Array([

         0,1,2,
         3,4,5,
         6,7,8,
         9,10,11,
         12,13,14,
         15,16,17,
         18,19,20,
         21,22,23
    ]);
}

// ==================================================
// HEXAGONAL PRISM VERTICES
// ==================================================

function hexagonalPrismVertices(radius, height) {

    const h = height / 2;

    return new Float32Array([

        // ==================================================
        // BASE INFERIOR - Y = -h
        // ==================================================

        0, -h, 0,
        radius, -h, 0,
        radius / 2, -h, radius * Math.sqrt(3) / 2,

        0, -h, 0,
        radius / 2, -h, radius * Math.sqrt(3) / 2,
        -radius / 2, -h, radius * Math.sqrt(3) / 2,

        0, -h, 0,
        -radius / 2, -h, radius * Math.sqrt(3) / 2,
        -radius, -h, 0,

        0, -h, 0,
        -radius, -h, 0,
        -radius / 2, -h, -radius * Math.sqrt(3) / 2,

        0, -h, 0,
        -radius / 2, -h, -radius * Math.sqrt(3) / 2,
        radius / 2, -h, -radius * Math.sqrt(3) / 2,

        0, -h, 0,
        radius / 2, -h, -radius * Math.sqrt(3) / 2,
        radius, -h, 0,


        // ==================================================
        // BASE SUPERIOR - Y = +h
        // ==================================================

        0, h, 0,
        radius / 2, h, radius * Math.sqrt(3) / 2,
        radius, h, 0,

        0, h, 0,
        -radius / 2, h, radius * Math.sqrt(3) / 2,
        radius / 2, h, radius * Math.sqrt(3) / 2,

        0, h, 0,
        -radius, h, 0,
        -radius / 2, h, radius * Math.sqrt(3) / 2,

        0, h, 0,
        -radius / 2, h, -radius * Math.sqrt(3) / 2,
        -radius, h, 0,

        0, h, 0,
        radius / 2, h, -radius * Math.sqrt(3) / 2,
        -radius / 2, h, -radius * Math.sqrt(3) / 2,

        0, h, 0,
        radius, h, 0,
        radius / 2, h, -radius * Math.sqrt(3) / 2,


        // ==================================================
        // LATERAL 1
        // ==================================================

        radius, -h, 0,
        radius, h, 0,
        radius / 2, h, radius * Math.sqrt(3) / 2,

        radius, -h, 0,
        radius / 2, h, radius * Math.sqrt(3) / 2,
        radius / 2, -h, radius * Math.sqrt(3) / 2,


        // ==================================================
        // LATERAL 2
        // ==================================================

        radius / 2, -h, radius * Math.sqrt(3) / 2,
        radius / 2, h, radius * Math.sqrt(3) / 2,
        -radius / 2, h, radius * Math.sqrt(3) / 2,

        radius / 2, -h, radius * Math.sqrt(3) / 2,
        -radius / 2, h, radius * Math.sqrt(3) / 2,
        -radius / 2, -h, radius * Math.sqrt(3) / 2,


        // ==================================================
        // LATERAL 3
        // ==================================================

        -radius / 2, -h, radius * Math.sqrt(3) / 2,
        -radius / 2, h, radius * Math.sqrt(3) / 2,
        -radius, h, 0,

        -radius / 2, -h, radius * Math.sqrt(3) / 2,
        -radius, h, 0,
        -radius, -h, 0,


        // ==================================================
        // LATERAL 4
        // ==================================================

        -radius, -h, 0,
        -radius, h, 0,
        -radius / 2, h, -radius * Math.sqrt(3) / 2,

        -radius, -h, 0,
        -radius / 2, h, -radius * Math.sqrt(3) / 2,
        -radius / 2, -h, -radius * Math.sqrt(3) / 2,


        // ==================================================
        // LATERAL 5
        // ==================================================

        -radius / 2, -h, -radius * Math.sqrt(3) / 2,
        -radius / 2, h, -radius * Math.sqrt(3) / 2,
        radius / 2, h, -radius * Math.sqrt(3) / 2,

        -radius / 2, -h, -radius * Math.sqrt(3) / 2,
        radius / 2, h, -radius * Math.sqrt(3) / 2,
        radius / 2, -h, -radius * Math.sqrt(3) / 2,


        // ==================================================
        // LATERAL 6
        // ==================================================

        radius / 2, -h, -radius * Math.sqrt(3) / 2,
        radius / 2, h, -radius * Math.sqrt(3) / 2,
        radius, h, 0,

        radius / 2, -h, -radius * Math.sqrt(3) / 2,
        radius, h, 0,
        radius, -h, 0

    ]);
}

// ==================================================
// HEXAGONAL PRISM COLORS
// ==================================================

function hexagonalPrismColors() {

    return new Float32Array([

        // Base inferior
        1,0,0,  1,0,0,  1,0,0,
        1,0,0,  1,0,0,  1,0,0,
        1,0,0,  1,0,0,  1,0,0,
        1,0,0,  1,0,0,  1,0,0,
        1,0,0,  1,0,0,  1,0,0,
        1,0,0,  1,0,0,  1,0,0,

        // Base superior
        0,1,0,  0,1,0,  0,1,0,
        0,1,0,  0,1,0,  0,1,0,
        0,1,0,  0,1,0,  0,1,0,
        0,1,0,  0,1,0,  0,1,0,
        0,1,0,  0,1,0,  0,1,0,
        0,1,0,  0,1,0,  0,1,0,

        // Lateral 1
        0,0,1,  0,0,1,  0,0,1,
        0,0,1,  0,0,1,  0,0,1,

        // Lateral 2
        1,1,0,  1,1,0,  1,1,0,
        1,1,0,  1,1,0,  1,1,0,

        // Lateral 3
        1,0,1,  1,0,1,  1,0,1,
        1,0,1,  1,0,1,  1,0,1,

        // Lateral 4
        0,1,1,  0,1,1,  0,1,1,
        0,1,1,  0,1,1,  0,1,1,

        // Lateral 5
        1,0.5,0,  1,0.5,0,  1,0.5,0,
        1,0.5,0,  1,0.5,0,  1,0.5,0,

        // Lateral 6
        0.5,0,1,  0.5,0,1,  0.5,0,1,
        0.5,0,1,  0.5,0,1,  0.5,0,1

    ]);
}


// ==================================================
// HEXAGONAL PRISM INDICES
// ==================================================

function hexagonalPrismIndices() {

    return new Uint16Array([

        // Base inferior
         0,  1,  2,
         3,  4,  5,
         6,  7,  8,
         9, 10, 11,
        12, 13, 14,
        15, 16, 17,

        // Base superior
        18, 19, 20,
        21, 22, 23,
        24, 25, 26,
        27, 28, 29,
        30, 31, 32,
        33, 34, 35,

        // Lateral 1
        36, 37, 38,
        39, 40, 41,

        // Lateral 2
        42, 43, 44,
        45, 46, 47,

        // Lateral 3
        48, 49, 50,
        51, 52, 53,

        // Lateral 4
        54, 55, 56,
        57, 58, 59,

        // Lateral 5
        60, 61, 62,
        63, 64, 65,

        // Lateral 6
        66, 67, 68,
        69, 70, 71

    ]);
}

// ==================================================
// GEOMETRY
// ==================================================

const cubeGeometry = {
    vertices: cubeVertices(0.4),
    colors: cubeColors(),
    indices: cubeIndices()
};

const pyramidGeometry = {
    vertices: pyramidVertices(0.4, 0.4),
    colors: pyramidColors(),
    indices: pyramidIndices()
};

const octahedronGeometry = {
    vertices: octahedronVertices(0.4, 0.8),
    colors: octahedronColors(),
    indices: octahedronIndices()
};

const hexagonalPrismGeometry = {
    vertices: hexagonalPrismVertices(0.4, 0.4),
    colors: hexagonalPrismColors(),
    indices: hexagonalPrismIndices()
};