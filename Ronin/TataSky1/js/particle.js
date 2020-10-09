

var DMath = {
    random: function (number) {
        return number * Math.random();
    },
    randomInt: function (number) {
        return Math.floor(DMath.random(number));
    },
    randomPlusMinus: function (number) {
        return number * (Math.random() - Math.random());
    },
    randomIntPlusMinus: function (number) {
        return Math.round(DMath.randomPlusMinus(number));
    },
    randomFromTo: function (from, to) {
        return from + (to - from) * Math.random();
    },
    randomIntFromTo: function (from, to) {
        return Math.floor(DMath.randomFromTo(from, to));
    },

    angleRadBetween2Points: function (p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    },

    angleDegBetween2Points: function (p1, p2) {
        return DMath.radToDeg(DMath.angleRadBetween2Points(p1, p2));
    },

    degToRad: function (deg) {
        return deg * Math.PI / 180;
    },

    radToDeg: function (rad) {
        return rad * 180 / Math.PI;
    },

    angleRadBetween3Points: function (A, B, C) {
        var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
        var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
        var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
        return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    },

    getPointWithAngleAndRadius: function (angle, radius) {
        var p = {
            x: 0,
            y: 0
        };
        p.x = radius * Math.cos(angle);
        p.y = radius * Math.sin(angle);
        return p;
    },

    distanceBetweenPoints: function (p1, p2) {
        var x1 = p1.x;
        var y1 = p1.y;

        var x2 = p2.x;
        var y2 = p2.y;

        var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        return d;
    }
}

var DArray = {
    remove: function (item, array) {
        var arr = array.slice();
        var index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },

    clone: function (array) {
        var arr = array.slice();
        return arr;
    },

    shuffle: function (array) {
        var arr = array.slice();
        var currentIndex = arr.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    },
    getRandom: function (array) {
        var randId = Math.floor(array.length * Math.random());
        return array[randId];
    }
}
var DObject = {
    clone: function (object) {
        return JSON.parse(JSON.stringify(object));
    },

    merge: function (object, toObject) {
        var obj = DObject.clone(toObject);
        for (var key in object) {
            var val = object[key];
            obj[key] = val;
        }
        return obj;
    }
}

