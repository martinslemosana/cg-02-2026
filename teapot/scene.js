// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);


        this.textures = {
            "1": this.renderer.loadTexture("textures/madeira.jpg"),

            "2": this.renderer.loadTexture("textures/terra.jpg"),

            "3": this.renderer.loadTexture("textures/donut.jpeg"),

            "4": this.renderer.loadTexture("textures/pedra.jpeg"),

            "5": this.renderer.loadTexture("textures/metal_vermelho.jpeg"),

            "6": this.renderer.loadTexture("textures/vidro.jpg"),

            "7": this.renderer.loadTexture("textures/plastico02.jpeg"),

            "8": this.renderer.loadTexture("textures/metal.jpg")
        };

        this.object = null;

        this.shadingMode = 0; // começa com Flat

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

        
        const fov = 60 * Math.PI / 180;
        const aspect = canvas.width / canvas.height;
        const near = -5;
        const far = -100;

        this.projectionTransform = m4.setPerspectiveProjectionMatrixAngle(
                fov, aspect, near, far
        );

    
        this.lightPositions = [
            [ 4.0, 4.0,  5.0],
            [ -4.0, -4.0,  5.0]
        ];

        this.viewPosition = P0;
    }

    setupKeyboard() {

        document.addEventListener("keydown", (event) => {

            const key = event.key.toLowerCase();

            // Seleção do modelo de iluminação
            if (key === "f") {
                this.shadingMode = 0;
                console.log("Flat Shading");
            }

            if (key === "g") {
                this.shadingMode = 1;
                console.log("Gouraud Shading");
            }

            if (key === "p") {
                this.shadingMode = 2;
                console.log("Phong Shading");
            }

            // Seleção da textura
            if (key >= "1" && key <= "8") {

                this.changeTexture(key);
            }

        });
    }

    changeTexture(key) {

        this.object.texture = this.textures[key];
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
            this.viewTransform,
            this.projectionTransform,
            this.lightPositions,
            this.viewPosition,
            this.shadingMode
        );
    }

    execute() {

        this.update();
        this.draw();

        requestAnimationFrame(
            () => this.execute()
        );
    }

    async init() {

        this.object = await Teapot.create("teapot.obj");

        this.object.texture = this.textures["1"];

        this.object.update(
            this.tx,
            this.ty,
            this.tz,
            this.theta
        );

        requestAnimationFrame(
            () => this.execute()
        );
    }
}