function Fork(game, food, initx, inity,foodx, foody, key){
	Phaser.Sprite.call(this, game, initx, inity, key);
	this.initx = initx;
	this.inity = inity;
	this.clockwise = true;
	this.enableCollision = true;
	this.didCollide = false;
	this.speedFactor = 0;
	this.anchor.setTo(0.5, 0.5);
	this.foodx = foodx;
	this.foody = foody;
	this.food = food;
	game.add.existing(this);
}

Fork.prototype = Object.create(Phaser.Sprite.prototype);
Fork.prototype.constructor = Fork;

Fork.prototype.rotation() {
    if (this.angle < 110 && this.clockwise) {
        this.angle += 8;
    } else if (this.angle >= 110 && this.clockwise) {
        this.clockwise = false;
    } else if (this.angle > -110 && !this.clockwise) {
        this.angle -= 8;
    } else {
        this.clockwise = true;
    }
}

//returns the fork to the original position over 60 frames  and 1 second
Fork.prototype.returnFork() {
    if (!didCollide) {
        let i = 60;
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
        this.game.time.events.add(1000, () => {
            this.speedFactor = 0;
            powerBarHelper = true;
            enableObstacleCollide = true;
        }, this);
    }
}

Fork.prototype.forkMovement() {
    this.game.physics.arcade.velocityFromAngle(this.angle + 90, -5 * this.speedFactor, this.body.velocity);
    game.time.events.add(1000, this.returnFork, this);

}

Fork.prototype.isStartPos(){
	return (this.x == this.initx && this.y == this.inity);
}

Fork.prototype.isFoodOnplate(){
	return (this.food.x == this.foodx && this.food.y == this.foody);
}

//moves all objects upon collision and plays collision sound
Fork.prototype.collision() {
    this.enableCollision = false;
    yelp.play();
    this.returnFork();
    window.returnFood(this.foodx, this.foody);
    this.didCollide = true;

}