// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(
        vertices,
        colors,
        indices,
    ) {

        this.vertices = vertices;
        this.colors = colors;
        this.indices = indices;

        this.modelTransform = m4.identity();
    }

    update(modelTransform) {
        this.modelTransform = modelTransform;
    }

    updateModelTransform(modelTransform) {

        this.modelTransform =
            modelTransform;
    }

    draw(renderer) {

        renderer.draw(this);
    }
}