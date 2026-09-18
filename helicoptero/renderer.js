// ==================================================
// CLASSE RENDERER
// ==================================================

class Renderer {

    constructor(gl, program) {
        this.gl = gl;
        this.program = program;

        this.positionLocation =
            gl.getAttribLocation(
                program,
                "aPosition"
            );

        this.colorLocation =
            gl.getAttribLocation(
                program,
                "aColor"
            );

        this.modelTransformLocation =
            gl.getUniformLocation(
                program,
                "u_modelTransform"
            );

        this.verticesBuffer =
            gl.createBuffer();
        
        this.colorBuffer =
            gl.createBuffer();

        this.indexBuffer =
            gl.createBuffer();
    }

    draw(object) {
        const gl = this.gl;

        //Positions
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.verticesBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            object.vertices,
            gl.STATIC_DRAW
        );

        gl.enableVertexAttribArray(
            this.positionLocation
        );

        gl.vertexAttribPointer(
            this.positionLocation,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        //Colors
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.colorBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            object.colors,
            gl.STATIC_DRAW
        );

        gl.enableVertexAttribArray(
            this.colorLocation
        );

        gl.vertexAttribPointer(
            this.colorLocation,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        //Indices
        gl.bindBuffer(
            gl.ELEMENT_ARRAY_BUFFER,
            this.indexBuffer
        );
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            object.indices,
            gl.STATIC_DRAW
        );

        //Model Transform
        gl.uniformMatrix4fv(
            this.modelTransformLocation,
            false,
            object.modelTransform
        );

        //DRAW OBJECT USING INDICES
        gl.drawElements(
            gl.TRIANGLES,
            object.indices.length,
            gl.UNSIGNED_SHORT,
            0
        );
    }
}
