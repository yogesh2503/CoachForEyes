class Tube {
    constructor() {
        // extruded shape
        var blendings = [
            { name: 'No', constant: THREE.NoBlending },
            { name: 'Normal', constant: THREE.NormalBlending },
            { name: 'Additive', constant: THREE.AdditiveBlending },
            { name: 'Subtractive', constant: THREE.SubtractiveBlending },
            { name: 'Multiply', constant: THREE.MultiplyBlending }
        ];
        this.material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, map: loadTexture(TRAC_64) });
        // this.material.transparent = true;
        // this.material.blending = blendings[4].constant;

        this.group = new THREE.Group();
        var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 10, steps: 2, bevelSize: 1, bevelThickness: 12 };

        var smileyShape = new THREE.Shape();
        smileyShape.moveTo(0, 0)
        smileyShape.absarc(0, 0, 4, 0, Math.PI * 2, false);
        var smileyEye1Path = new THREE.Path();
        smileyEye1Path.moveTo(0, 0)
        smileyEye1Path.absellipse(0, 0, 3.8, 3.8, 0, Math.PI * 2, true);
        smileyShape.holes.push(smileyEye1Path);
        this.circle = Createtube(this.material);//this.addShape(smileyShape, extrudeSettings, 0, 0, 0, Math.PI * .5, 0, 0, 1);
        // this.tube = Createtube(this.material);//
        this.circle.position.set(0, 12, 0);

        var smileyShape2 = new THREE.Shape();
        smileyShape2.moveTo(0, 0)
        smileyShape2.absarc(0, 0, 4, 0, Math.PI * 2, false);
        this.circle2 = this.addShape(smileyShape2, extrudeSettings, 0, 0, 0, Math.PI * .5, 0, 0, 1);
        this.circle2.scale.set(.2, .2, .6);
        this.circle2.position.set(0, -22, 0);

        var geometry = new THREE.SphereGeometry(4, 32, 32, 0, Math.PI, 0, Math.PI);
        this.object = new THREE.Mesh(geometry, this.material);
        this.object.position.set(0, -12, 0);
        this.object.rotation.set(Math.PI * .5, 0, 0);



        var materialcup = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        var geometry = new THREE.SphereGeometry(4, 32, 32, 0, Math.PI, 0, Math.PI);
        this.base = new THREE.Mesh(geometry, materialcup);
        this.base.position.set(0, -12, 0);
        this.base.rotation.set(Math.PI * .5, 0, 0);
        this.group.add(this.base);

        this.object2 = this.object.clone();
        this.object2.position.set(0, -31, 0);
        this.object2.rotation.set(Math.PI * 1.5, 0, 0);
        this.object2.scale.set(1, 1, .6);

        this.group.add(this.circle);
        this.group.add(this.object);
        this.group.add(this.circle2);
        this.group.add(this.object2);
        // this.group.add(this.tube);

        this.water = [];
        // var noColor = 2;
        // for (let i = 0; i < noColor; i++) {
        //     this.water.push(new Water(18 / noColor));
        //     this.group.add(this.water[i].group);
        //     this.water[i].group.position.set(0, -12 + i * (18 / noColor), 0);
        // }
        scene.add(this.group);
        this.ax = 0;
        this.ay = 0;
        this.group.visible = false;
        this.isSelected = false;
    }
    addShape(shape, extrudeSettings, x, y, z, rx, ry, rz, s) {
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        // scene.add(mesh);
        return mesh;
    }
    set(_x, _y, _z) {
        this.ax = _x;
        this.ay = _y;
        this.az = _z;
        this.group.position.set(_x, _y, _z);
        this.group.rotation.set(0, 0, 0);
        this.group.visible = true;
        this.isSelected = false;
    }
    setWater(no, noColor) {
        if (this.water.length > 0) {
            let obj = this.water.pop();
            this.group.remove(obj.group);
        }
        this.water.length = 0;
        var val = 22 / noColor;
        for (let i = 0; i < noColor; i++) {
            this.water.push(mGameWaters[i + no]);
            this.water[i].cyl.position.set(0, val * .5, 0);
            this.water[i].cyl.scale.set(1, val, 1);
            this.group.add(this.water[i].group);
            this.water[i].group.position.set(0, -12 + i * val, 0);
        }

    }
    setColor(clr) {
        this.base.traverse(function (child) { if (child.isMesh) { child.material.color = wColor(clr); } });
    }



}