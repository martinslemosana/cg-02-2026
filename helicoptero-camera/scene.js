// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        // Figura que será exibida
        this.helicopter = new Helicopter();

        this.viewTransform = m4.setViewingMatrix(
            [2, 2, 10], // Ponto de observação (P0)
            [0, 0, 0],  // Ponto de referência (Pref)
            [0, 1, 0]   // Vetor "up" (V)
        );

        this.projectionTransform = m4.setPerspectiveProjectionMatrix(
            -1, 1,   // left, right
            -1, 1,   // bottom, top
            -5, -100 // near, far
        );

        this.theta = 0.0;
    }

    update() {
        this.theta += 0.01;
        this.helicopter.update();
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        this.helicopter.draw(
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

