class Cricle {
    constructor() {
        this.reset();
    }
    reset() {
        var rand = Math.random() * 2 > 1 ? 1 : -1;
        this.sx = (Math.random() * .2 + .2) * rand;
        rand = Math.random() * 2 > 1 ? 1 : -1;
        this.sy = (Math.random() * .2 + .2) * rand;
    }
}