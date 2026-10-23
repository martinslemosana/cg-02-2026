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

        this.normalLocation =
            gl.getAttribLocation(
                program,
                "aNormal"
            );

        this.modelTransformLocation =
            gl.getUniformLocation(
                program,
                "u_modelTransform"
            );

        this.viewTransformLocation =
            gl.getUniformLocation(
                program,
                "u_viewTransform"
            );

        this.projectionTransformLocation =
            gl.getUniformLocation(
                program,
                "u_projectionTransform"
            );

        this.lightPositionsLocation =
            gl.getUniformLocation(
                program,
                "u_lightPositions[0]"
        );

        this.numLightsLocation =
            gl.getUniformLocation(
                program,
                "u_numLights"
            );

        this.viewPositionLocation =
            gl.getUniformLocation(
                program,
                "u_viewPosition"
            );

        this.verticesBuffer =
            gl.createBuffer();
        
        this.colorBuffer =
            gl.createBuffer();

        this.normalBuffer =
            gl.createBuffer();

        this.indexBuffer =
            gl.createBuffer();
    }

    draw(object, viewTransform, projectionTransform, lightPositions, viewPosition) {
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

        //Normals
        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.normalBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            object.normals,
            gl.STATIC_DRAW
        );

        gl.enableVertexAttribArray(
            this.normalLocation
        );

        gl.vertexAttribPointer(
            this.normalLocation,
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

        //View Transform
        gl.uniformMatrix4fv(
            this.viewTransformLocation,
            false,
            viewTransform
        );

        //Projection Transform
        gl.uniformMatrix4fv(
            this.projectionTransformLocation,
            false,
            projectionTransform
        );

        // Quantidade de luzes ativas
        gl.uniform1i(
            this.numLightsLocation,
            lightPositions.length
        );

        // Posições das luzes
        gl.uniform3fv(
            this.lightPositionsLocation,
            new Float32Array(lightPositions.flat())
        );

        gl.uniform3fv(
            this.viewPositionLocation,
            viewPosition
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
