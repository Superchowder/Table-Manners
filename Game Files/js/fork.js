function Fork(game, food, initx, inity, foodx, foody, key) {
    Phaser.Sprite.call(this, game, initx, inity, key);
    this.initx = initx;
    this.inity = inity;
    this.clockwise = true;
    this.enableCollision = true;
    this.speedFactor = 0;
    this.anchor.setTo(0.5, 0.5);
    this.foodx = foodx;
    this.foody = foody;
    this.food = food;
    this.canShoot = false;
    this.isReturning;
    this.up = true;
    game.physics.arcade.enable(this);
    this.body.setSize(30, 30, 0, 71.5);


    this.body.gravity.y = 0;
    //fork.body.collideWorldBounds = true;
    this.body.allowRotation = true;
    this.angle = 0;

    game.add.existing(this);
}

Fork.prototype = Object.create(Phaser.Sprite.prototype);
Fork.prototype.constructor = Fork;

Fork.prototype.rotate = function() {
    if (this.angle < 110 && this.clockwise) {
        this.angle += 8;
    } else if (this.angle >= 110 && this.clockwise) {
        this.clockwise = false;
    } else if (this.angle > -110 && !this.clockwise) {
        this.angle -= 8;
    } else {
        this.clockwise = true;
    }

    let temp = (this.angle + 90) * (Math.PI / 180);
    let x = Math.cos(temp) * 45;
    let y = Math.sin(temp) * 45;

    if (this.angle < 0) {
        this.body.setSize(30, 30, -x, -y + 69.5);
    } else {
        this.body.setSize(30, 30, -x, -y + 69.5);
    }
}

//returns the fork to the original position over 60 frames  and 1 second
Fork.prototype.returnFork = function() {
    if (!this.isReturning) {
        console.log("returnFork");
        let i = 60;
        this.isReturning = true;
        let xDif = (this.x - this.initx);
        let yDif = (this.y - this.inity);
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.game.time.events.repeat(1000 / 60, 60, () => {
            let xPos = xDif / i;
            let yPos = yDif / i;
            xDif -= xPos;
            yDif -= yPos;
            i--;
            this.x -= xPos;
            this.y -= yPos;
        }, this);

        //fix
        this.game.time.events.add(1030, () => {
            this.speedFactor = 0;
            this.x = this.initx;
            this.y = this.inity;
            this.canShoot = false;
            this.isReturning = false;
        }, this);
    }
}

Fork.prototype.forkMovement = function() {
    this.game.physics.arcade.velocityFromAngle(this.angle + 90, -5 * this.speedFactor, this.body.velocity);
    game.time.events.add(1000, this.returnFork, this);

}

Fork.prototype.isStartPos = function() {
    return (this.x === this.initx && this.y === this.inity);
}

Fork.prototype.isFoodOnPlate = function() {
    return (this.food.x === this.foodx && this.food.y === this.foody);
}

//moves all objects upon collision and plays collision sound
Fork.prototype.collision = function() {
    this.enableCollision = false;
    this.returnFork();
    window.returnFood(this.foodx, this.foody);

}

Fork.prototype.powerBar = function() {
    if (this.speedFactor < 99 && this.up) {
        this.speedFactor += 3;
    } else if (this.speedFactor >= 99 && this.up) {
        this.up = false;
    } else if (this.speedFactor > 3 && !this.up) {
        this.speedFactor -= 3;
    } else {
        this.up = true;
    }
}