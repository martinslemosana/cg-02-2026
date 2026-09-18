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

        this.tx = 0.01;
        this.ty = 0.01;

        // Eixo de rotação atual
        this.rotationAxis = null;

        this.theta = 0.02;

        this.modelTransform = m4.identity();
    }

    update() {

        if (this.rotationAxis === "x") {

            this.modelTransform =
                m4.multiply(
                    m4.xRotation(this.theta),
                    this.modelTransform
                );
        }

        else if (this.rotationAxis === "y") {

            this.modelTransform =
                m4.multiply(
                    m4.yRotation(this.theta),
                    this.modelTransform
                );
        }

        else if (this.rotationAxis === "z") {

            this.modelTransform =
                m4.multiply(
                    m4.zRotation(this.theta),
                    this.modelTransform
                );
        }

    }

    // Move o objeto uma unidade
    move(dx, dy) {

        this.tx += dx;
        this.ty += dy;

        this.modelTransform =
            m4.multiply(
                m4.translation(dx, dy, 0.0),
                this.modelTransform
            );
    }

    updateModelTransform(modelTransform) {

        this.modelTransform =
            modelTransform;
    }

    draw(renderer) {

        renderer.draw(this);
    }
}