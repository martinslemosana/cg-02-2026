// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(
        vertices,
        colors,
        indices,
    ) {

        this.vertices = vertices;
        this.colors = colors;
        this.indices = indices;

        this.modelTransform = m4.identity();
    }

    update(modelTransform) {
        this.modelTransform = modelTransform;
    }

    updateModelTransform(modelTransform) {

        this.modelTransform =
            modelTransform;
    }

    draw(renderer) {

        renderer.draw(this);
    }
}

class HelicopterBody extends SceneObject{
    constructor(){
        super(
            helicopterBodyGeometry.vertices,
            helicopterBodyGeometry.colors,
            helicopterBodyGeometry.indices
        );
    }
}

class HelicopterTopShaft extends SceneObject{
    constructor(){
        super(
            helicopterTopShaftGeometry.vertices,
            helicopterTopShaftGeometry.colors,
            helicopterTopShaftGeometry.indices
        );
    }
}

class HelicopterTail extends SceneObject{
    constructor(){
        super(
            helicopterTailGeometry.vertices,
            helicopterTailGeometry.colors,
            helicopterTailGeometry.indices
        );
    }
}

class HelicopterPropellers extends SceneObject{
    constructor(){
        super(
            helicopterPropellersGeometry.vertices,
            helicopterPropellersGeometry.colors,
            helicopterPropellersGeometry.indices
        );
    }
}

class HelicopterTailPropeller extends SceneObject{
    constructor(){
        super(
            helicopterTailPropellerGeometry.vertices,
            helicopterTailPropellerGeometry.colors,
            helicopterTailPropellerGeometry.indices
        );
    }
}
