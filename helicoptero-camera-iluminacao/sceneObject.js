// ==================================================
// CLASS - SCENE OBJECT
// ==================================================

class SceneObject {

    constructor(
        vertices,
        colors,
        normals,
        indices,
    ) {

        this.vertices = vertices;
        this.colors = colors;
        this.normals = normals;
        this.indices = indices;

        this.modelTransform = m4.identity();
    }

    draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition) {

        renderer.draw(this, viewTransform, projectionTransform, lightPosition, viewPosition);
    }
}

class HelicopterBody extends SceneObject{
    constructor(){
        super(
            helicopterBodyGeometry.vertices,
            helicopterBodyGeometry.colors,
            helicopterBodyGeometry.normals,
            helicopterBodyGeometry.indices
        );
    }

    update(tx,ty,tz,heading){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(heading)
        );
    }
}

class HelicopterTopShaft extends SceneObject{
    constructor(){
        super(
            helicopterTopShaftGeometry.vertices,
            helicopterTopShaftGeometry.colors,
            helicopterTopShaftGeometry.normals,
            helicopterTopShaftGeometry.indices
        );
    }

    update(tx,ty,tz,theta,heading){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.multiply(
                m4.yRotation(heading),
                m4.yRotation(theta)
            )
        );
    }
}

class HelicopterTail extends SceneObject{
    constructor(){
        super(
            helicopterTailGeometry.vertices,
            helicopterTailGeometry.colors,
            helicopterTailGeometry.normals,
            helicopterTailGeometry.indices
        );
    }

    update(tx,ty,tz,heading){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.yRotation(heading)
        );
    }
}

class HelicopterPropellers extends SceneObject{
    constructor(){
        super(
            helicopterPropellersGeometry.vertices,
            helicopterPropellersGeometry.colors,
            helicopterPropellersGeometry.normals,
            helicopterPropellersGeometry.indices
        );
    }

    update(tx,ty,tz,theta,heading){
        this.modelTransform = m4.multiply(
            m4.translation(tx,ty,tz),
            m4.multiply(
                m4.yRotation(heading),
                m4.yRotation(theta)
            )
        );
    }
}

class HelicopterTailPropeller extends SceneObject{
    constructor(){
        super(
            helicopterTailPropellerGeometry.vertices,
            helicopterTailPropellerGeometry.colors,
            helicopterTailPropellerGeometry.normals,
            helicopterTailPropellerGeometry.indices
        );
    }

    update(tx,ty,tz,theta,heading){
        this.modelTransform = m4.multiply(
                m4.translation(tx,ty,tz),
                m4.multiply(
                    m4.yRotation(heading),
                    m4.multiply(
                        m4.translation(0.7, 0.0, 0.0),
                        m4.multiply(
                            m4.zRotation(theta),
                            m4.translation(-0.7, 0.0, 0.0)
                        )
                    )
                )
            );
    }
}
