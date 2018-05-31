var game = new Phaser.Game(800, 850, Phaser.AUTO);
var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        //loads in text and audio
        game.load.audio('music', 'assets/audio/GameSound.mp3');
        game.load.audio('yelp', 'assets/audio/ouch.mp3');
    },
    create: function() {
        title = this.add.text(150, 50, 'Table', { fontSize: '120px', fill: '#8e8e8d', stroke: 'black' });
        title2 = this.add.text(150, 160, 'Manners', { fontSize: '120px', fill: '#8e8e8d' });
        this.add.text(230, 500, 'Instructions:', { fontSize: '50px', fill: 'black' });
        this.add.text(150, 630, 'Press S  OR  DOWN   to charge', { fontSize: '30px', fill: 'black' });
        this.add.text(150, 570, 'Press W OR  UP         to throw out fork', { fontSize: '30px', fill: 'black' });
        this.add.text(150, 600, 'Press A  OR  LEFT     to eat', { fontSize: '30px', fill: 'black' });
        this.add.text(150, 700, 'Press ENTER to START', { fontSize: '45px', fill: 'black' });
        title.stroke = '#000000';
        title.strokeThickness = 8;
        title2.stroke = '#000000';
        title2.strokeThickness = 8;
        p1_wins = 0;
        p2_wins = 0;
        roundCount = 0;

        game.stage.backgroundColor = "#a37041";
    },
    update: function() {
        //changes states
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('Round');
        }
    }
}

