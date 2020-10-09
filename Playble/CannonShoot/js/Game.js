const COLORS = [0x6972d1, 0xd83a8a, 0x464a4e, 0x6dfeff, 0xf7bb28];
const HEIGHT = 10;
const mBurger = new Burger();
const TYPE = {
	SPHERE: 'sphere',
	BOX: 'box',
	CYLINDER: 'cylinder',
	PYRAMID: 'Pyramid',
	GROUND: 'ground',
};
const LVL = 1;
class Game {
	constructor() {
		this.useVisuals = true;
		this.init();
	}
	init() {
		const game = this;
		this.counter = 0;
		this.isTuch = false;
		this.fire = false;
		this.fireBall = [];
		this.isResize = 0;
		this.mTex_fonts = Array(2);
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf5c761);
		this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);//30
		this.camera.lookAt(new THREE.Vector3(0, 5, 0));
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		this.gameUI = new ThreeUI(this.renderer.domElement, 720);
		AssetLoader.add.image64('CONT_64', CONT_64);
		AssetLoader.add.image64('HAND_64', HAND_64);
		AssetLoader.add.image64('TEXT_64', TEXT_64);
		AssetLoader.add.image64('DLOAD_64', DLOAD_64);
		AssetLoader.progressListener = function (progress) { };
		AssetLoader.load(function () {
			game.mTex_hand = loadUI(game.gameUI, 'HAND_64', 0, 200, 0);
			game.mTex_hand.visible = false;
			game.mTex_hand.vx = -1;
			game.mTex_Continue = loadUI(game.gameUI, 'CONT_64', 0, 200, 11);
			game.mTex_Continue.vx = 1.01;
			game.mTex_Continue.sx = 1;
			game.mTex_Continue.visible = false;
			game.mTex_Download = loadUI(game.gameUI, 'DLOAD_64', 0, -320, 12);
			game.mTex_Download.vx = 1.1;
			game.mTex_Download.s = 1;
			game.mTex_Download.sx = 1.1;
			game.mTex_Download.count = 0;
			// DrawTexture(game.mTex_Download, 0, -320, 200, 50);
			game.mTex_text = loadUI(game.gameUI, 'TEXT_64', 0, -160, 0);
			// game.mTex_text.visible = true;

			for (var i = 0; i < mTex_fonts.length; i++) {
				game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
			}

		});

		if (this.useVisuals) {
			this.helper = new CannonHelper(this.scene);
			this.helper.addLights(this.renderer);
		}
		this.initPhysics();
		document.addEventListener('keydown', dealWithKeyboard);
		if (isMobile.any()) {
			document.addEventListener('touchstart', e => { this.touchEvent(e, 0, 1); });
			document.addEventListener('touchmove', e => { this.touchEvent(e, 1, 1); });
			document.addEventListener('touchend', e => { this.touchEvent(e, 2, 1); });
		} else {
			document.addEventListener('mousedown', e => { this.touchEvent(e, 0, 0); });
			document.addEventListener('mousemove', e => { this.touchEvent(e, 1, 0); });
			document.addEventListener('mouseup', e => { this.touchEvent(e, 2, 0); });
		}
		window.addEventListener('resize', this.onWindowResize, false);
	}
	Handle_Menu(clickval) {
		console.log('clickval yogesh ' + clickval);
	}
	onWindowResize() {
		mGame.camera.aspect = window.innerWidth / window.innerHeight;
		mGame.camera.updateProjectionMatrix();
		mGame.renderer.setSize(window.innerWidth, window.innerHeight);
		mGame.isResize = 5;
	}
	touchEvent(e, type, sys) {
		if (type == 0) {
			// this.fire = true;
			this.setFire();
		}
		if (type == 2) {
			this.fire = false;
		}
	}
	setFire() {
		if (this.fireBall.length < 32) {
			var obj = this.addBody(0, 0, 4, 50, TYPE.SPHERE);
			obj.velocity = new CANNON.Vec3(0, 14, -150);
			this.fireBall.push(obj);

			// var obj = this.addBody(0, 5, 4, 50, TYPE.SPHERE);
			// obj.velocity = new CANNON.Vec3(0, 14, -100);
			// this.fireBall.push(obj);

		} else {
			let j = -1, y = 0, z = 0;
			for (let i = 0; i < this.fireBall.length; i++) {
				if (this.fireBall[i].position.y < y || this.fireBall[i].position.z < -300) {
					y = this.fireBall[i].position.y;
					j = i;
				}
			}
			console.log(j + "~~~~~~~~~~~~~~" + y);
			if (j >= 0) {
				this.fireBall[j].position.set(0, 4, 50);
				this.fireBall[j].velocity = new CANNON.Vec3(0, 16, -150);
			}
			// j = -1; y = 0;
			// for (let i = 0; i < this.fireBall.length; i++) {
			// 	if (this.fireBall[i].position.y < y || this.fireBall[i].position.z < -400) {
			// 		y = this.fireBall[i].position.y;
			// 		j = i;
			// 	}
			// }
			// console.log(j + "~~~~~~~~00~~~~~~" + y);
			// if (j >= 0) {
			// 	this.fireBall[j].position.set(5, 4, 50);
			// 	this.fireBall[j].velocity = new CANNON.Vec3(0, 16, -100);
			// }
		}
	}
	addBody(sphere = 0, x, y, z, name) {
		console.log("~~~~~~~~name~~~~~~" + name);
		const material = new CANNON.Material();
		var body = new CANNON.Body({ mass: 5, material: material });
		switch (sphere) {
			case 0:
				body.addShape(this.shapes.sphere);
				break;
			case 1:
				body.addShape(this.shapes.box);
				break;
			case 2:
				body.addShape(this.shapes.cylinder);
				break;
			case 3:
				body.addShape(this.shapes.base);
				break;
		}
		body.id = 'you' + this.counter++;
		body.addEventListener("collide", (e) => { this.collition(e); });
		body.position.set(x, y, z);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		body.quaternion.setFromAxisAngle(axis, angle);
		body.linearDamping = this.damping;
		this.world.add(body);
		if (this.useVisuals) {
			switch (sphere) {
				case 0:
					this.helper.addVisual(body, name, true, false, 3);
					break;
				case 1:
					this.helper.addVisual(body, name, true, false, 0);
					break;
				case 2:
					this.helper.addVisual(body, name, true, false, 0);
					break;
				case 3:
					this.helper.addVisual(body, name, true, false, 0);
					break;
			}
		}
		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0 });
		this.world.addContactMaterial(material_ground);
		return body;
	}
	collition(e) {
		if (LVL < 2) {
			if ((e.target.name == TYPE.SPHERE && e.body.name == TYPE.CYLINDER) || (e.target.name == TYPE.CYLINDER && e.body.name == TYPE.SPHERE)) {
				this.isTuch = true;
				this.mTex_text.visible = false;
			}
		} else {
			for (let i = 0; i < this.mPyramid.length; i++) {
				if ((e.target.name == TYPE.SPHERE && e.body.name == TYPE.CYLINDER + '' + i) || (e.target.name == TYPE.CYLINDER + '' + i && e.body.name == TYPE.SPHERE)) {
					this.mPyramid[i].isTuch = true;
				}
			}
		}
	}
	initPhysics() {
		const world = new CANNON.World();
		this.world = world;
		this.fixedTimeStep = 1.0 / 60.0;
		this.damping = .01;
		world.broadphase = new CANNON.NaiveBroadphase();
		world.gravity.set(0, -10, 0);
		var sqr = LVL < 2 ? 20 : 60;
		const groundShape = new CANNON.Box(new CANNON.Vec3(sqr, sqr, 0.1))
		const groundMaterial = new CANNON.Material();
		const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		groundBody.addShape(groundShape);
		world.add(groundBody);
		this.cyl = [];
		this.shapes = {};
		this.shapes.sphere = new CANNON.Sphere(2);
		this.shapes.cylinder = new CANNON.Cylinder(3.5, 3.5, HEIGHT, 6);
		this.groundMaterial = groundMaterial;
		const material = new CANNON.Material();
		if (LVL < 2) {
			this.shapes.base = new CANNON.Cylinder(24, 24, 4, 8);
			this.shapes.box = new CANNON.Box(new CANNON.Vec3(3, 1.5, 2.5));
			this.ground = new CANNON.Body({ mass: 1000, material: material });
			this.ground.addShape(this.shapes.base);
			for (let i = 0; i < 6; i++) {
				var red = (i * 20) * (Math.PI / 180);
				var x = Math.cos(red) * 22;
				var z = Math.sin(red) * 22;
				this.ground.addShape(this.shapes.box, new CANNON.Vec3(x, z, -4));
			}
			this.ground.position.set(0, 2, 0);
			var axis = new CANNON.Vec3(1, 0, 0);
			var angle = Math.PI / 2;
			this.ground.quaternion.setFromAxisAngle(axis, angle);
			this.world.add(this.ground);
			this.helper.addVisual(this.ground, 'cylinder', true, false, 1);
			const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0.0 });
			this.world.addContactMaterial(material_ground);

			for (let i = 0; i < 28; i++) {
				var inc = Math.floor(i / 7) * 25;
				var red = (((i % 7) * (360 / 7)) + inc) * (Math.PI / 180);
				var x = Math.cos(red) * 9;
				var z = Math.sin(red) * 9;
				this.cyl.push(this.addBody(2, x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z, TYPE.CYLINDER));
				this.cyl[i].mass = 20;
			}
		} else {
			this.shapes.base = new CANNON.Cylinder(11, 11, 4, 8);
			this.shapes.box = new CANNON.Box(new CANNON.Vec3(3, 3, 5.5));
			this.mPyramid = [];
			this.mPyramid.push(this.addGround(material, -32, 0));
			this.mPyramid.push(this.addGround(material, 0, 1));
			this.mPyramid.push(this.addGround(material, 32, 2));
			const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0.0 });
			this.world.addContactMaterial(material_ground);
		}
		this.animate();
	}
	addGround(material, _x, no) {
		var ground = new CANNON.Body({ mass: 1000, material: material });
		ground.addShape(this.shapes.base);
		ground.position.set(_x, 2, 0);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		ground.quaternion.setFromAxisAngle(axis, angle);
		this.world.add(ground);
		this.helper.addVisual(ground, TYPE.GROUND, true, false, 1);

		var pyramid = new CANNON.Body({ mass: 1 });
		var polyhedronShape = this.createTetra();
		pyramid.addShape(polyhedronShape);
		pyramid.mass = 20;
		pyramid.position.set(_x, 14, 0);
		this.world.add(pyramid);
		this.helper.addVisual(pyramid, TYPE.PYRAMID, true, false, 2);


		var cyl = [];
		for (let i = 0; i < 4; i++) {
			var red = (((i % 4) * (360 / 4)) + 45) * (Math.PI / 180);
			var x = _x + Math.cos(red) * 5.2;
			var z = Math.sin(red) * 5.2;
			cyl.push(this.addBody(2, x, 4 + HEIGHT * .5, z, TYPE.CYLINDER + '' + no));
			cyl[i].mass = 20;
		}
		return new Pyramid(ground, pyramid, cyl, _x);
	}
	createTetra() {
		var verts = [
			new CANNON.Vec3(-5, 0, -5),
			new CANNON.Vec3(-5, 0, 5),
			new CANNON.Vec3(5, 0, 5),
			new CANNON.Vec3(5, 0, -5),
			new CANNON.Vec3(0, 10, 0),
		];
		return new CANNON.ConvexPolyhedron(verts, [
			[0, 3, 1],
			[1, 3, 2],
			[0, 4, 3],
			[3, 4, 2],
			[2, 4, 1],
			[1, 4, 0],
		]);
	}
	reset() {
		this.isTuch = false;
		for (let i = 0; i < this.cyl.length && this.isTuch == false; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc + this.counter) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl[i].position.set(x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z);
			this.cyl[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			this.cyl[i].position.set(0, 0, 0);
		}
		for (let i = 0; i < this.fireBall.length; i++) {
			this.fireBall[i].position.y = -100;
		}
	}
	installAnimation() {
		var scx = 0;
		if (window.innerWidth > window.innerHeight) {
			scx = 0.5;
		}
		DrawTexture(this.mTex_Download, this.mTex_Download.x, -320, 200 * this.mTex_Download.s, 50 * this.mTex_Download.s);
		this.mTex_Download.s *= this.mTex_Download.sx;
		if (this.mTex_Download.s > 1 + scx)
			this.mTex_Download.sx = .993;
		if (this.mTex_Download.s < .9 + scx)
			this.mTex_Download.sx = 1.008;

		this.mTex_Download.count++;
		if (this.counter % 300 > 250) {
			this.mTex_Download.x += this.mTex_Download.vx;
			if (this.mTex_Download.x > 5)
				this.mTex_Download.vx = -2;
			if (this.mTex_Download.x < -5)
				this.mTex_Download.vx = 2;
		}
		if (this.mTex_Continue.visible == true) {
			scx = -.1;
			DrawTexture(this.mTex_Continue, 0, 200, this.mTex_Continue.sx * 256, this.mTex_Continue.sx * 64);
			if (this.mTex_Continue.sx > 1.1 + scx) {
				this.mTex_Continue.vx = .995;
			}
			if (this.mTex_Continue.sx < 0.99 + scx) {
				this.mTex_Continue.vx = 1.005;
			}
			this.mTex_Continue.sx *= this.mTex_Continue.vx;
		}
		if (this.mTex_text.visible == true)
			DrawTexture(this.mTex_text, 0, -160, 256, 32);
	}
	animate() {
		const game = this;
		requestAnimationFrame(function () { game.animate(); });
		this.renderer.render(this.scene, this.camera);
		this.gameUI.render(renderer);
		this.world.step(this.fixedTimeStep);
		if (this.useVisuals) {
			this.helper.updateBodies(this.world);
		} else {
			this.debugRenderer.update();
		}
		if (this.counter % 10 == 9 && this.fire) {
			this.setFire();
		}

		if (LVL < 2)
			this.drawLevel1();
		else
			this.drawLevel2();

		for (let i = 0; i < this.fireBall.length; i++) {
			if (this.fireBall[i].position.z < -200) {
				this.fireBall[i].position.y = -1000;
			}
		}
		this.counter++;
		if (isResize > 0) {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// this.gameUI.resize();
			this.isResize--;
		}
	}
	drawLevel2() {
		if (this.counter > 5) {
			var val = 24;
			for (let i = 0; i < this.mPyramid.length; i++) {
				var red = this.counter * (Math.PI / 180);
				var x = -Math.cos(red) * (val - (i * val));
				var z = -Math.sin(red) * (val - (i * val));
				var quatX = new CANNON.Quaternion();
				var quatY = new CANNON.Quaternion();
				quatX.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
				quatY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), - Math.PI * this.counter * .01);
				var quaternion = quatY.mult(quatX);
				quaternion.normalize();

				this.mPyramid[i].ground.position.set(x, 2, z);
				this.mPyramid[i].ground.quaternion = quaternion;

				if (this.mPyramid[i].isTuch == false) {
					this.mPyramid[i].triangle.position.set(x, 14, z);
					this.mPyramid[i].triangle.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI * this.counter * .005);
					for (let j = 0; j < this.mPyramid[i].cyl.length; j++) {
						var red2 = (((j % 4) * (360 / 4)) + 45 + this.counter) * (Math.PI / 180);
						var x2 = Math.cos(red2) * 5.2 + x;
						var z2 = Math.sin(red2) * 5.2 + z;
						this.mPyramid[i].cyl[j].position.set(x2, 4 + HEIGHT * .5, z2);
					}
				} else {
					if (this.mPyramid[i].triangle.position.y < 8) {
						if (this.mPyramid[i].triangle.threemesh.scl > .05)
							this.mPyramid[i].triangle.threemesh.scl -= .1;
						else {
							this.mPyramid[i].removeTriangle();
						}
					}
					for (let j = 0; j < this.mPyramid[i].cyl.length; j++) {
						if (this.mPyramid[i].cyl[j].position.y < 8) {
							if (this.mPyramid[i].cyl[j].threemesh.scl > .05) {
								this.mPyramid[i].cyl[j].threemesh.scl -= .1;
							} else {
								this.mPyramid[i].removeCyl(j);
							}
						}

					}
				}


			}
		}
	}
	drawLevel1() {
		for (let i = 0; i < this.cyl.length && this.isTuch == false; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc + this.counter) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl[i].position.set(x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z);
			this.cyl[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
		}

		for (let i = 0; i < this.fireBall.length; i++) {
			// if (this.fireBall[i].position.z > -10)
			// 	this.fireBall[i].velocity = new CANNON.Vec3(0, 14, -100);
			// console.log(this.fireBall[i].position.z.toFixed(2));
			if (this.fireBall[i].velocity.z > -10) {
				this.fireBall[i].velocity.z = -100;
			}
		}
		if (this.counter > 5) {
			this.ground.position.set(0, 2, 0);
			var quatX = new CANNON.Quaternion();
			var quatY = new CANNON.Quaternion();
			quatX.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			quatY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), - Math.PI * this.counter * .01);
			var quaternion = quatY.mult(quatX);
			quaternion.normalize();
			this.ground.quaternion = quaternion;
		}
	}
}

