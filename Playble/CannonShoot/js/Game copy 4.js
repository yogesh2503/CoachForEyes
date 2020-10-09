const HEIGHT = 10;
const COLORS = [0x6972d1, 0xd83a8a, 0x464a4e, 0x6dfeff, 0xf7bb28];
/*blue,gray,pink,megenta,orange */
class Game {
	constructor() {
		this.useVisuals = true;
		this.init();
	}
	init() {
		const game = this;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf5c761);
		this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);//30
		this.camera.lookAt(new THREE.Vector3(0, 5, 0));
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		if (this.useVisuals) {
			this.helper = new CannonHelper(this.scene);
			this.helper.addLights(this.renderer);
		}
		this.initPhysics();
		this.counter = 0;
		this.isTuch = false;
		this.fire = false;
		this.fireBall = [];
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
		window.addEventListener('resize', onWindowResize, false);
	}
	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.isResize = 5;
	}
	touchEvent(e, type, sys) {
		if (type == 0) {
			this.fire = true;
		}
		if (type == 2) {
			this.fire = false;
		}
	}
	addBody(sphere = 0, x, y, z) {
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

		// const x = Math.random() * 0.3 + 1;
		body.position.set(x, y, z);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		body.quaternion.setFromAxisAngle(axis, angle);
		body.linearDamping = this.damping;
		this.world.add(body);

		if (this.useVisuals) {
			switch (sphere) {
				case 0:
					this.helper.addVisual(body, 'sphere', true, false, 3);
					break;
				case 1:
					this.helper.addVisual(body, 'box', true, false, 0);
					break;
				case 2:
					this.helper.addVisual(body, 'cylinder', true, false, 0);
					break;
				case 3:
					this.helper.addVisual(body, 'cylinder', true, false, 0);
					break;
			}
		}
		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0 });
		this.world.addContactMaterial(material_ground);
		return body;
	}

	collition(e) {
		if (e.target.name == 'sphere' || e.target.name == '')
			this.isTuch = true;
	}

	initPhysics() {
		const world = new CANNON.World();
		this.world = world;
		this.fixedTimeStep = 1.0 / 60.0;
		this.damping = .01;
		world.broadphase = new CANNON.NaiveBroadphase();
		world.gravity.set(0, -10, 0);
		// const groundShape = new CANNON.Plane();
		const groundShape = new CANNON.Box(new CANNON.Vec3(20, 20, 0.1))
		const groundMaterial = new CANNON.Material();
		const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		groundBody.addShape(groundShape);
		world.add(groundBody);

		// groundBody.collisionFilterGroup = GROUP3;           // Put the cylinder in group 3
		// groundBody.collisionFilterMask = GROUP1;           // It can only collide with group 1 (the sphere)


		// if (this.useVisuals) this.helper.addVisual(groundBody, 'box', false, true, 1);



		this.cyl = [];

		this.shapes = {};

		this.shapes.sphere = new CANNON.Sphere(2);
		this.shapes.box = new CANNON.Box(new CANNON.Vec3(3, 1.5, 2.5));
		this.shapes.cylinder = new CANNON.Cylinder(3.5, 3.5, HEIGHT, 6);
		this.shapes.base = new CANNON.Cylinder(24, 24, 4, 8);
		this.groundMaterial = groundMaterial;


		const material = new CANNON.Material();
		this.ground = new CANNON.Body({ mass: 1000, material: material });
		this.ground.addShape(this.shapes.base);
		for (let i = 0; i < 6; i++) {
			var red = (i * 20) * (Math.PI / 180);
			var x = Math.cos(red) * 22;
			var z = Math.sin(red) * 22;
			this.ground.addShape(this.shapes.box, new CANNON.Vec3(x, z, -4));


		}
		// this.ground.collisionFilterGroup = GROUP3;           // Put the cylinder in group 3
		// this.ground.collisionFilterMask = GROUP1;           // It can only collide with group 1 (the sphere)

		// this.ground.addShape(this.shapes.box, new CANNON.Vec3(20, 0, -4));

		this.ground.position.set(0, 2, 0);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		this.ground.quaternion.setFromAxisAngle(axis, angle);
		// this.ground.linearDamping = this.damping;
		this.world.add(this.ground);

		this.helper.addVisual(this.ground, 'cylinder', true, false, 1);

		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0.0 });
		this.world.addContactMaterial(material_ground);
		// this.ground.angularVelocity.y = 1;


		for (let i = 0; i < 28; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl.push(this.addBody(2, x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z));
			// this.cyl[i].collisionFilterGroup = GROUP1;
			// this.cyl[i].collisionFilterMask = GROUP2 | GROUP3;



		}

		// var rot = new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 4);
		// var cur = this.ground.quaternion;
		// var quaternion = cur.vmult(rot);
		this.animate();
	}

	animate() {
		const game = this;
		requestAnimationFrame(function () { game.animate(); });
		for (let i = 0; i < this.cyl.length && this.isTuch == false; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc + this.counter) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl[i].position.set(x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z);
			this.cyl[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
		}
		this.world.step(this.fixedTimeStep);
		if (this.useVisuals) {
			this.helper.updateBodies(this.world);
		} else {
			this.debugRenderer.update();
		}
		this.renderer.render(this.scene, this.camera);
		if (this.counter % 10 == 9 && this.fire) {
			if (this.fireBall.length < 20) {
				var obj = this.addBody(0, 0, 4, 50);
				obj.velocity = new CANNON.Vec3(0, 10, -100);
				this.fireBall.push(obj);
			} else {
				let j = -1, y = 0;
				for (let i = 0; i < this.fireBall.length; i++) {
					if (this.fireBall[i].position.y < y) {
						y = this.fireBall[i].position.y;
						j = i;
					}
				}
				if (j >= 0) {
					this.fireBall[j].position.set(0, 4, 50);
					this.fireBall[j].velocity = new CANNON.Vec3(0, 12, -100);
				}
			}
		}
		if (this.counter > 5) {
			this.ground.position.set(0, 2, 0);
			// this.ground.angularVelocity.y = 1;
			var quatX = new CANNON.Quaternion();
			var quatY = new CANNON.Quaternion();
			quatX.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			quatY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), - Math.PI * this.counter * .01);
			var quaternion = quatY.mult(quatX);
			quaternion.normalize();
			this.ground.quaternion = quaternion;
		}
		this.counter++;
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

		var geometry = new THREE.CylinderGeometry(6, 4, 20, 8);
		var material = new THREE.MeshLambertMaterial({ color: COLORS[3] });
		this.cylinder = new THREE.Mesh(geometry, material);

		var geometry = new THREE.CylinderGeometry(5, 5, 2, 8);
		var material = new THREE.MeshLambertMaterial({ color: COLORS[4] });
		this.cylinder2 = new THREE.Mesh(geometry, material);
		this.cylinder3 = this.cylinder2.clone();


		this.scene.add(this.cylinder);


		this.cylinder3.position.set(0, -1, 0);

		this.cylinder2.position.set(0, -9, 0);
		this.cylinder2.scale.set(.9, .9, 1);
		this.cylinder.add(this.cylinder3);
		this.cylinder.add(this.cylinder2);

		this.cylinder.rotation.set(Math.PI * .6, 0, 0);
		this.cylinder.position.set(0, 0, 72);


		// var geometry = new THREE.CylinderGeometry(24, 24, 2, 32);
		// this.base = new THREE.Mesh(geometry, material);
		// this.scene.add(this.base);
		// this.object = new THREE.Mesh(tubes, material);
		// this.object.position.set(0, 8, 0);
		// this.object.rotation.set(Math.PI * .5, 0, 0);
		// this.scene.add(this.object);


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
		const game = this;
		let index = 0;
		body.shapes.forEach(function (shape) {
			let mesh;
			let geometry;
			switch (shape.type) {
				case CANNON.Shape.types.SPHERE:
					const sphere_geometry = new THREE.SphereGeometry(shape.radius, 8, 8);
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
					// const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
					// mesh = new THREE.Mesh(box_geometry, material);
					mesh = new THREE.Group();
					break;
				case CANNON.Shape.types.CONVEXPOLYHEDRON:
					// var geo = new THREE.Geometry();
					// for (var i = 0; i < shape.vertices.length; i++) {
					// 	var v = shape.vertices[i];
					// 	geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
					// }

					// for (var i = 0; i < shape.faces.length; i++) {
					// 	var face = shape.faces[i];
					// 	var a = face[0];
					// 	for (var j = 1; j < face.length - 1; j++) {
					// 		var b = face[j];
					// 		var c = face[j + 1];
					// 		geo.faces.push(new THREE.Face3(a, b, c));
					// 	}
					// }
					// geo.computeBoundingSphere();
					// geo.computeFaceNormals();
					// mesh = new THREE.Mesh(geo, material);
					mesh = new THREE.Group();
					var cyl;
					if (clr == 0) {
						cyl = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, HEIGHT, 16), material);
						cyl.rotation.set(Math.PI * .5, 0, 0);
					} else {
						// cyl = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 2, 32), material);
						// cyl.rotation.set(Math.PI * .5, 0, 0);
						cyl = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 2, 32), material);
						var nm = new THREE.Mesh(tubes, material1);
						nm.position.set(0, 3.1, 0);
						nm.rotation.set(Math.PI * .5, 0, 0);
						cyl.add(nm);
						cyl.rotation.set(-Math.PI * .5, 0, 0);

					}
					mesh.add(cyl);

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
		// this.cylinder.rotation.set(Math.PI * rx, 0, 0);
		// this.cylinder.position.set(0, 0, sz);

		// this.scene.add(this.cylinder2);

		// this.cylinder2.rotation.set(Math.PI * .7, 0, 0);




	}
}