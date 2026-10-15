// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        // Figura que será exibida
        this.helicopterBody = new HelicopterBody();

        this.helicopterTopShaft = new HelicopterTopShaft();

        this.helicopterTail = new HelicopterTail();

        this.helicopterPropellers = new HelicopterPropellers();

        this.helicopterTailPropeller = new HelicopterTailPropeller();

        this.viewTransform = m4.setViewingMatrix(
            [-5, 5, 10], // Ponto de observação (P0)
            [0, 0, 0],  // Ponto de referência (Pref)
            [0, 1, 0]   // Vetor "up" (V)
        );

        this.projectionTransform = m4.setOrthographicProjectionMatrix(
            -2, 2,   // left, right
            -2, 2,   // bottom, top
            -0.1, -100 // near, far
        );

        this.theta = 0.0;
    }

    update() {
        this.theta += 0.01;
        this.helicopterBody.update(m4.identity());
        this.helicopterTopShaft.update(m4.identity());
        this.helicopterTail.update(m4.identity());
        this.helicopterPropellers.update(m4.identity());
        this.helicopterTailPropeller.update(m4.identity());
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        this.helicopterBody.draw(
            this.renderer,this.viewTransform,this.projectionTransform
        );

        this.helicopterTopShaft.draw(
            this.renderer,this.viewTransform,this.projectionTransform
        );

        this.helicopterTail.draw(
            this.renderer,this.viewTransform,this.projectionTransform
        );

        this.helicopterPropellers.draw(
            this.renderer,this.viewTransform,this.projectionTransform
        );

        this.helicopterTailPropeller.draw(
            this.renderer,this.viewTransform,this.projectionTransform
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