class CannonHelper {
	constructor(scene) {
		this.scene = scene;
	}
	addLights(renderer) {
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		const ambient = new THREE.AmbientLight(0xffffff, .6);
		this.scene.add(ambient);
		const light = new THREE.DirectionalLight(0xdddddd);
		light.position.set(3, 10, 4);
		light.target.position.set(0, 0, 0);
		light.castShadow = true;
		const lightSize = 10;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 50;
		light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
		light.shadow.camera.right = light.shadow.camera.top = lightSize;
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		this.sun = light;
		this.scene.add(light);

		var geometry = new THREE.CylinderGeometry(6, 4.0, 20, 32);
		var material = new THREE.MeshLambertMaterial({ color: COLORS[3] });
		this.cylinder = new THREE.Mesh(geometry, material);
		var geometry = new THREE.CylinderGeometry(5.3, 4.9, 2, 32);
		var material = new THREE.MeshLambertMaterial({ color: COLORS[4] });
		this.cylinder2 = new THREE.Mesh(geometry, material);
		this.cylinder3 = this.cylinder2.clone();
		this.scene.add(this.cylinder);
		this.cylinder3.position.set(0, -1, 0);
		this.cylinder2.position.set(0, -9, 0);
		this.cylinder2.scale.set(.84, 1, .84);
		this.cylinder.add(this.cylinder3);
		this.cylinder.add(this.cylinder2);
		this.cylinder.rotation.set(Math.PI * .6, 0, 0);
		this.cylinder.position.set(0, 0, 72);


		this.cylinderClone = this.cylinder.clone();
		this.cylinderClone.position.set(5, 0, 72);
		// this.scene.add(this.cylinderClone);
	}
	addVisual(body, name, castShadow = true, receiveShadow = true, clr = 0) {
		body.name = name;
		if (this.currentMaterial === undefined) {
			this.materials = []
			this.currentMaterial = new THREE.MeshLambertMaterial({ color: COLORS[0] });
			for (let i = 0; i < COLORS.length; i++) {
				this.materials.push(new THREE.MeshLambertMaterial({ color: COLORS[i], side: THREE.DoubleSide }));
			}

		}
		let mesh;
		if (body instanceof CANNON.Body) mesh = this.shape2Mesh(body, castShadow, receiveShadow, clr);
		if (mesh) {
			body.threemesh = mesh;
			mesh.castShadow = castShadow;
			mesh.receiveShadow = receiveShadow;
			this.scene.add(mesh);
		}
	}

