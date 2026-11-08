// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);


        this.textures = {
            "b": this.renderer.loadTexture("textures/madeira.jpg"),

            "w": this.renderer.loadTexture("textures/madeira-clara.jpg"),
        };

        this.objects = [];

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

        this.objectPositions = [
            [-6.0, 0.0, 0.0],  // Rei
            [-3.0, 0.0, 0.0],  // Rainha
            [ 0.0, 0.0, 0.0],  // Bispo
            [ 3.0, 0.0, 0.0],  // Cavalo
            [ 6.0, 0.0, 0.0]   // Torre
        ];

        // Limites do espaço
        this.minX = -6.0;
        this.maxX = 6.0;

        this.minY = -3.0;
        this.maxY = 3.0;

        this.minZ = -4.0;
        this.maxZ = 4.0;

        // Configura o teclado
        this.setupKeyboard();

        const P0 = [0, 5, 10]; // Ponto de observação
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
            if (key == "b" || key == "w") {

                this.changeTexture(key);
            }

        });
    }

    changeTexture(key) {

        for (const object of this.objects) {
            object.texture = this.textures[key];
        }
    }

    update() {

        // Atualiza a rotação
        this.theta += this.vtheta;

        // Atualiza todas as peças
        for (let i = 0; i < this.objects.length; i++) {

            const position = this.objectPositions[i];

            this.objects[i].update(
                position[0],
                position[1],
                position[2],
                this.theta
            );
        }
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        for (const object of this.objects) {

            object.draw(
                this.renderer,
                this.viewTransform,
                this.projectionTransform,
                this.lightPositions,
                this.viewPosition,
                this.shadingMode
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

    async init() {

        this.objects = [
            await ChessPiece.create("king.obj"),
            await ChessPiece.create("queen.obj"),
            await ChessPiece.create("bishop.obj"),
            await ChessPiece.create("knight.obj"),
            await ChessPiece.create("rook.obj")
        ];

        // Define a textura inicial
        for (const object of this.objects) {
            object.texture = this.textures["b"];
        }

        // Inicializa as transformações
        this.update();

        requestAnimationFrame(
            () => this.execute()
        );
    }
}