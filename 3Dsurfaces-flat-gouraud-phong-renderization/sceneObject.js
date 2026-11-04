// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(geometry) {

        this.flatGeometry = geometry.flat;
        this.smoothGeometry = geometry.smooth;

        this.modelTransform = m4.identity();
    }

    update(tx, ty, tz, theta) {

        this.modelTransform = m4.multiply(
            m4.translation(tx, ty, tz),
            m4.yRotation(theta)
        );
    }

    draw(
        renderer, 
        viewTransform, 
        projectionTransform,
        lightPositions, 
        viewPosition, 
        shadingMode
    ) {

        renderer.draw(
            this,
            viewTransform,
            projectionTransform,
            lightPositions,
            viewPosition,
            shadingMode
        );
    }
}

class Cube extends SceneObject{
    constructor(){
        super(
            cubeGeometry
        );

    }
}

class Sphere extends SceneObject{
    constructor(){
        super(
            sphereGeometry
        );

    }
}

class Torus extends SceneObject{
    constructor(){
        super(
            torusGeometry
        );

    }
}

class Ellipsoid extends SceneObject{
    constructor(){
        super(
            ellipsoidGeometry
        );

    }
}

class Superquadric extends SceneObject{
    constructor(){
        super(
            superquadricGeometry
        );

    }
}

class WineGlass extends SceneObject{
    constructor(){
        super(
            wineGlassGeometry
        );

    }
}

class WavyCylinder extends SceneObject{
    constructor(){
        super(
            wavyCylinderGeometry
        );
    }
}

class Spring extends SceneObject{
    constructor(){
        super(
            springGeometry
        );
    }
}
