// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        this.object = new Cube();

        this.color = [Math.random(), Math.random(), Math.random()];

        this.tx = 0.0;
        this.ty = 0.0;
        this.tz = 0.0;

        this.theta = 0.0;

        // Velocidades
        this.vx = 0.01;
        this.vy = 0.005;
        this.vz = 0.0;

        this.vtheta = 0.02;

        // Limites do espaço
        this.minX = -4.0;
        this.maxX = 4.0;

        this.minY = -3.0;
        this.maxY = 3.0;

        this.minZ = -4.0;
        this.maxZ = 4.0;

        // Configura o teclado
        this.setupKeyboard();


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
            -2, -100 // near, far
        );
    */
	
        const fov = 60 * Math.PI / 180;
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

    setupKeyboard() {

        document.addEventListener("keydown", (event) => {

            if (["1", "2", "3", "4", "5", "6", "7", "8"].includes(event.key)) {
                this.changeObject(event.key);
            }

        });
    }

    changeObject(key) {

        switch (key) {

            case "1":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Cube();
                break;

            case "2":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Sphere();
                break;

            case "3":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Torus();
                break;

            case "4":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Ellipsoid();
                break;

            case "5":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Superquadric();
                break;

            case "6":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new WineGlass();
                break;
            case "7":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Cylinder();
                break;
            case "8":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Spring();
                break;
        }

        // Aplica a posição e a rotação atuais ao novo objeto
        this.object.update(
            this.tx,
            this.ty,
            this.tz,
            this.theta
        );
    }

    update() {
        // Atualiza a posição
        this.tx += this.vx;
        this.ty += this.vy;
        this.tz += this.vz;

        // Atualiza a rotação
        this.theta += this.vtheta;

        // Limite esquerdo e direito
        if (this.tx >= this.maxX || this.tx <= this.minX) {
            this.vx = -this.vx;
        }

        // Limite inferior e superior
        if (this.ty >= this.maxY || this.ty <= this.minY) {
            this.vy = -this.vy;
        }

        // Limites de profundidade
        if (this.tz >= this.maxZ || this.tz <= this.minZ) {
            this.vz = -this.vz;
        }

        // Atualiza as transformações do objeto
        this.object.update(
            this.tx,
            this.ty,
            this.tz,
            this.theta
        );
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        this.object.draw(
            this.renderer,
            this.color,
            this.viewTransform,
            this.projectionTransform,
            this.lightPositions,
            this.viewPosition
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