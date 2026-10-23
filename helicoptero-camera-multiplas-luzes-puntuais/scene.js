// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        this.helicopters = [];

        const numberOfHelicopters = 10;

        for (let i = 0; i < numberOfHelicopters; i++) {

            const tx = Math.random() * 8.0 - 4.0;
            const ty = Math.random() * 6.0 - 3.0;
            const tz = Math.random() * 15.0 - 10.0;

            const helicopter = new Helicopter(tx, ty, tz);

            this.helicopters.push(helicopter);
        }

        const P0 = [6, 5, 10]; // Ponto de observação
        const Pref = [0, 0, 0]; // Ponto de referência
        const V = [0, 1, 0];    // Vetor "up"
        this.viewTransform = m4.setViewingMatrix(
            P0,    // Ponto de observação (P0)
            Pref,  // Ponto de referência (Pref)
            V      // Vetor "up" (V)
        );

    /*
        this.projectionTransform = m4.setOrthographicProjectionMatrix(
            -1, 1,   // left, right
            -1, 1,   // bottom, top
            -5, -100 // near, far
        );
    */
    
    /*
        this.projectionTransform = m4.setPerspectiveProjectionMatrix(
            -1, 1,   // left, right
            -1, 1,   // bottom, top
            -5, -100 // near, far
        );
    */

	
        const fov = 30 * Math.PI / 180;
        const aspect = canvas.width / canvas.height;
        const near = -5;
        const far = -100;

        this.projectionTransform = m4.setPerspectiveProjectionMatrixAngle(
                fov, aspect, near, far
        );
    
        this.lightPositions = [
            [ 4.0, 4.0,  5.0],
            [ 4.0, -4.0,  5.0]
        ];

        this.viewPosition = P0;
    }

    update() {

        for (const helicopter of this.helicopters) {
            helicopter.update();
        }

    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        for (const helicopter of this.helicopters) {

            helicopter.draw(
                this.renderer,
                this.viewTransform,
                this.projectionTransform,
                this.lightPositions,
                this.viewPosition
            );
        }
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

