class Player {
    constructor() {
        this.pivot = null;
        this.plan = null;
        this.life = 3;
    }
    Setplayer(x, scalx, rot) {
        this.plan.scale.y = scalx;
        this.plan.position.y = this.plan.scale.y / 2;
        this.pivot.position.set(x, -35, 0);
        this.pivot.rotation.set(0, 0, rot);
    }
    Update(scalx, rot) {
        this.plan.scale.y = scalx;
        this.plan.position.y = this.plan.scale.y / 2;
        this.pivot.rotation.set(0, 0, rot);
    }
}