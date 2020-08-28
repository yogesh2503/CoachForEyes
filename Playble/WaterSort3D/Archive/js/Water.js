class Water {
    constructor(val) {
        this.group = new THREE.Group();
        var geometry = new THREE.CylinderGeometry(4.4, 4.4, 1, 8);
        var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        this.cyl = new THREE.Mesh(geometry, material);
        this.cyl.position.set(0, val * .5, 0);
        this.cyl.scale.set(1, val, 1);
        this.group.add(this.cyl);
        this.group.scale.set(1, 1, 1);
        this.color = 0;
    }
    setColor(clr) {
        this.cyl.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.color = clr;
    }
}

class PushPop {
    constructor() {
        this.tubeNo = 1;
        this.wNo = 1;
        this.color = 0;
        this.noSameClr = 0;
    }
    reset() {
        this.wNo = -1;
        this.color = -1;
        this.noSameClr = 0;
    }
}
class Player {
    constructor() {
        this.animation = 1;
        this.tubes = [];
        this.lvl = 1;
        this.vx = -.10;
        this.gOver = false;
    }
}
class Flow {
    constructor() {
        this.group = new THREE.Group();
        this.material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        var geometry = new THREE.CylinderGeometry(1, 1, 6, 8);
        this.cyl1 = new THREE.Mesh(geometry, this.material);
        this.cyl3 = new THREE.Mesh(geometry, this.material);
        var geometry = new THREE.SphereGeometry(1.4, 32, 32);
        var geometry = new THREE.TorusBufferGeometry(2, 1.4, 4, 8, Math.PI * .6);
        this.cyl2 = new THREE.Mesh(geometry, this.material);
        this.cyl4 = new THREE.Mesh(geometry, this.material);
        this.cyl1.position.set(0, -3, 0);
        this.gcyl1 = new THREE.Group();
        this.gcyl1.add(this.cyl1);
        this.gcyl1.position.set(2.6, 4, 0);
        this.gcyl1.rotation.set(0, 0, -1.2);
        this.gcyl3 = new THREE.Group();
        this.cyl3.position.set(0, -3, 0);
        this.gcyl3.add(this.cyl3);
        this.gcyl3.position.set(3.8, 3.3, 0);
        this.group.add(this.gcyl1);
        this.group.add(this.cyl2);
        this.group.add(this.gcyl3);
        this.group.add(this.cyl4);
        this.cyl2.position.set(2.1, 2.3, 0);
        this.cyl4.position.set(3.9, 3.3, 0);
        this.group.scale.set(1, 1, 1);
        this.group.position.set(9, 15.5, 0);
        scene.add(this.group);
        this.reset();
    }
    reset() {
        this.gcyl1.visible = false;
        this.cyl2.visible = false;
        this.gcyl3.visible = false;
        this.cyl4.visible = false;
        this.gcyl1.position.set(-20.6, -4.6, 0);
        this.gcyl1.scale.set(1.4, -0.2, 1.4);//-4.2
        this.gcyl3.scale.set(1.4, .01, 1.4);
    }
    setColor(clr) {
        this.material = wColor(clr);
        this.gcyl1.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.cyl2.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.gcyl3.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
        this.cyl4.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
    }

}