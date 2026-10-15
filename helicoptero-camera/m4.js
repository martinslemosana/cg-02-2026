var m4 = {
  identity: function() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  },

  transpose: function(m) {
    return [
      m[0], m[4], m[8],  m[12],
      m[1], m[5], m[9],  m[13],
      m[2], m[6], m[10], m[14],
      m[3], m[7], m[11], m[15],
    ];
  },

  multiply: function(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[1 * 4 + 0];
    var a02 = a[2 * 4 + 0];
    var a03 = a[3 * 4 + 0];
    var a10 = a[0 * 4 + 1];
    var a11 = a[1 * 4 + 1];
    var a12 = a[2 * 4 + 1];
    var a13 = a[3 * 4 + 1];
    var a20 = a[0 * 4 + 2];
    var a21 = a[1 * 4 + 2];
    var a22 = a[2 * 4 + 2];
    var a23 = a[3 * 4 + 2];
    var a30 = a[0 * 4 + 3];
    var a31 = a[1 * 4 + 3];
    var a32 = a[2 * 4 + 3];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[1 * 4 + 0];
    var b02 = b[2 * 4 + 0];
    var b03 = b[3 * 4 + 0];
    var b10 = b[0 * 4 + 1];
    var b11 = b[1 * 4 + 1];
    var b12 = b[2 * 4 + 1];
    var b13 = b[3 * 4 + 1];
    var b20 = b[0 * 4 + 2];
    var b21 = b[1 * 4 + 2];
    var b22 = b[2 * 4 + 2];
    var b23 = b[3 * 4 + 2];
    var b30 = b[0 * 4 + 3];
    var b31 = b[1 * 4 + 3];
    var b32 = b[2 * 4 + 3];
    var b33 = b[3 * 4 + 3];
    return [
      a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
      a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
      a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
      a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
      a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
      a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
      a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
      a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
      a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
      a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
      a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
      a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
      a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
      a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
      a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
      a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
    ];
  },

  translation: function(tx, ty, tz) {
    return [
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz, 1,
    ];
  },

  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      1,  0, 0, 0,
      0,  c, s, 0,
      0, -s, c, 0,
      0,  0, 0, 1,
    ];
  },

  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      c, 0, -s, 0,
      0, 1,  0, 0,
      s, 0,  c, 0,
      0, 0,  0, 1,
    ];
  },

  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
        c, s, 0, 0,
       -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
  },

  scaling: function(sx, sy, sz) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ];
  },

  translate: function(m, tx, ty, tz) {
    return m4.multiply(m4.translation(tx, ty, tz),m);
  },

  xRotate: function(m, angleInRadians) {
    return m4.multiply(m4.xRotation(angleInRadians),m);
  },

  yRotate: function(m, angleInRadians) {
    return m4.multiply(m4.yRotation(angleInRadians),m);
  },

  zRotate: function(m, angleInRadians) {
    return m4.multiply(m4.zRotation(angleInRadians),m);
  },

  scale: function(m, sx, sy, sz) {
    return m4.multiply(m4.scaling(sx, sy, sz),m);
  },

  unitVector: function(v){ 
    let vModulus = m4.vectorModulus(v);
    return v.map(function(x) { return x/vModulus; });
  },

  vectorModulus: function(v){
    return Math.sqrt(Math.pow(v[0],2)+Math.pow(v[1],2)+Math.pow(v[2],2));
  },

  crossProduct: function(v1,v2){
    let result = [
        v1[1]*v2[2] - v1[2]*v2[1],
        v1[2]*v2[0] - v1[0]*v2[2],
        v1[0]*v2[1] - v1[1]*v2[0]
    ];
    return result;
  },

  setViewingMatrix: function(P0,Pref,V){
    let N = [P0[0]-Pref[0],P0[1]-Pref[1],P0[2]-Pref[2]];
    let n = m4.unitVector(N);
    let u = m4.unitVector(m4.crossProduct(V,n));
    let v = m4.crossProduct(n,u);

    let translationMatrix = m4.translation(-P0[0],-P0[1],-P0[2]);
    let rotationMatrix = [
      u[0], v[0], n[0], 0,
      u[1], v[1], n[1], 0,
      u[2], v[2], n[2], 0,
      0, 0, 0, 1
    ];

    return m4.multiply(rotationMatrix,translationMatrix);
  },

  setOrthographicProjectionMatrix: function(xw_min,xw_max,yw_min,yw_max,z_near,z_far){
    return [
      2/(xw_max-xw_min), 0, 0, 0,
      0, 2/(yw_max-yw_min), 0, 0,
      0, 0, -2/(z_near-z_far), 0,
      -(xw_max+xw_min)/(xw_max-xw_min), -(yw_max+yw_min)/(yw_max-yw_min), (z_near+z_far)/(z_near-z_far), 1
    ];
  },

  setPerspectiveProjectionMatrix: function(xw_min,xw_max,yw_min,yw_max,z_near,z_far){
    return [
      (-2*z_near)/(xw_max-xw_min), 0, 0, 0,
      0, (-2*z_near)/(yw_max-yw_min), 0, 0,
      (xw_max+xw_min)/(xw_max-xw_min), (yw_max+yw_min)/(yw_max-yw_min), (z_near+z_far)/(z_near-z_far), -1,
      0, 0, -(2*z_near*z_far)/(z_near-z_far), 0
    ];
  }

};