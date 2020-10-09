class Cube {
  constructor(col, texture) {
    this.group = new THREE.Group();
    this.mfrant = col.clone();
    this.mback = col.clone();
    this.mback.rotation.set(0, Math.PI, 0);
    this.group.add(this.mfrant);
    this.group.add(this.mback);
    scene.add(this.group);
    this.group.scale.set(20, 20, 20);
    this.mfrant.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.map = texture;
        child.material.color = new THREE.Color("rgb(255,255,255)");
      }
    });
  }
  update() {
    var rotx = (Math.PI / 180) * sx;
    var roty = (Math.PI / 180) * sy;
    var rotz = (Math.PI / 180) * sz;
  }
  set(_x, _y, _z, _rot) {
    this.group.scale.set(0.54, 0.54, 0.54);
    this.group.position.set(_x, _y, 2.4 + _z);
    this.group.rotation.set(0, Math.PI, _rot);
  }
  setPlayer(_x, _y, _z, dir) {
    this.group.scale.set(0.98, 0.98, 0.98);
    this.group.position.set(_x, _y, _z);
    if (dir == BOTTOM)
      this.group.rotation.set(-Math.PI * 0.7, Math.PI, Math.PI);
    if (dir == RIGHT)
      this.group.rotation.set(Math.PI, Math.PI * 0.5, -Math.PI * 0.5);
    if (dir == LEFT)
      this.group.rotation.set(Math.PI, -Math.PI * 0.5, Math.PI * 0.5);
    if (dir == UP) this.group.rotation.set(Math.PI * 0.5, Math.PI, Math.PI * 0);
  }
  setNew(_x, _y, _z, dir, scl) {
    this.group.scale.set(scl, scl, scl);
    this.group.position.set(_x, _y, _z);
    if (dir == BOTTOM)
      this.group.rotation.set(-Math.PI * 0, Math.PI * 0, Math.PI * 0);
    if (dir == RIGHT)
      this.group.rotation.set(Math.PI * 0, Math.PI * 0, Math.PI * 0.5);
    if (dir == LEFT)
      this.group.rotation.set(Math.PI * 0, Math.PI * 0, -Math.PI * 0.5);
    if (dir == UP) {
      this.group.rotation.set(Math.PI * 1, Math.PI * 1, Math.PI * 0);
    }
  }
  setForLanding() {
    this.group.position.set(-10, -4, 40);
    this.group.visible = true;
    this.group.rotation.set(0, 0, 0);
    this.group.scale.set(3, 3, 3);
  }

}
