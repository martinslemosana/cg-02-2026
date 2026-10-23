class Helicopter {
    constructor(tx, ty, tz) {

        this.helicopterBody = new HelicopterBody();

        this.helicopterTopShaft = new HelicopterTopShaft();

        this.helicopterTail = new HelicopterTail();

        this.helicopterPropellers = new HelicopterPropellers();

        this.helicopterTailPropeller = new HelicopterTailPropeller();

        this.theta = 0.0;

        this.tx = tx;
        this.ty = ty;
        this.tz = tz;

        this.tzOffset = 0.01;

        this.heading = Math.PI / 2; // Heading in radians (initially facing along the positive Z-axis)

    }

    update() {
        this.theta += 0.01;
        
        this.tz += this.tzOffset;
        if(this.tz>=5.0 || this.tz<=-10.0){
            this.tzOffset = -this.tzOffset;
        }

        if(this.tzOffset > 0) {
            this.heading = Math.PI / 2; // Facing along the positive Z-axis
        } else {
            this.heading = -Math.PI / 2; // Facing along the negative Z-axis
        }
        

        this.helicopterBody.update(this.tx,this.ty,this.tz,this.heading);
        this.helicopterTopShaft.update(this.tx,this.ty,this.tz,this.theta,this.heading);
        this.helicopterTail.update(this.tx, this.ty, this.tz,this.heading);
        this.helicopterPropellers.update(this.tx,this.ty,this.tz,this.theta,this.heading);
        this.helicopterTailPropeller.update(this.tx,this.ty,this.tz,this.theta,this.heading);
    }

    draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition) {
        this.helicopterBody.draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition);
        this.helicopterTopShaft.draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition);
        this.helicopterTail.draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition);
        this.helicopterPropellers.draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition);
        this.helicopterTailPropeller.draw(renderer, viewTransform, projectionTransform, lightPosition, viewPosition);
    }
}