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

        this.normalLocation =
            gl.getAttribLocation(
                program,
                "aNormal"
            );

        this.texCoordLocation =
            gl.getAttribLocation(
                program, 
                "aTexCoord"
            );

        this.textureLocation =
            gl.getUniformLocation(
                program, 
                "u_texture"
            );

        this.shadingModeLocation =
            gl.getUniformLocation(
                program,
                "u_shadingMode"
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
        
        this.normalBuffer =
            gl.createBuffer();

        this.indexBuffer =
            gl.createBuffer();

        this.texCoordBuffer = 
            gl.createBuffer();

    }

    draw(
        object,
        viewTransform,
        projectionTransform,
        lightPositions,
        viewPosition,
        shadingMode
    ) {
        const gl = this.gl;

        // Seleciona a geometria de acordo com o modelo
        const geometry = shadingMode === 0
            ? object.geometry.flat
            : object.geometry.smooth;


        // ==========================================
        // POSITIONS
        // ==========================================

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.verticesBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            geometry.vertices,
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


        // ==========================================
        // NORMALS
        // ==========================================

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.normalBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            geometry.normals,
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


        // ==========================================
        // INDICES
        // ==========================================

        gl.bindBuffer(
            gl.ELEMENT_ARRAY_BUFFER,
            this.indexBuffer
        );

        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            geometry.indices,
            gl.STATIC_DRAW
        );


        // ==========================================
        // TEXTURE COORDINATES
        // ==========================================

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.texCoordBuffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            geometry.texCoords,
            gl.STATIC_DRAW
        );

        gl.enableVertexAttribArray(
            this.texCoordLocation
        );

        gl.vertexAttribPointer(
            this.texCoordLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );


        // ==========================================
        // TRANSFORMATIONS
        // ==========================================

        gl.uniformMatrix4fv(
            this.modelTransformLocation,
            false,
            object.modelTransform
        );

        gl.uniformMatrix4fv(
            this.viewTransformLocation,
            false,
            viewTransform
        );

        gl.uniformMatrix4fv(
            this.projectionTransformLocation,
            false,
            projectionTransform
        );


        // ==========================================
        // ILUMINAÇÃO
        // ==========================================

        gl.uniform1i(
            this.numLightsLocation,
            lightPositions.length
        );

        gl.uniform3fv(
            this.lightPositionsLocation,
            new Float32Array(lightPositions.flat())
        );

        gl.uniform3fv(
            this.viewPositionLocation,
            viewPosition
        );


        // ==========================================
        // TEXTURA
        // ==========================================

        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(
            gl.TEXTURE_2D,
            object.texture
        );

        gl.uniform1i(
            this.textureLocation,
            0
        );


        // ==========================================
        // MODELO DE ILUMINAÇÃO
        // ==========================================

        gl.uniform1i(
            this.shadingModeLocation,
            shadingMode
        );


        // ==========================================
        // DESENHAR OBJETO
        // ==========================================

        gl.drawElements(
            gl.TRIANGLES,
            geometry.indices.length,
            gl.UNSIGNED_INT,
            0
        );
    }


    loadTexture(url) {

        const gl = this.gl;

        const texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Textura provisória enquanto a imagem carrega
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([255, 255, 255, 255])
        );

        const image = new Image();

        image.onload = () => {

            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            );

            gl.generateMipmap(gl.TEXTURE_2D);

            gl.bindTexture(gl.TEXTURE_2D, null);
        };

        image.onerror = () => {
            console.error("Erro ao carregar textura:", url);
        };

        image.src = url;

        return texture;
    }

}