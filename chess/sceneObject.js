// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(geometry) {

        this.geometry = geometry;

        this.localTransform = m4.identity();

        this.modelTransform = m4.identity();
    }

    update(tx, ty, tz, theta) {

        const translationRotation = m4.multiply(
            m4.translation(tx, ty, tz),
            m4.yRotation(theta)
        );

        this.modelTransform = m4.multiply(
            translationRotation,
            this.localTransform
        );
    }

    draw(
        renderer, 
        viewTransform, 
        projectionTransform,
        lightPositions, 
        viewPosition,
        shadingMode
    ) {

        renderer.draw(
            this,
            viewTransform,
            projectionTransform,
            lightPositions,
            viewPosition,
            shadingMode
        );
    }
}

class ChessPiece extends SceneObject {

    constructor(geometry) {

        super(geometry);

        this.localTransform = m4.scaling(0.5, 0.5, 0.5);

        this.modelTransform = this.localTransform;
    }

    static async create(url) {

        const rawGeometry =
            await generateChessPieceGeometry(url);

        const geometry =
            prepareChessPieceGeometry(rawGeometry);

        return new ChessPiece(geometry);
    }
}

function prepareChessPieceGeometry(rawGeometry) {

    const vertices = rawGeometry.vertices;
    const normals = rawGeometry.normals;
    const texCoords = rawGeometry.texCoords;
    const indices = rawGeometry.indices;

    // ==========================================
    // SMOOTH GEOMETRY
    // ==========================================

    const smooth = {
        vertices: vertices,
        normals: normals,
        texCoords: texCoords,
        indices: indices
    };

    // ==========================================
    // FLAT GEOMETRY
    // ==========================================

    const flatVertices = [];
    const flatNormals = [];
    const flatTexCoords = [];
    const flatIndices = [];

    for (let i = 0; i < indices.length; i += 3) {

        const i0 = indices[i];
        const i1 = indices[i + 1];
        const i2 = indices[i + 2];

        const p0 = [
            vertices[i0 * 3],
            vertices[i0 * 3 + 1],
            vertices[i0 * 3 + 2]
        ];

        const p1 = [
            vertices[i1 * 3],
            vertices[i1 * 3 + 1],
            vertices[i1 * 3 + 2]
        ];

        const p2 = [
            vertices[i2 * 3],
            vertices[i2 * 3 + 1],
            vertices[i2 * 3 + 2]
        ];

        const v1 = [
            p1[0] - p0[0],
            p1[1] - p0[1],
            p1[2] - p0[2]
        ];

        const v2 = [
            p2[0] - p0[0],
            p2[1] - p0[1],
            p2[2] - p0[2]
        ];

        const normal = m4.unitVector(
            m4.crossProduct(v1, v2)
        );

        const points = [i0, i1, i2];

        for (const index of points) {

            flatVertices.push(
                vertices[index * 3],
                vertices[index * 3 + 1],
                vertices[index * 3 + 2]
            );

            flatNormals.push(
                normal[0],
                normal[1],
                normal[2]
            );

            flatTexCoords.push(
                texCoords[index * 2],
                texCoords[index * 2 + 1]
            );

            flatIndices.push(flatIndices.length);
        }
    }

    const flat = {
        vertices: new Float32Array(flatVertices),
        normals: new Float32Array(flatNormals),
        texCoords: new Float32Array(flatTexCoords),
        indices: new Uint32Array(flatIndices)
    };

    return {
        flat: flat,
        smooth: smooth
    };
}