function ExplosionConfetti(options) {
    var _options = {
        amount: 10,
        rate: 2,
        radius: 600,
        areaWidth: 500,
        areaHeight: 500,
        fallingHeight: 500,
        fallingSpeed: 1,
        colors: [0xffffff, 0xff0000, 0xffff00]
    };
    if (options) _options = DObject.merge(options, _options);
    var scope = this;
    scope.options = _options;
    scope.particles = [];
    scope.booms = [];
    scope.options.rate = scope.options.rate / 100;
    if (scope.options.rate > 0.2) scope.options.rate = 0.2;
    this.object = new THREE.Object3D();
    var geometry = new THREE.PlaneBufferGeometry(1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    this.init = function () { };
    this.explode = function () {
        var boom = new THREE.Object3D();
        boom.life = DMath.randomFromTo(500, 500);
        boom.position.x = (10 * Math.random()) - 5;
        boom.position.y = 1;
        boom.position.z = -30;
        scope.object.add(boom);
        scope.booms.push(boom);
        for (var i = 0; i < scope.options.amount; i++) {
            var material = new THREE.MeshBasicMaterial({ color: DArray.getRandom(scope.options.colors), transparent: true, side: THREE.DoubleSide });
            var particle = new THREE.Mesh(geometry, material);
            boom.add(particle);
            particle.life = 1;
            particle.destination = {};
            particle.destination.x = (Math.random() - 0.5) * (scope.options.radius * 2) * Math.random();
            particle.destination.y = (Math.random() - 0.5) * (scope.options.radius * 2) * Math.random();
            particle.destination.z = (Math.random() - 0.5) * (scope.options.radius * 2) * Math.random();
            particle.rotation.x = DMath.random(360);
            particle.rotation.y = DMath.random(360);
            particle.rotation.z = DMath.random(360);
            var size = DMath.randomFromTo(2, 5) * .1;
            particle.scale.x = size;
            particle.scale.y = size;
            particle.rotateSpeedX = DMath.randomPlusMinus(0.4);
            particle.rotateSpeedY = DMath.randomPlusMinus(0.4);
            particle.rotateSpeedZ = DMath.randomPlusMinus(0.4);
        }
        boom.dispose = function () {
            for (var i = 0; i < boom.children.length; i++) {
                var particle = boom.children[i];
                particle.material.dispose();
                particle.geometry.dispose();
                boom.remove(particle);
                particle = null;
            }
            boom.parent.remove(boom);
            boom = null;
        };
    };
    this.update = function () {
        if (Math.random() < scope.options.rate) scope.explode();
        var particleAmount = 0;
        for (var i = 0; i < scope.booms.length; i++) {
            var boom = scope.booms[i];
            for (var k = 0; k < boom.children.length; k++) {
                var particle = boom.children[k];
                particle.destination.y -= DMath.randomFromTo(3, 6);
                particle.life -= DMath.randomFromTo(0.005, 0.01);
                var speedX = (particle.destination.x - particle.position.x) / 80;
                var speedY = (particle.destination.y - particle.position.y) / 80;
                var speedZ = (particle.destination.z - particle.position.z) / 80;
                particle.position.x += speedX;
                particle.position.y += speedY;
                particle.position.z += speedZ;
                particle.rotation.y += particle.rotateSpeedY;
                particle.rotation.x += particle.rotateSpeedX;
                particle.rotation.z += particle.rotateSpeedZ;
                if (particle.position.y < -scope.options.fallingHeight) {
                    particle.material.dispose();
                    particle.geometry.dispose();
                    boom.remove(particle);
                    particle = null;
                }
            }
            if (boom.children.length <= 10) {
                boom.dispose();
                scope.booms = DArray.remove(boom, scope.booms);
            }
            particleAmount += boom.children.length;
        }
    };
    this.dispose = function () {
        for (var i = 0; i < scope.particles.length; i++) {
            var particle = scope.particles[i];
            particle.material.dispose();
            particle.geometry.dispose();
            scope.object.remove(particle);
            particle = null;
        }
        scope.object.parent.remove(scope.object);
        scope.object = null;
        scope.update = function () { };
    };
    return this;
}




var stars, particles;
function Particle(scene) {
    starGeo = new THREE.Geometry();
    for (let i = 0; i < 500; i++) {
        let star = new THREE.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * (- 300)
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
    }
    let starMaterial = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 0.1,
    });
    stars = new THREE.Points(starGeo, starMaterial);

    scene.add(stars);
    setupScene(scene);
}
function aniparticle() {
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.z += p.velocity;

        if (p.z > 0) {
            p.z = -200;
            p.velocity = 0;
        }
    });

    starGeo.verticesNeedUpdate = true;
    particles.children.forEach(p => {

        p.velocity += p.acceleration;
        p.position.z += p.velocity;

        if (p.position.z > 50) {
            p.position.z = -200;
            p.velocity = 0;
        }
    })
}

var MAX = 500;
function setupScene(scene) {
    particles = new THREE.Group()
    const geo = new THREE.BoxBufferGeometry(.01, .01, 20)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    for (let i = 0; i < MAX; i++) {
        const particle = new THREE.Mesh(geo, mat)
        particle.position.x = Math.random() * 20 - 10;
        particle.position.z = -(Math.random() * 550);
        particle.position.y = Math.random() * 20 - 10;
        particle.velocity = 0;
        particle.acceleration = 0.02;
        particles.add(particle);
    }
    particles.position.z = -40;
    scene.add(particles);
    particles.visible = false;
    stars.visible = false;
}