async function generateChessPieceGeometry(url) {

    // Lê o arquivo OBJ
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Não foi possível carregar o arquivo OBJ.");
    }

    const objText = await response.text();

    // Dados originais do arquivo
    const positions = [];
    const normals = [];
    const texCoords = [];
    const faces = [];

    // ==================================================
    // 1. INTERPRETAÇÃO DO ARQUIVO OBJ
    // ==================================================

    const lines = objText.split("\n");

    for (const line of lines) {

        const parts = line.trim().split(/\s+/);

        if (parts[0] === "v") {

            positions.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ]);

        }

        else if (parts[0] === "vn") {

            normals.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ]);

        }
        else if (parts[0] === "vt") {

            texCoords.push([
                parseFloat(parts[1]),
                parseFloat(parts[2])
            ]);

        }

        else if (parts[0] === "f") {

            faces.push(parts.slice(1));

        }
    }

    // ==================================================
    // 2. LIMITES DA GEOMETRIA
    // ==================================================

    let minX = Infinity;
    let maxX = -Infinity;

    let minY = Infinity;
    let maxY = -Infinity;

    let minZ = Infinity;
    let maxZ = -Infinity;

    for (const p of positions) {

        minX = Math.min(minX, p[0]);
        maxX = Math.max(maxX, p[0]);

        minY = Math.min(minY, p[1]);
        maxY = Math.max(maxY, p[1]);

        minZ = Math.min(minZ, p[2]);
        maxZ = Math.max(maxZ, p[2]);
    }

    // ==================================================
    // 4. CONSTRUÇÃO DA GEOMETRIA INDEXADA
    // ==================================================

    const vertices = [];
    const vertexNormals = [];
    const vertexTexCoords = [];
    const indices = [];

    // Mapeia cada combinação de vértice e normal
    // para um índice na geometria final.
    const vertexMap = new Map();

    
    function getVertexIndex(vertexData) {

        const positionIndex = parseInt(vertexData[0]) - 1;
        const texCoordIndex = parseInt(vertexData[1]) - 1;
        const normalIndex = parseInt(vertexData[2]) - 1;

        // A combinação dos três índices identifica um vértice.
        const key = `${positionIndex}/${texCoordIndex}/${normalIndex}`;

        if (vertexMap.has(key)) {
            return vertexMap.get(key);
        }

        const index = vertices.length / 3;

        const p = positions[positionIndex];
        const n = normals[normalIndex];
        const uv = texCoords[texCoordIndex];

        vertices.push(p[0], p[1], p[2]);

        vertexNormals.push(n[0], n[1], n[2]);

        vertexTexCoords.push(uv[0], uv[1]);

        vertexMap.set(key, index);

        return index;
    }


    // ==================================================
    // 5. GERAÇÃO DOS ÍNDICES
    // ==================================================

    for (const face of faces) {

        // Converte os vértices da face em índices
        const faceIndices = face.map(vertexData => {
            return getVertexIndex(vertexData.split("/"));
        });

        // Triangulação por fan:
        // funciona também para faces com mais de 3 vértices.
        for (let i = 1; i < faceIndices.length - 1; i++) {

            indices.push(
                faceIndices[0],
                faceIndices[i],
                faceIndices[i + 1]
            );
        }
    }

    // ==================================================
    // 6. RETORNO DA GEOMETRIA
    // ==================================================

    return {

        vertices: new Float32Array(vertices),

        normals: new Float32Array(vertexNormals),

        texCoords: new Float32Array(vertexTexCoords),

        indices: new Uint32Array(indices)

    };
}