	shape2Mesh(body, castShadow, receiveShadow, clr) {
		const obj = new THREE.Object3D();
		const material = this.materials[clr];
		const material1 = this.materials[2];
		const nam = body.name;

		const game = this;
		let index = 0;
		body.shapes.forEach(function (shape) {
			let mesh;
			switch (shape.type) {
				case CANNON.Shape.types.SPHERE:
					const sphere_geometry = new THREE.SphereGeometry(shape.radius, 12, 12);
					mesh = new THREE.Mesh(sphere_geometry, material);
					break;
				case CANNON.Shape.types.PLANE:
					mesh = new THREE.Object3D();
					const submesh = new THREE.Object3D();
					const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 4, 4), material2);
					ground.scale.set(100, 100, 100);
					submesh.add(ground);
					mesh.add(submesh);
					break;
				case CANNON.Shape.types.BOX:
					if (LVL < 2)
						mesh = new THREE.Group();
					else {
						const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
						mesh = new THREE.Mesh(box_geometry, material);
					}
					break;
				case CANNON.Shape.types.CONVEXPOLYHEDRON:
					console.log(TYPE.PYRAMID + ' shape2Mesh  -> ' + nam);
					if (nam != TYPE.PYRAMID) {
						mesh = new THREE.Group();
						var cyl;
						if (clr == 0) {
							if (LVL == 1) {
								cyl = mBurger.createHamburger();
							} else {
								cyl = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, HEIGHT, 16), material);
							}
							cyl.rotation.set(-Math.PI * .5, 0, 0);
						} else {
							// cyl = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 2, 32), material);
							// cyl.rotation.set(Math.PI * .5, 0, 0);
							if (LVL < 2)
								cyl = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 3.4, 32), material);
							else
								cyl = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 3.4, 32), material);
							var nm = new THREE.Mesh(tubes, material1);
							nm.position.set(0, 3.8, 0);
							nm.rotation.set(Math.PI * .5, 0, 0);
							if (LVL < 2)
								cyl.add(nm);
							cyl.rotation.set(-Math.PI * .5, 0, 0);
						}
						mesh.add(cyl);
					} else {
						var geo = new THREE.Geometry();
						for (var i = 0; i < shape.vertices.length; i++) {
							var v = shape.vertices[i];
							geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
						}

						for (var i = 0; i < shape.faces.length; i++) {
							var face = shape.faces[i];
							var a = face[0];
							for (var j = 1; j < face.length - 1; j++) {
								var b = face[j];
								var c = face[j + 1];
								geo.faces.push(new THREE.Face3(a, b, c));
							}
						}
						geo.computeBoundingSphere();
						geo.computeFaceNormals();
						mesh = new THREE.Mesh(geo, material);
					}
					break;
			}
			mesh.receiveShadow = receiveShadow;
			mesh.castShadow = castShadow;
			mesh.traverse(function (child) {
				if (child.isMesh) {
					child.castShadow = castShadow;
					child.receiveShadow = receiveShadow;
					child.color = createColor();
				}
			});
			var o = body.shapeOffsets[index];
			var q = body.shapeOrientations[index++];
			mesh.position.set(o.x, o.y, o.z);
			mesh.quaternion.set(q.x, q.y, q.z, q.w);
			obj.add(mesh);
		});
		return obj;
	}

	updateBodies(world) {
		world.bodies.forEach(function (body) {
			if (body.threemesh != undefined) {
				body.threemesh.position.copy(body.position);
				body.threemesh.quaternion.copy(body.quaternion);
				if (body.threemesh.scl > 0)
					body.threemesh.scale.set(body.threemesh.scl, body.threemesh.scl, body.threemesh.scl);
			}
		});
		// this.cylinder.rotation.set(Math.PI * rx, Math.PI * ry, 0);
		// this.cylinder.position.set(0, 0, sz);
		// this.scene.add(this.cylinder2);
		// this.cylinder2.rotation.set(Math.PI * .7, 0, 0);
		// this.cylinder.rotation.set(Math.PI * mGame.counter * .1, 0, 0);
	}
}