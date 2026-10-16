class Helicopter {
    constructor() {

        this.helicopterBody = new HelicopterBody();

        this.helicopterTopShaft = new HelicopterTopShaft();

        this.helicopterTail = new HelicopterTail();

        this.helicopterPropellers = new HelicopterPropellers();

        this.helicopterTailPropeller = new HelicopterTailPropeller();

        this.theta = 0.0;

        this.tx = 0.0;
        this.ty = 0.0;
        this.tz = 0.0;

        this.txOffset = 0.01;
        this.tzOffset = 0.01;

        this.rx = 0.0;
        this.ry = 0.0;
        this.rz = 0.0;

        this.sx = 1.0;
        this.sy = 1.0;
        this.sz = 1.0;
    }

    update() {
        this.theta += 0.01;
        
        this.tz += this.tzOffset;
        if(this.tz>=5.0 || this.tz<=-10.0){
            this.tzOffset = -this.tzOffset;
        }

        this.helicopterBody.update(m4.translation(this.tx, this.ty, this.tz));
        this.helicopterTopShaft.update(m4.multiply(m4.translation(this.tx, this.ty,this.tz),m4.yRotation(this.theta)));
        this.helicopterTail.update(m4.translation(this.tx, this.ty, this.tz));
        this.helicopterPropellers.update(m4.multiply(m4.translation(this.tx, this.ty, this.tz),m4.yRotation(this.theta)));
        this.helicopterTailPropeller.update(
            m4.multiply(
                m4.translation(this.tx,this.ty,this.tz),
                m4.multiply(
                    m4.translation(0.7, 0.0, 0.0),
                    m4.multiply(
                        m4.zRotation(this.theta),
                        m4.translation(-0.7, 0.0, 0.0)
                    )
                )
            )
        );
    }

    draw(renderer, viewTransform, projectionTransform) {
        this.helicopterBody.draw(renderer, viewTransform, projectionTransform);
        this.helicopterTopShaft.draw(renderer, viewTransform, projectionTransform);
        this.helicopterTail.draw(renderer, viewTransform, projectionTransform);
        this.helicopterPropellers.draw(renderer, viewTransform, projectionTransform);
        this.helicopterTailPropeller.draw(renderer, viewTransform, projectionTransform);
    }
}