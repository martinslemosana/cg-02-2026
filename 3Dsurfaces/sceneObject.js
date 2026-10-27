// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(
        vertices,
        normals,
        indices,
    ) {

        this.vertices = vertices;
        this.normals = normals;
        this.indices = indices;

        this.modelTransform = m4.identity();
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
            cubeGeometry.indices
        );

    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class Sphere extends SceneObject{
    constructor(){
        super(
            sphereGeometry.vertices,
            sphereGeometry.normals,
            sphereGeometry.indices
        );

    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class Torus extends SceneObject{
    constructor(){
        super(
            torusGeometry.vertices,
            torusGeometry.normals,
            torusGeometry.indices
        );

    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class Ellipsoid extends SceneObject{
    constructor(){
        super(
            ellipsoidGeometry.vertices,
            ellipsoidGeometry.normals,
            ellipsoidGeometry.indices
        );

    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class Superquadric extends SceneObject{
    constructor(){
        super(
            superquadricGeometry.vertices,
            superquadricGeometry.normals,
            superquadricGeometry.indices
        );

    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class WineGlass extends SceneObject{
    constructor(){
        super(
            wineGlassGeometry.vertices,
            wineGlassGeometry.normals,
            wineGlassGeometry.indices
        );

    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class WavyCylinder extends SceneObject{
    constructor(){
        super(
            wavyCylinderGeometry.vertices,
            wavyCylinderGeometry.normals,
            wavyCylinderGeometry.indices
        );
    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}

class Spring extends SceneObject{
    constructor(){
        super(
            springGeometry.vertices,
            springGeometry.normals,
            springGeometry.indices
        );
    }

    update(tx,ty,tz,theta){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(theta)
        );
    }
}