var Round = function(game) {};
Round.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';
        game.load.image('table', 'table.png');
        game.load.image('fork', 'fork.png');
        game.load.image('food', 'sushiroll.png');
        game.load.image('Icon', 'myMeat.png');
        game.load.image('food2', 'watermelon.png');
        game.load.image('food3', 'bread.png');
        game.load.image('bar', 'PowerBar.png');
        game.load.image('barTop', 'PowerBarTop.png');


    },
    create: function() {
        table = game.add.sprite(0, 0, 'table');
        food = game.add.sprite(395, 270, 'food');
        food1 = game.add.sprite(1000, 100000, 'food');
        fork = game.add.sprite(100, 600, 'fork');
        fork2 = game.add.sprite(600, 600, 'fork');
        winIcon = game.add.sprite(3000, 80, 'Icon');
        winIcon2 = game.add.sprite(3000, 80, 'Icon');
        winIcon3 = game.add.sprite(3000, 80, 'Icon');
        winIcon4 = game.add.sprite(3000, 80, 'Icon');
        winIcon.anchor.setTo(0.5, 0.5);
        winIcon2.anchor.setTo(0.5, 0.5);
        winIcon3.anchor.setTo(0.5, 0.5);
        winIcon4.anchor.setTo(0.5, 0.5);
        fork2.anchor.setTo(0.5, 0.5);
        fork.anchor.setTo(0.5, 0.5);
        food.anchor.setTo(0.5, 0.5);
        food1.anchor.setTo(0.5, 0.5);
        TimerText = game.add.text(400, 60, '30', { fontSize: '120px', fill: '#48f442' });
        TimerText.scale.set(.5);
        TimerText.stroke = '#000000';
        TimerText.strokeThickness = 5;
        TimerText.anchor.set(.5);

        if (p1_wins == 1) {
            winIcon.x = 130;
        }

        if (p1_wins == 2) {
            winIcon2.x = 160;
            winIcon.x = 130;
        }

        if (p2_wins == 1) {
            winIcon3.x = 715;
        }

        if (p2_wins == 2) {
            winIcon4.x = 745;
            winIcon3.x = 715;
        }

        scoreText = game.add.text(16, 16, 'P1 Score: 0', { fontSize: '32px', fill: '#000' });
        powerText = game.add.text(10, 750, 'Power: 0', { fontSize: '32px', fill: '#000' });
        scoreText2 = game.add.text(600, 16, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
        powerText2 = game.add.text(550, 750, 'Power: 0', { fontSize: '32px', fill: '#000' });
        WinText = game.add.text(16, 60, 'Wins: ', { fontSize: '32px', fill: '#000' });
        WinText = game.add.text(600, 60, 'Wins: ', { fontSize: '32px', fill: '#000' });
        RoundText = game.add.text(400, 350, 'Round ' + (roundCount + 1), { fontSize: '140px', fill: '#c10f09' });

        if (lastWinner) {
            WinnerText = game.add.text(400, 350, 'PLAYER 1 WINS! ', { fontSize: '70px', fill: '#c10f09' });
        } else {
            WinnerText = game.add.text(400, 350, 'PLAYER 2 WINS! ', { fontSize: '70px', fill: '#c10f09' });
        }
        WinnerText.anchor.set(.5);
        WinnerText.stroke = '#000000';
        WinnerText.strokeThickness = 5;
        WinnerText.alpha = 0;
        RoundText.scale.set(.5);

        RoundText.anchor.set(.5);
        RoundText.stroke = '#000000';
        RoundText.strokeThickness = 5;
        RoundText.alpha = 0;

        if (roundCount == 0) {
            WinnerText.text = "GET READY!";
        }

        this.add.tween(WinnerText).to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, true);

        game.time.events.add(1500, () => {
            this.add.tween(WinnerText).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(2500, () => {
            this.add.tween(RoundText).to({
                alpha: 1
            }, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(4000, () => {
            this.add.tween(RoundText).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true);
        }, this);

        game.time.events.add(5000, () => {
            game.state.start('GamePlay');
        }, this);

        game.stage.backgroundColor = "#a37041";
    },
    update: function() {
        //changes states

    }
}

//variable to affect speed of power
var speedFactor;
var speedFactor2;
var up;
var maxSpeed = 100;
var clockwise;
var clockwise2;
var origPos;
var origPos2;
var foodEat;
var foodEat2;
var enableObstacleCollide;
var enableObstacleCollide2;
var didCollide;
var didCollide2;
var score;
var score2;
var rainbowOn;
var time;
var breaker;
var w;
var timerEvents = [];
var timerEvents2 = [];
var alreadyPulled;
var p1_wins;
var p2_wins;
var rainbow;
var lastWinner;
var powerBarHelper;
var shoot;
var width;
var x;
var y;


//ends game
function endGame(player, box) {
    game.state.start('GameOver')
}

//rotates the fork from clockwise to counter clockwise
function rotation() {
    if (fork.angle < 110 && clockwise) {
        fork.angle += 1;
    } else if (fork.angle >= 110 && clockwise) {
        clockwise = false;
    } else if (fork.angle > -110 && !clockwise) {
        fork.angle -= 1;
    } else {
        clockwise = true;
    }
}

function powerBar() {
    if (speedFactor < 100 && up) {
        speedFactor += 2;
    } else if (speedFactor >= 100 && up) {
        up = false;
    } else if (speedFactor > 0 && !up) {
        speedFactor -= 2;
    } else {
        up = true;
    }
}

function rotation2() {
    if (fork2.angle < 110 && clockwise2) {
        fork2.angle += 8;
    } else if (fork2.angle >= 110 && clockwise2) {
        clockwise2 = false;
    } else if (fork2.angle > -110 && !clockwise2) {
        fork2.angle -= 8;
    } else {
        clockwise2 = true;
    }
}


//returns the fork to the original position over 60 frames  and 1 second
function returnFork() {
    if (!didCollide) {
        let i = 60;
        let xDif = (fork.x - 100);
        let yDif = (fork.y - 600);
        fork.body.velocity.x = 0;
        fork.body.velocity.y = 0;
        game.time.events.repeat(1000 / 60, 60, () => {
            let xPos = xDif / i;
            let yPos = yDif / i;
            xDif -= xPos;
            yDif -= yPos;
            i--;
            fork.x -= xPos;
            fork.y -= yPos;
        }, this);

        game.time.events.add(1000, () => {
            origPos = true;
            speedFactor = 0;
            powerBarHelper = true;
        }, this);
    }
}

function returnFork2() {
    if (!didCollide2) {
        let i = 60;
        let xDif = (fork2.x - 600);
        let yDif = (fork2.y - 600);
        fork2.body.velocity.x = 0;
        fork2.body.velocity.y = 0;
        game.time.events.repeat(1000 / 60, 60, () => {
            let xPos = xDif / i;
            let yPos = yDif / i;
            xDif -= xPos;
            yDif -= yPos;
            i--;
            fork2.x -= xPos;
            fork2.y -= yPos;
        }, this);

        game.time.events.add(1000, () => {
            origPos2 = true;
            speedFactor2 = 0;
        }, this);
    }

}

//moves the food to the plate 300 550
//check and see if already pulled or not?
//pool[w] increase w each pass through then change it back to 0 at end of pull
//game.time.events.remove(pool[w])
function returnFood(x, y) {
    w++;
    if (alreadyPulled) {
        w = 1;
        game.time.events.remove(timerEvents[w]);
        game.time.events.remove(timerEvents2[w]);
        foodEat = false;
        foodEat2 = false;
    }
    alreadyPulled = true;
    let i = 60;
    let xDif = (food.x - x);
    let yDif = (food.y - y);
    food.body.velocity.x = 0;
    food.body.velocity.y = 0;
    timerEvents[w] = game.time.events.repeat(1000 / 60, 60, () => {
        if (!breaker) {
            let xPos = xDif / i;
            let yPos = yDif / i;
            xDif -= xPos;
            yDif -= yPos;
            i--;
            food.x -= xPos;
            food.y -= yPos;
        }

    }, this);


    timerEvents2[w] = game.time.events.add(1200, () => {
        w = 0;
        alreadyPulled = false;
        if (x == 165) {
            foodEat = true;
            foodEat2 = false;
        } else {
            foodEat2 = true;
            foodEat = false;
        }
    }, this);

}

//moves the fork at the angle that it is being rotated at
function forkMovement() {
    let temp = fork.angle * (Math.PI / 180);
    x = Math.sin(temp) * 65;
    y = Math.cos(temp) * 65;
    console.log("angle: " + fork.angle);
    console.log("x: " + x);
    console.log("y: " + y);
    x = 0;
    y = 0;

    if (fork.angle < 0) {
        fork.body.setSize(30, 30, -x, y);
    } else {
        fork.body.setSize(30, 30, x, y);
    }



    game.physics.arcade.velocityFromAngle(fork.angle + 90, -5 * speedFactor, fork.body.velocity);
    origPos = false;
    game.time.events.add(1000, returnFork, this);

}

//moves the fork at the angle that it is being rotated at
function forkMovement2() {
    game.physics.arcade.velocityFromAngle(fork2.angle + 90, -5 * speedFactor2, fork2.body.velocity);
    origPos2 = false;
    game.time.events.add(1000, returnFork2, this);

}

//moves all objects upon collision and plays collision sound
function collision() {
    console.log('collision detected');
    foodEat2 = false;
    enableObstacleCollide = false;
    yelp.play();
    returnFork();
    returnFood(165, 680);
    didCollide = true;
    food.body.velocity.x = 0;
    food.body.velocity.y = 0;

}

//moves all objects upon collision and plays collision sound
function collision2() {
    enableObstacleCollide2 = false;
    foodEat = false;
    yelp.play();
    returnFork2();
    returnFood(620, 670);
    didCollide2 = true;
    food.body.velocity.x = 0;
    food.body.velocity.y = 0;

}


//helper function for collision 
function collisionDetect() {
    return enableObstacleCollide;
}

function collisionDetect2() {
    return enableObstacleCollide2;
}

function rainbowMaker() {
    rainbowOn = true;
    if (TimerText.fill == 'red') {
        TimerText.fill = 'orange';
    } else if (TimerText.fill == 'orange') {
        TimerText.fill = 'yellow';
    } else if (TimerText.fill == 'yellow') {
        TimerText.fill = '#48f442';
    } else if (TimerText.fill == '#48f442') {
        TimerText.fill = 'blue';
    } else if (TimerText.fill == 'blue') {
        TimerText.fill = 'purple';
    } else {
        TimerText.fill = 'red';
    }
}

function changeTime() {
    if (time > 0) {
        time--;
        TimerText.text = time;
        TimerText.fill = '#48f442';
        if (time < 11 && time > 5) {
            TimerText.fill = 'orange';
        } else if (time < 6) {
            this.add.tween(TimerText.scale).to({
                x: 1,
                y: 1
            }, 500, 'Linear', true, 0, -1, true);
            TimerText.fill = 'red';
        }
    } else if (score == score2) {
        TimerText.text = 'OVERTIME!';
        if (!rainbowOn) {
            rainbow = game.time.events.loop(75, rainbowMaker, this);
        }
    } else {
        gameMusic.stop();
        if (score > score2) {
            p1_wins++;
            lastWinner = true;
            roundCount++;
        } else {
            p2_wins++;
            lastWinner = false;
            roundCount++;
        }
        console.log('player 1 wins: ' + p1_wins);

        if (p1_wins > 2 || p2_wins > 2) {
            console.log('GAME SHOULD HAVE ENDED');
            game.state.start('GameOver');
        } else {
            game.state.start('Round');
        }

    }

}


var GamePlay = function(game) {};
GamePlay.prototype = {
    preload: function() {
        table = game.add.sprite(0, 0, 'table');
        game.time.advancedTiming = true;
    },
    create: function() {

        //audio
        gameMusic = game.add.audio('music');
        gameMusic.play(.4);
        gameMusic.loopFull(.4);
        yelp = game.add.audio('yelp');
        speedFactor = 0;
        //adds all sprites

        food = game.add.sprite(395, 270, 'food');
        food1 = game.add.sprite(1000, 100000, 'food');
        fork = game.add.sprite(100, 600, 'fork');
        fork2 = game.add.sprite(600, 600, 'fork');
        food2 = game.add.sprite(10000, 10000, 'food2');
        food3 = game.add.sprite(10000, 10000, 'food3');
        bar = game.add.sprite(55, 800, 'bar');
        barTop = game.add.sprite(55, 800, 'barTop');
        width = bar.width;

        winIcon = game.add.sprite(3000, 80, 'Icon');
        winIcon2 = game.add.sprite(3000, 80, 'Icon');
        winIcon3 = game.add.sprite(3000, 80, 'Icon');
        winIcon4 = game.add.sprite(3000, 80, 'Icon');


        game.physics.arcade.enable(fork);
        game.physics.arcade.enable(fork2);
        game.physics.arcade.enable(food);
        game.physics.arcade.enable(food2);
        game.physics.arcade.enable(food3);
        game.physics.arcade.enable(food1);

        fork.body.setSize(30, 30, 0, 71.5);

        food.anchor.setTo(0.5, 0.5);
        food2.anchor.setTo(0.5, 0.5);
        food3.anchor.setTo(0.5, 0.5);
        food1.anchor.setTo(0.5, 0.5);

        winIcon.anchor.setTo(0.5, 0.5);
        winIcon2.anchor.setTo(0.5, 0.5);
        winIcon3.anchor.setTo(0.5, 0.5);
        winIcon4.anchor.setTo(0.5, 0.5);


        fork.body.gravity.y = 0;
        fork.body.collideWorldBounds = true;
        fork.body.allowRotation = true;
        fork.angle = 0;
        fork.anchor.setTo(0.5, 0.5);

        fork2.body.gravity.y = 0;
        fork2.body.collideWorldBounds = true;
        fork2.body.allowRotation = true;
        fork2.angle = 0;
        fork2.anchor.setTo(0.5, 0.5);


        y = 0;
        x = 0;
        breaker = false;
        clockwise = true;
        up = true;
        powerBarHelper = true;
        clockwise2 = true;
        origPos = true;
        origPos2 = true;
        enableObstacleCollide = true;
        enableObstacleCollide2 = true;
        didCollide = false;
        didCollide2 = false;
        foodEat = false;
        foodEat2 = false;
        score = 0;
        score2 = 0;
        speedFactor = 0;
        speedFactor2 = 0;
        time = 30;
        alreadyPulled = false;
        lastWinner = false;
        shoot = false;
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        powerText = game.add.text(10, 750, 'Power: 0', { fontSize: '32px', fill: '#000' });
        scoreText2 = game.add.text(600, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        powerText2 = game.add.text(550, 750, 'Power: 0', { fontSize: '32px', fill: '#000' });
        TimerText = game.add.text(400, 60, '30', { fontSize: '120px', fill: '#48f442' });
        WinText = game.add.text(16, 60, 'Wins: ', { fontSize: '32px', fill: '#000' });
        WinText = game.add.text(600, 60, 'Wins: ', { fontSize: '32px', fill: '#000' });
        TimerText.scale.set(.5);
        TimerText.stroke = '#000000';
        TimerText.strokeThickness = 5;
        TimerText.anchor.set(.5);
        game.time.events.loop(Phaser.Timer.SECOND, changeTime, this);
        rainbowOn = false;

        if (p1_wins == 1) {
            winIcon.x = 130;
        }

        if (p1_wins == 2) {
            winIcon2.x = 160;
            winIcon.x = 130;
        }

        if (p2_wins == 1) {
            winIcon3.x = 715;
        }

        if (p2_wins == 2) {
            winIcon4.x = 745;
            winIcon3.x = 715;
        }



    },


    update: function() {
        scoreText.text = 'P1 Score: ' + score;
        powerText.text = 'P1 Power: ' + speedFactor;
        scoreText2.text = 'P2 Score: ' + score2;
        powerText2.text = 'P2 Power: ' + speedFactor2;

        var cursors = game.input.keyboard.createCursorKeys();

        let temp = (fork.angle + 90) * (Math.PI / 180);
        x = Math.cos(temp) * 45;
        y = Math.sin(temp) * 45;
        console.log("y: " + y);

        if (fork.angle < 0) {
            fork.body.setSize(30, 30, -x, -y + 69.5);
        } else {
            fork.body.setSize(30, 30, -x, -y + 69.5);
        }



        //charges the power "bar"
        if (cursors.down.isDown) {
            if (speedFactor2 < maxSpeed) {
                speedFactor2 += 1;

            }
        }
        //charges the power "bar"
        if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            powerBarHelper = false;
            shoot = true;
        }

        if (powerBarHelper) {
            powerBar();
            shoot = false;
        }

        bar.width = width * (speedFactor / 100);


        //moves fork based on power level
        if (cursors.up.justDown && origPos2) {
            if (speedFactor2 > 1) {
                forkMovement2();
                didCollide2 = false;
            }
        }

        //moves fork based on power level
        if (game.input.keyboard.isDown(Phaser.Keyboard.W) && origPos && shoot) {
            if (speedFactor > 1) {
                forkMovement();
                didCollide = false;
            }
        }

        //checks for collision
        game.physics.arcade.collide(fork, food, collision, collisionDetect);
        game.physics.arcade.collide(fork2, food, collision2, collisionDetect2);
        game.physics.arcade.overlap(fork, fork2);


        //allows the player to eat food if its on their plate
        if ((game.input.keyboard.isDown(Phaser.Keyboard.A) && foodEat) || (cursors.left.isDown && foodEat2)) {
            //food.x = 330;
            //food.y = 220;
            food.kill();

            if (foodEat) {
                score += 10;
            } else {
                score2 += 10;
            }


            didCollide = false;
            didCollide2 = false;
            foodEat = false;
            foodEat2 = false;
            game.time.events.add(1000, () => {
                let r = game.rnd.integerInRange(1, 3);
                console.log(r);
                if (r == 1) {
                    food = food1;
                } else if (r == 2) {
                    food = food2;
                } else {
                    food = food3;
                }
                food.x = 395;
                food.y = 270;
                food.revive();
            }, this);

            game.time.events.add(1500, () => {
                enableObstacleCollide = true;
                enableObstacleCollide2 = true;
            }, this);

        }

        //only rotates the fork if its in the original position
        if (origPos) {
            rotation();
        }

        if (origPos2) {
            rotation2();
        }

        //changes game state
    },

    render: function() {
        game.debug.body(fork);
        game.debug.body(fork2);
        game.debug.body(food);
        game.debug.text('FPS: ' + game.time.fps || 'FPS: -- ', 40, 40, "#00ff00");

        //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
        //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

    }


}

var GameOver = function(game) {};
GameOver.prototype = {
    preload: function() {},
    create: function() {
        this.add.text(200, 300, 'Game Over', { fontSize: '80px', fill: 'white' });
        this.add.text(200, 400, 'Try Again?', { fontSize: '80px', fill: 'black' });
        this.add.text(200, 600, 'Press R to try again', { fontSize: '40px', fill: 'black' });
        this.add.text(200, 640, 'or  ENTER to go to Main Menu', { fontSize: '40px', fill: 'black' });
        if (p1_wins > p2_wins) {
            this.add.text(150, 100, 'Player 1 WINS!', { fontSize: '80px', fill: 'black' });
        } else {
            this.add.text(150, 100, 'Player 2 WINS!', { fontSize: '80px', fill: 'black' });
        }
        game.stage.backgroundColor = "#bb11ee";
    },
    update: function() {
        //moves to main menu state
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            roundCount = 0;
            game.state.start('Round');
        }
    }
}


game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.add('Round', Round);
game.state.start('MainMenu');