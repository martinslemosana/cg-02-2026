// ==================================================
// CLASS - SCENE
// ==================================================

class Scene {

    constructor(gl, program) {

        this.renderer =
            new Renderer(gl, program);

        // Figura que será exibida
        this.object =
        new SceneObject(
            cubeGeometry.vertices,
            cubeGeometry.colors,
            cubeGeometry.indices,
        );

        this.setupKeyboard();
    }

    setupKeyboard() {

        document.addEventListener(
            "keydown",
            (event) => {

                switch (event.key) {

                    case "1":
                        this.changeObject(cubeGeometry);
                        break;

                    case "2":
                        this.changeObject(pyramidGeometry);
                        break;

                    case "3":
                        this.changeObject(octahedronGeometry);
                        break;

                    case "4":
                        this.changeObject(hexagonalPrismGeometry);
                        break;

                    case "x": 
                        this.object.rotationAxis = "x"; 
                        break; 
                    
                    case "y": 
                        this.object.rotationAxis = "y"; 
                        break; 
                    
                    case "z": 
                        this.object.rotationAxis = "z";
                        break;

                    case "ArrowRight":
                        this.object.move(0.05, 0.0);
                        break;

                    case "ArrowLeft":
                        this.object.move(-0.05, 0.0);
                        break;

                    case "ArrowUp":
                        this.object.move(0.0, 0.05);
                        break;

                    case "ArrowDown":
                        this.object.move(0.0, -0.05);
                        break;

                }
            }
        );
    }

    changeObject(geometry) {

        this.object.vertices =
            geometry.vertices;

        this.object.colors =
            geometry.colors;

        this.object.indices =
            geometry.indices;
    }

    update() {

        this.object.update();
    }

    draw() {

        gl.clear(
            gl.COLOR_BUFFER_BIT |
            gl.DEPTH_BUFFER_BIT
        );

        gl.useProgram(program);

        this.object.draw(
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

