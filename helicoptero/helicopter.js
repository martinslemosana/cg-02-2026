// ==================================================
// CLASSE HELICOPTER
// ==================================================

class Helicopter {

  constructor() {

      this.helicopterBody = new HelicopterBody();

      this.helicopterTopShaft = new HelicopterTopShaft();

      this.helicopterTail = new HelicopterTail();

      this.helicopterPropellers = new HelicopterPropellers();

      this.helicopterTailPropeller = new HelicopterTailPropeller();
  }

  move(tx,ty) {

      const helicopterTransform = m4.multiply(m4.scaling(0.5,0.5,0.5),m4.translation(tx,ty,0.0));

      this.helicopterBody.updateModelTransform(helicopterTransform);

      this.helicopterTopShaft.updateModelTransform(helicopterTransform);

      this.helicopterTail.updateModelTransform(helicopterTransform);

      this.helicopterPropellers.updateRotation();

      this.helicopterTailPropeller.updateRotation();

      this.helicopterPropellers.updateModelTransform(helicopterTransform);

      this.helicopterTailPropeller.updateModelTransform(helicopterTransform);
  }

  draw(renderer) {

      renderer.draw(this.helicopterBody);

      renderer.draw(this.helicopterTopShaft);

      renderer.draw(this.helicopterTail);

      renderer.draw(this.helicopterPropellers);

      renderer.draw(this.helicopterTailPropeller);
  }
}