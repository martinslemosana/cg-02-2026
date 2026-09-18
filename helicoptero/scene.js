// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        // Figura que será exibida
        this.helicopterBody =
        new SceneObject(
            helicopterBodyGeometry.vertices,
            helicopterBodyGeometry.colors,
            helicopterBodyGeometry.indices,
        );

        this.helicopterTopShaft =
        new SceneObject(
            helicopterTopShaftGeometry.vertices,
            helicopterTopShaftGeometry.colors,
            helicopterTopShaftGeometry.indices,
        );

        this.helicopteTail =
        new SceneObject(
            helicopterTailGeometry.vertices,
            helicopterTailGeometry.colors,
            helicopterTailGeometry.indices,
        );

        this.helicopterPropellers =
        new SceneObject(
            helicopterPropellersGeometry.vertices,
            helicopterPropellersGeometry.colors,
            helicopterPropellersGeometry.indices,
        );

        this.helicopterTailPropeller =
        new SceneObject(
            helicopterTailPropellerGeometry.vertices,
            helicopterTailPropellerGeometry.colors,
            helicopterTailPropellerGeometry.indices
        );

        this.theta = 0.0;
    }

    update() {
        this.theta += 0.01;
        this.helicopterBody.update(m4.xRotation(this.theta));
        this.helicopterTopShaft.update(m4.xRotation(this.theta));
        this.helicopteTail.update(m4.xRotation(this.theta));
        this.helicopterPropellers.update(m4.xRotation(this.theta));
        this.helicopterTailPropeller.update(m4.xRotation(this.theta));
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        this.helicopterBody.draw(
            this.renderer
        );

        this.helicopterTopShaft.draw(
            this.renderer
        );

        this.helicopteTail.draw(
            this.renderer
        );

        this.helicopterPropellers.draw(
            this.renderer
        );

        this.helicopterTailPropeller.draw(
            this.renderer
        );
    }

    execute() {

        this.update();
        this.draw();

        requestAnimationFrame(
            () => this.execute()
        );
    }

    init() {

        requestAnimationFrame(
            () => this.execute()
        );
    }
}

