// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(vertices, normals, indices, texCoords) {

        this.vertices = vertices;
        this.normals = normals;
        this.indices = indices;
        this.texCoords = texCoords;

        this.modelTransform = m4.identity();
    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }

    draw(renderer, color, viewTransform, projectionTransform, lightPosition, viewPosition) {

        renderer.draw(this, color, viewTransform, projectionTransform, lightPosition, viewPosition);
    }
}

class Cube extends SceneObject{
    constructor(){
        super(
            cubeGeometry.vertices,
            cubeGeometry.normals,
            cubeGeometry.indices,
            cubeGeometry.texCoords
        );

    }
}

class Sphere extends SceneObject{
    constructor(){
        super(
            sphereGeometry.vertices,
            sphereGeometry.normals,
            sphereGeometry.indices,
            sphereGeometry.texCoords
        );

    }
}

class Torus extends SceneObject{
    constructor(){
        super(
            torusGeometry.vertices,
            torusGeometry.normals,
            torusGeometry.indices,
            torusGeometry.texCoords
        );

    }
}

class Ellipsoid extends SceneObject{
    constructor(){
        super(
            ellipsoidGeometry.vertices,
            ellipsoidGeometry.normals,
            ellipsoidGeometry.indices,
            ellipsoidGeometry.texCoords
        );

    }
}

class Superquadric extends SceneObject{
    constructor(){
        super(
            superquadricGeometry.vertices,
            superquadricGeometry.normals,
            superquadricGeometry.indices,
            superquadricGeometry.texCoords
        );

    }
}

class WineGlass extends SceneObject{
    constructor(){
        super(
            wineGlassGeometry.vertices,
            wineGlassGeometry.normals,
            wineGlassGeometry.indices,
            wineGlassGeometry.texCoords
        );

    }
}

class WavyCylinder extends SceneObject{
    constructor(){
        super(
            wavyCylinderGeometry.vertices,
            wavyCylinderGeometry.normals,
            wavyCylinderGeometry.indices,
            wavyCylinderGeometry.texCoords
        );
    }
}

class Spring extends SceneObject{
    constructor(){
        super(
            springGeometry.vertices,
            springGeometry.normals,
            springGeometry.indices,
            springGeometry.texCoords
        );
    }
}
