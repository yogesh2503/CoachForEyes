class Game {
	constructor() {
		this.useVisuals = true;
		this.init();
	}
	init() {
		const game = this;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0, 0, 0);
		this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);
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
		}

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
					this.helper.addVisual(body, 'sphere', true, false);
					break;
				case 1:
					this.helper.addVisual(body, 'box', true, false);
					break;
				case 2:
					this.helper.addVisual(body, 'cylinder', true, false);
					break;
			}
		}
		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: (sphere) ? 0.9 : 0.3 });
		this.world.addContactMaterial(material_ground);
		return body;
	}



	initPhysics() {
		const world = new CANNON.World();
		this.world = world;
		this.fixedTimeStep = 1.0 / 60.0;
		this.damping = .01;
		world.broadphase = new CANNON.NaiveBroadphase();
		world.gravity.set(0, -10, 0);
		// const groundShape = new CANNON.Cylinder(20, 20, 4, 20);
		const groundShape = new CANNON.Cylinder(20, 20, 4, 20);
		const groundMaterial = new CANNON.Material();
		const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		groundBody.addShape(groundShape);

		world.add(groundBody);
		if (this.useVisuals) this.helper.addVisual(groundBody, 'ground', false, true);
		this.ground = groundBody;
		// groundBody.angularVelocity.y = 1;
		// this.ground.type = CANNON.Body.STATIC;












		this.cyl = [];

		this.shapes = {};
		var hight = 10;
		this.shapes.sphere = new CANNON.Sphere(0.5);
		this.shapes.box = new CANNON.Box(new CANNON.Vec3(15, 15, 1.5));
		this.shapes.cylinder = new CANNON.Cylinder(3.5, 3.5, hight, 20);
		this.groundMaterial = groundMaterial;
		this.animate();
		// this.addBody(1, 0, 2.4, 0);
		var bodya = this.addBody(1, 0, 3.5, 0);
		bodya.angularVelocity.y = 1;


		for (let i = 0; i < 1; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl.push(this.addBody(2, x, 3 + 2 + (hight * .5) + (Math.floor(i / 7) * hight), z));

			console.log("inc[" + this.cyl.length + "] = " + inc);
		}


		// var rot = new CANNON.Quaternion().setFromAxisAngle(new CANNON.Vec3(0, 0, 0), Math.PI / 4);
		// var cur = this.ground.quaternion;
		// var quaternion = cur.vmult(rot);
	}

	animate() {
		const game = this;
		requestAnimationFrame(function () { game.animate(); });


		var quatX = new CANNON.Quaternion();
		var quatY = new CANNON.Quaternion();
		quatX.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		quatY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.counter * .02);
		var quaternion = quatY.mult(quatX);
		quaternion.normalize();
		this.ground.quaternion = quaternion;


		// this.cyl[0].angularVelocity.z = 100;
		// this.ground.quaternion = new CANNON.Quaternion(1, this.counter * .01, 1, 1);

		this.world.step(this.fixedTimeStep);
		if (this.useVisuals) {
			this.helper.updateBodies(this.world);
		} else {
			this.debugRenderer.update();
		}
		this.renderer.render(this.scene, this.camera);

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
		const ambient = new THREE.AmbientLight(0x888888);
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
	}
	addVisual(body, name, castShadow = true, receiveShadow = true) {
		body.name = name;
		if (this.currentMaterial === undefined)
			this.currentMaterial = new THREE.MeshLambertMaterial({ color: 0x008888 });
		let mesh;
		if (body instanceof CANNON.Body) mesh = this.shape2Mesh(body, castShadow, receiveShadow);
		if (mesh) {
			body.threemesh = mesh;
			mesh.castShadow = castShadow;
			mesh.receiveShadow = receiveShadow;
			this.scene.add(mesh);
		}
	}

	shape2Mesh(body, castShadow, receiveShadow) {
		const obj = new THREE.Object3D();
		const material = this.currentMaterial;
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
					const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 4, 4), material);
					ground.scale.set(100, 100, 100);
					submesh.add(ground);
					mesh.add(submesh);
					break;
				case CANNON.Shape.types.BOX:
					const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
					mesh = new THREE.Mesh(box_geometry, material);
					break;
				case CANNON.Shape.types.CONVEXPOLYHEDRON:
					var geo = new THREE.Geometry();

					// Add vertices
					for (var i = 0; i < shape.vertices.length; i++) {
						var v = shape.vertices[i];
						geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
					}

					for (var i = 0; i < shape.faces.length; i++) {
						var face = shape.faces[i];

						// add triangles
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