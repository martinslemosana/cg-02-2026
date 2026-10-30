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

        this.object = new Cube();
        this.object.texture = this.textures["1"];

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

        this.setupSuperquadricControls();


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
                this.object = new WavyCylinder();
                break;
            case "8":
                this.color = [Math.random(), Math.random(), Math.random()];
                this.object = new Spring();
                break;
        }

        this.object.texture = this.textures[key];

        // Aplica a posição e a rotação atuais ao novo objeto
        this.object.update(
            this.tx,
            this.ty,
            this.tz,
            this.theta
        );
    }


    setupSuperquadricControls() {

        const n1Slider = document.getElementById("n1Slider");
        const n2Slider = document.getElementById("n2Slider");

        const n1Value = document.getElementById("n1Value");
        const n2Value = document.getElementById("n2Value");

        const updateGeometry = () => {

            const n1 = Number(n1Slider.value);
            const n2 = Number(n2Slider.value);

            // Atualiza os valores exibidos
            n1Value.textContent = n1.toFixed(1);
            n2Value.textContent = n2.toFixed(1);

            // Gera novos vértices e calcula as normais
            updateSuperquadricGeometry(n1, n2);

            // Se a superquádrica estiver em cena,
            // atualiza os dados usados pelo Renderer
            if (this.object instanceof Superquadric) {

                this.object.vertices = superquadricGeometry.vertices;
                this.object.normals = superquadricGeometry.normals;
                this.object.indices = superquadricGeometry.indices;
            }
        };

        n1Slider.addEventListener("input", updateGeometry);
        n2Slider.addEventListener("input", updateGeometry);
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