const CSPD = 1.5;

class Animation {
    constructor(val) {
        this.group = new THREE.Group();
        this.obj = [];
        this.objLong = [];
        for (let i = 0; i < 120; i++) {
            this.obj.push(this.createObj(3 + rands(8)));
            this.obj[i].position.set(-100 + i * 10, 0, 0);
            this.obj[i].vx = 0.1;
            this.obj[i].vy = 1.9;
            this.obj[i].vz = 0;
            this.obj[i].rot = 0;
            this.obj[i].visible = false;
        }
        var triangleShape = new THREE.Shape()
        triangleShape.moveTo(0, 0)
        triangleShape.lineTo(-.4, 20)
        triangleShape.lineTo(.4, 20)
        triangleShape.lineTo(0, 0);

        var geometry = new THREE.ShapeBufferGeometry(triangleShape);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) }));

        // var geometry = new THREE.PlaneGeometry(.5, 15);
        // var material = new THREE.MeshBasicMaterial({ map: loadTexture(BG_64) });

        for (let i = 0; i < 40; i++) {
            // this.objLong.push(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) })));
            this.objLong.push(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) })));
            this.objLong[i].position.set(-100 + i * 10, 0, 0);
            this.objLong[i].rotation.set(-.51, 0, -.50);
            // this.objLong[i].scale.set(.5, .5, .5);
            this.objLong[i].vx = 0.1;
            this.objLong[i].vy = 1.9;
            this.objLong[i].vz = 0;
            this.objLong[i].rot = 0;
            this.objLong[i].visible = false;
            this.group.add(this.objLong[i]);
        }
        this.setAnim(20);
        scene.add(this.group);
        this.group.visible = false;


        this.tobj = [];
        this.tobjLong = [];
        this.group2 = new THREE.Group();
        for (let i = 0; i < 20; i++) {
            this.tobj.push(this.createTObj(3 + rands(8)));
            this.tobj[i].position.set(-100 + i * 10, 0, 0);
            this.tobj[i].vx = 0.1;
            this.tobj[i].vy = 1.9;
            this.tobj[i].vz = 0;
            this.tobj[i].rot = 0;
            this.tobj[i].visible = true;
        }

        scene.add(this.group2);
        this.setFilAination(0, -10, 0);
        this.group2.visible = false;
        this.group2.tcount = 0;
        this.group2.tvy = 1.01;
    }
    createObj(node) {
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) });
        var object = new THREE.Mesh(new THREE.CircleBufferGeometry(2, node, 0, Math.PI * 2), material);
        this.group.add(object);
        return object;
    }
    createTObj(node) {
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: wColor(rands(8)) });
        var object = new THREE.Mesh(new THREE.CircleBufferGeometry(2, node, 0, Math.PI * 2), material);
        this.group2.add(object);
        return object;
    }
    update() {
        for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i].visible) {
                this.obj[i].position.x += this.obj[i].vx;
                this.obj[i].position.y += this.obj[i].vy;
                this.obj[i].position.z += this.obj[i].vz;
                this.obj[i].vy -= (.03 * CSPD);
                if (this.obj[i].vy < -.6) {
                    this.obj[i].position.y = -1000;
                    this.obj[i].visible = false;
                }
                if (this.obj[i].vy < 0) {
                    this.obj[i].scale.set(this.obj[i].scale.x - .03, this.obj[i].scale.x - .03, this.obj[i].scale.x - .03);
                }

                this.obj[i].rotation.x += this.obj[i].rot;
                this.obj[i].rotation.y += this.obj[i].rot * 2;
                this.obj[i].rotation.z += this.obj[i].rot * 3;
            }
        }
        for (let i = 0; i < this.objLong.length; i++) {
            if (this.objLong[i].visible) {
                this.objLong[i].position.x += this.objLong[i].vx;
                this.objLong[i].position.y += this.objLong[i].vy;
                this.objLong[i].position.z += this.objLong[i].vz;
                this.obj[i].rotation.x += this.obj[i].rot;
                this.objLong[i].vy -= (.03 * CSPD);
                if (this.objLong[i].vy < -.6) {
                    this.objLong[i].position.y = -1000;
                    this.objLong[i].visible = false;
                }
                if (this.objLong[i].vy < 0) {
                    this.objLong[i].scale.set(this.objLong[i].scale.x - .03, this.objLong[i].scale.x - .03, this.objLong[i].scale.x - .03);
                }
            }
        }
        if (counter % 15 == 0) {
            this.setAnim(20);
        }

    }
    setAnim(noObj) {
        var j = 0;
        for (let i = 0; i < this.obj.length && j < noObj; i++) {
            if (this.obj[i].visible == false) {
                this.obj[i].vy = (0.8 + Math.random() * 1.5) * 1.2;
                this.obj[i].vz = (-1 - Math.random() * 3) * .2;
                this.obj[i].rot = Math.random() * .1;
                if (j > noObj * .5) {
                    this.obj[i].position.set(60 - rands(10), -200, 100);
                    this.obj[i].vx = -(0.22 + Math.random() * .15);
                } else {
                    this.obj[i].position.set(-60 + rands(10), -200, 100);
                    this.obj[i].vx = (0.22 + Math.random() * .15);
                }
                this.obj[i].visible = true;
                j++;

                this.obj[i].scale.set(1, 1, 1);
                this.obj[i].vy *= CSPD;
                this.obj[i].vz *= CSPD;
                this.obj[i].vx *= CSPD;
                this.obj[i].rot *= CSPD;
            }
        }
        for (let i = 0, j = 0; i < this.objLong.length && j < 6; i++) {
            if (this.objLong[i].visible == false) {
                this.objLong[i].vy = (0.8 + Math.random() * 1.5) * 1.2;
                this.objLong[i].vz = (-1 - Math.random() * 3) * .2;
                this.objLong[i].rot = Math.random() * .1;
                if (j % 2 == 0) {
                    this.objLong[i].position.set(60 - rands(10), -200, 100);
                    this.objLong[i].vx = -(0.2 + Math.random() * .1);
                    this.objLong[i].rotation.set(-.51, 0, 0.20);
                } else {
                    this.objLong[i].position.set(-60 + rands(10), -200, 100);
                    this.objLong[i].vx = (0.2 + Math.random() * .1);
                    this.objLong[i].rotation.set(-.51, 0, -.20);
                }
                this.objLong[i].visible = true;
                this.objLong[i].vy *= CSPD;
                this.objLong[i].vz *= CSPD;
                this.objLong[i].vx *= CSPD;
                this.objLong[i].rot *= CSPD;
                this.objLong[i].scale.set(1, 1, 1);
                j++;
            }
        }

    }
    resetAll(visible) {
        this.obj.forEach(element => { element.visible = false; });
        this.objLong.forEach(element => { element.visible = false; });
        this.group.visible = visible;
    }

    setFilAination(x, y, z) {
        for (let i = 0; i < this.tobj.length; i++) {
            this.tobj[i].position.set(x, y, z);
            this.tobj[i].vx = -0.1 + Math.random() * .22;
            this.tobj[i].vy = .4 + Math.random() * .66;
            this.tobj[i].vz = -0.11 + Math.random() * .22;
            this.tobj[i].rot = 0;
            this.tobj[i].scale.set(1, 1, 1);
            this.tobj[i].visible = true;
        }
        this.group2.visible = true;
        this.group2.tcount = 0;
        this.group2.tvy = 1.01;
    }
    tUpdate() {
        for (let i = 0; i < this.tobj.length; i++) {
            if (this.tobj[i].vy > -.91) {
                this.tobj[i].position.x += this.tobj[i].vx;
                this.tobj[i].position.y += this.tobj[i].vy;
                this.tobj[i].position.z += this.tobj[i].vz;
                this.tobj[i].vy -= .02;
                if (this.tobj[i].scale.x > .06) {
                    this.tobj[i].scale.set(this.tobj[i].scale.x - .02, this.tobj[i].scale.x - .02, this.tobj[i].scale.x - .02);
                }
            } else {
                this.group2.visible = false;
                mTube[mPush.tubeNo].group.position.y = mTube[mPush.tubeNo].ay;
            }
        }
        console.log("this.group2.visible = " + this.group2.visible);
    }

}