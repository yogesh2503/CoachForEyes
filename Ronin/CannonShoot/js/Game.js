const COLORS0 = [0x6972d1, 0xd83a8a, 0x464a4e, 0x6dfeff, 0xf7bb28];
const COLORS = [0x60bee7, 0x074306, 0xeeeff2, 0x6dfeff, 0xf7bb28, 0x737879];//,blue,green,	white,megenta,orange,gray
const HEIGHT = 1;
const mBurger = new Burger();
const TYPE = {
	SPHERE: 'sphere',
	BOX: 'box',
	CYLINDER: 'cylinder',
	PYRAMID: 'Pyramid',
	GROUND: 'ground',
};
const LVL = 0;
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

		this.mouseD = new THREE.Vector2();
		this.mouse = new THREE.Vector2();
		this.coords = null;
		this.vec2 = new THREE.Vector2();
		this.isClick = false;

		this.mTex_fonts = Array(2);
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xadadad);
		this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);//30
		this.camera.lookAt(new THREE.Vector3(0, 5, 0));
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		this.gameUI = new ThreeUI(this.renderer.domElement, 720);

		this.mTex_Back = loadUIRect(this.gameUI, 0, 0, 256, 256, '#ffffff');
        DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);

		AssetLoader.add.image('assets/playNow.png');
		AssetLoader.add.image('assets/playAgain.png');
		
		AssetLoader.progressListener = function (progress) { };
		AssetLoader.load(function () {
			game.mTex_Again = loadUI(game.gameUI, 'assets/playAgain.png', 0, 200, 11);
			game.mTex_Now = loadUI(game.gameUI, 'assets/playNow.png', 0, -320, 12);
			for (var i = 0; i < mTex_fonts.length; i++) {
				game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
			}
			game.counter =0;
			game.setScreen(GAMEMENU);
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
		mGame.setScreen(GAMEPLAY);
	}
	onWindowResize() {
		mGame.camera.aspect = window.innerWidth / window.innerHeight;
		mGame.camera.updateProjectionMatrix();
		mGame.renderer.setSize(window.innerWidth, window.innerHeight);
		mGame.isResize = 5;
	}
	touchEvent(e, type) {
		var scale = this.gameUI.height / this.gameUI.gameCanvas.getBoundingClientRect().height;
		var ms = window.innerWidth / window.innerHeight; 
		if (e.touches != null) {
			if (e.touches.length > 0) {
				this.coords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
				this.coords.x = this.coords.x - (window.innerWidth - this.gameUI.gameCanvas.getBoundingClientRect().width) / 2;
				this.mouse = { x: ((e.touches[0].pageX / window.innerWidth) * 2 - 1)*ms, y: (-(e.touches[0].pageY  / window.innerHeight) * 2 + 1) };
			}

		} else {
			this.mouse = { x: ((e.clientX / window.innerWidth) * 2 - 1)*ms, y: (-(e.clientY / window.innerHeight) * 2 + 1) };
			this.coords = { x: e.clientX, y: e.clientY };
			this.coords.x = this.coords.x - (window.innerWidth - this.gameUI.gameCanvas.getBoundingClientRect().width) / 2;
		}
		this.coords.x *= scale;
		this.coords.y *= scale;
		
		if(type == 0){
			this.mouseD = { x:this.mouse.x, y: this.mouse.y };
			this.isClick = true;
		}
		if(type == 2 && this.isClick ){
			var xD = this.mouseD.x - this.mouse.x;
			var yD = this.mouseD.y - this.mouse.y;
			this.dis = Math.sqrt(xD*xD+yD*yD);
			if(this.dis > .1 && GameScreen == GAMEPLAY){
				this.red = GetAngle(-xD,-yD);
				this.setFire();
			}
			this.isClick = false;
		}
	}
	touchEvent0(e, type, sys) {
		if (type == 0) {
			// this.fire = true;
			this.setFire();
		}
		if (type == 2) {
			this.fire = false;
		}
	}
	setFire() {
		console.log("setFire~~~~~~~~~~~~~~ " + this.dis*100);
		var xx = Math.cos(this.red)*250;
		var yy = Math.sin(this.red)*250;
		if (this.fireBall.length < 32) {
			var obj = this.addBody(0, 0, 0, 60, TYPE.SPHERE);
			obj.velocity = new CANNON.Vec3(xx, this.dis*200, -yy);
			obj.mass = 20;
			this.fireBall.push(obj);

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
				this.fireBall[j].position.set(0, 0, 60);
				this.fireBall[j].velocity = new CANNON.Vec3(xx, this.dis*200, -yy);
			}
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
					this.helper.addVisual(body, name, true, false, 6);
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
	addBody2(sphere, x, y, z, name, color) {
		console.log("~~~~~~~~name~~~~~~" + name);
		const material = new CANNON.Material();
		material.friction = 0.01;
		var body = new CANNON.Body({ mass: 10, material: material });
		body.addShape(sphere);

		body.id = 'you' + this.counter++;
		body.addEventListener("collide", (e) => { this.collition(e); });
		body.position.set(x, y, z);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		body.quaternion.setFromAxisAngle(axis, angle);
		body.linearDamping = this.damping;
		this.world.add(body);
		this.helper.addVisual(body, name, true, false, color);
		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0 });
		this.world.addContactMaterial(material_ground);
		return body;
	}
	collition(e) {
	}
	initPhysics() {
		const world = new CANNON.World();
		this.world = world;
		this.fixedTimeStep = 1.0 / 60.0;
		this.damping = .01;
		world.broadphase = new CANNON.NaiveBroadphase();
		world.gravity.set(0, -100, 0);
		
		const groundShape = new CANNON.Box(new CANNON.Vec3(40, 20, 0.1))
		const groundShape1 = new CANNON.Box(new CANNON.Vec3(40, 1, 25))
		const groundMaterial = new CANNON.Material();
		groundMaterial.friction = .51;
		const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		groundBody.addShape(groundShape);
		
		groundBody.addShape(groundShape1, new CANNON.Vec3(0, 20, 25));

		this.helper.addVisual(groundBody, 'cylinder', true, false, 1);
		world.add(groundBody);
		this.cyl = [];
		this.shapes = {};
		this.shapes.sphere = new CANNON.Sphere(2);
		this.shapes.cylinder = new CANNON.Cylinder(15, 15, 2, 6);
		this.groundMaterial = groundMaterial;
		const material = new CANNON.Material();
		if (LVL < 2) {
			this.ground = null;
			// this.shapes.base = new CANNON.Cylinder(24, 24, 4, 8);
			this.shapes.base = new CANNON.Box(new CANNON.Vec3(30, 15, 1));
			this.shapes.box = new CANNON.Box(new CANNON.Vec3(3, 1.5, 2.5));
			// this.ground = new CANNON.Body({ mass: 1000, material: material });
			// this.ground.addShape(this.shapes.base);

			// this.ground.position.set(0, 2, 0);
			var axis = new CANNON.Vec3(1, 0, 0);
			var angle = Math.PI / 2;
			// this.ground.quaternion.setFromAxisAngle(axis, angle);
			// this.world.add(this.ground);
			// this.helper.addVisual(this.ground, 'cylinder', true, false, 5);

			const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0.0 });
			this.world.addContactMaterial(material_ground);

			var ny = -4;
			this.cyl.push(this.addBody2(this.shapes.cylinder, 0, 4.5+ny, 0, TYPE.CYLINDER, 2));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(15, 15, 2, 16), 0, 6.2+ny, 0, TYPE.CYLINDER, 4));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(10.0, 12, 3, 16), 0, 8.7+ny, 0, TYPE.CYLINDER, 3));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(10.0, 11, 3, 16), 1, 11.6+ny, 0, TYPE.CYLINDER, 2));
			this.cyl.push(this.addBody2(this.shapes.cylinder, 0, 13.7+ny, 0, TYPE.CYLINDER, 2));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(8, 8, 6, 16), 0, 17.3+ny, 0, TYPE.CYLINDER, 1));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(5.4, 5, 6, 16), 0, 23.2+ny, 0, TYPE.CYLINDER, 0));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(9.4, 5, 6, 16), 0, 29.5+ny, 0, TYPE.CYLINDER, 2));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(5.0, 6, 3, 16), 0, 34+ny, 0, TYPE.CYLINDER, 4));
			this.cyl.push(this.addBody2(new CANNON.Cylinder(9.0, 10, 3, 16), 0, 37+ny, 0, TYPE.CYLINDER, 5));
			
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
		this.counter=0;

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
	GameMenu() {
		DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);
		if(this.mTex_Now != undefined)
			DrawTexture(this.mTex_Now, 0, 200, 256, 64);

			
	}
	GameOver() {
		DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);
		if(this.mTex_Now != undefined)
			DrawTexture(this.mTex_Again, 0, 200, 256, 64);
	}
	animate() {
		const game = this;
		requestAnimationFrame(function () { game.animate(); });
		this.renderer.render(this.scene, this.camera);
		this.gameUI.render(renderer);
		switch(GameScreen){
			case GAMEMENU:
				if(this.counter < 1){
					this.drawLevel1();
				}
				this.GameMenu();
				break;
			case GAMEPLAY:
				this.drawLevel1();
				
				break;
			case GAMEOVER:
				this.GameOver();
				break;
		}
		this.counter++;
		if (isResize > 0) {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.gameUI.resize();
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
		this.world.step(this.fixedTimeStep);
		this.helper.updateBodies(this.world);
		var isOver = true;
		for (let i = 0; i < this.cyl.length&& isOver; i++) {
			if(this.cyl[i].position.y > -5){
				isOver =false;
			}
		}
		if(isOver){
			this.setScreen(GAMEOVER);
		}
		for (let i = 0; i < this.fireBall.length; i++) {
			// if (this.fireBall[i].velocity.z > -10) {
			// 	this.fireBall[i].velocity.z = -100;
			// }
			if (this.fireBall[i].position.z < -200) {
				this.fireBall[i].position.y = -1000;
			}
		}
	}
	setScreen(scr) {
		GameScreen = scr;
		this.mTex_Back.visible = this.mTex_Now.visible = this.mTex_Again.visible = false;
		switch (GameScreen) {
			case GAMEMENU:
				break;
			case GAMEPLAY:
				break;
			case GAMEOVER:
				var arr = [4.5,6.2,8.7,11.6,13.7,17.3,23.2,29.5,34,37];
				for (let i = 0; i < this.cyl.length; i++) {
					this.cyl[i].velocity.x =this.cyl[i].velocity.y =this.cyl[i].velocity.z=0;
					this.cyl[i].angularVelocity.x =this.cyl[i].angularVelocity.y =this.cyl[i].angularVelocity.z=0;
					this.cyl[i].position.set(0,arr[i]-4, 0);
					this.cyl[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
				}
				break;
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
		const ambient = new THREE.AmbientLight(0xffffff, .5);
		this.scene.add(ambient);
		const light = new THREE.DirectionalLight(0xdddddd, .8);
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

		this.cylinder3.position.set(0, -1, 0);
		this.cylinder2.position.set(0, -9, 0);
		this.cylinder2.scale.set(.84, 1, .84);
		this.cylinder.add(this.cylinder3);
		this.cylinder.add(this.cylinder2);
		this.cylinder.rotation.set(Math.PI * .6, 0, 0);
		this.cylinder.position.set(0, 0, 72);


		this.cylinderClone = this.cylinder.clone();
		this.cylinderClone.position.set(5, 0, 72);
		this.ballTex = new THREE.TextureLoader().load('./assets/ball.jpg');
		var mm = new THREE.MeshLambertMaterial({ map: this.ballTex, side: THREE.DoubleSide });
		const sphere_geometry = new THREE.SphereGeometry(2, 12, 12);
		var mesh = new THREE.Mesh(sphere_geometry, mm);
		this.scene.add(mesh);
		mesh.position.set(0, 0, 62);
		mesh.rotation.set(0, 0, Math.PI * .5);
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
			this.materials.push(new THREE.MeshLambertMaterial({ map: this.ballTex, side: THREE.DoubleSide }));

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
		const material = this.materials[clr%this.materials.length];
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
					if (LVL < 0)
						mesh = new THREE.Group();
					else {
						const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
						mesh = new THREE.Mesh(box_geometry, material);
					}
					break;
				case CANNON.Shape.types.CONVEXPOLYHEDRON:
					console.log(TYPE.PYRAMID + ' shape '+clr+' Mesh  -> ' + nam);
					if (nam == TYPE.PYRAMID) {
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
							// if (LVL < 2)
							// 	cyl.add(nm);
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
						if(clr <= 5)
							mesh = new THREE.Mesh(geo,  new THREE.MeshLambertMaterial({ color: createColor()}));
						else
							mesh = new THREE.Mesh(geo,  material);
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
				
			}
		});
	}
}