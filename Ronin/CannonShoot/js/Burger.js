class Burger {
	createHamburger() {
		var Hamburger;
		if (this.hamburger === undefined) {
			var COL = [0xfad49e, 0xefe97f, 0x725b5a, 0x8ac286];

			Hamburger = new THREE.Group();
			var geometry = new THREE.SphereGeometry(3.84, 8, 8, 0, Math.PI, 0, Math.PI);
			var material = new THREE.MeshLambertMaterial({ color: COL[0] });
			var top = new THREE.Mesh(geometry, material);
			Hamburger.add(top);
			top.rotation.set(-Math.PI * .5, 0, 0);


			var material = new THREE.MeshLambertMaterial({ color: COL[1] });
			var box_geometry = new THREE.BoxGeometry(8, .2, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, 0, 0);
			cheese.rotation.set(-Math.PI * .01, 0, 0);
			Hamburger.add(cheese);

			var material = new THREE.MeshLambertMaterial({ color: COL[2] });
			var box_geometry = new THREE.CylinderGeometry(4, 4, 3.4, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -1.80, 0);
			Hamburger.add(cheese);

			var material = new THREE.MeshLambertMaterial({ color: COL[3] });
			var box_geometry = new THREE.CylinderGeometry(4.2, 4.2, .4, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -1.90, 0);
			Hamburger.add(cheese);

			var material = new THREE.MeshLambertMaterial({ color: COL[1] });
			var box_geometry = new THREE.BoxGeometry(8, .2, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -2.20, 0);
			Hamburger.add(cheese);


			// var material = new THREE.MeshLambertMaterial({ color: COL[2] });
			// var box_geometry = new THREE.CylinderGeometry(4, 4, 1.4, 8);
			// var cheese = new THREE.Mesh(box_geometry, material);
			// cheese.position.set(0, -2.90, 0);
			// Hamburger.add(cheese);




			var material = new THREE.MeshLambertMaterial({ color: COL[3] });
			var box_geometry = new THREE.CylinderGeometry(4.2, 4.2, .4, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -3.70, 0);
			Hamburger.add(cheese);


			var material = new THREE.MeshLambertMaterial({ color: COL[0] });
			var box_geometry = new THREE.CylinderGeometry(3.84, 3.84, 2, 16);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -5.00, 0);
			Hamburger.add(cheese);



			Hamburger.position.set(0, 0, 0);
			// this.scene.add(Hamburger);
			this.hamburger = Hamburger;

		} else {
			Hamburger = this.hamburger.clone();
		}
		return Hamburger;
	}
}
class Pyramid {
	constructor(_ground, _triangle, _cyl, _x) {
		this.ground = _ground;
		this.triangle = _triangle;
		this.cyl = _cyl;
		this.x = _x;
		this.isTuch = false;
		this.triangle.threemesh.scl = 1;
		for (let i = 0; i < this.cyl.length; i++) {
			this.cyl[i].threemesh.scl = 1;
		}
	}
	removeCyl(i) {
		mGame.world.remove(this.cyl[i]);
		mGame.scene.remove(this.cyl[i].threemesh);
		this.cyl.splice(i, 1);
	}
	removeTriangle() {
		mGame.world.remove(this.triangle);
		mGame.scene.remove(this.triangle.threemesh);
	}
}