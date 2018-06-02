var game = new Phaser.Game(800, 850, Phaser.AUTO);
var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        //loads in text and audio
        game.load.audio('music', 'assets/audio/GameSound.mp3');
        game.load.audio('yelp', 'assets/audio/ouch.mp3');
        game.load.image('banner', 'assets/img/TM_logo.png');
        game.load.image('rated', 'assets/img/rated.jpg');
        game.load.image('background', 'assets/img/background.jpg');
        game.load.image('start', 'assets/img/plateStart.png');
        game.load.image('settings', 'assets/img/plateControls.png');
        game.load.image('leaderboard', 'assets/img/plateLead.png');
        game.load.image('fork', 'assets/img/fork.png');
    },
    create: function() {

        background = game.add.sprite(0, 0, 'background');
        banner = game.add.sprite(game.world.centerX, 250, 'banner');
        banner.anchor.setTo(0.5, 0.5);
        //rated = game.add.sprite(60, 770, 'rated');
        //rated.anchor.setTo(0.5, 0.5);

        copyright = game.add.text(game.world.centerX, 830, '©2018 HungryBois Inc.', { fontSize: '40px', fill: 'white' });
        copyright.anchor.setTo(0.5, 0.5);
        copyright.scale.set(.40);

        shadow = game.add.sprite(game.world.centerX - 220, 393, 'fork');
        shadow.alpha = 0.6;
        shadow.tint = 0x000000;
        shadow.angle = 90;
        fork = game.add.sprite(game.world.centerX - 225, 390, 'fork');
        fork.angle = 90;
        fork.anchor.setTo(0.5, 0.5);
        shadow.anchor.setTo(0.5, 0.5);

        shadow2 = game.add.sprite(game.world.centerX + 220, 393, 'fork');
        shadow2.alpha = 0.6;
        shadow2.tint = 0x000000;
        shadow2.angle = -90;
        fork2 = game.add.sprite(game.world.centerX + 225, 390, 'fork');
        fork2.angle = -90;
        fork2.anchor.setTo(0.5, 0.5);
        shadow2.anchor.setTo(0.5, 0.5);

        start = game.add.sprite(game.world.centerX, 400, 'start');
        start.anchor.setTo(0.5, 0.5);
        settings = game.add.sprite(game.world.centerX, 535, 'settings');
        settings.anchor.setTo(0.5, 0.5);
        lead = game.add.sprite(game.world.centerX, 670, 'leaderboard');
        lead.anchor.setTo(0.5, 0.5);

        start.events.onInputOver.add(() => {
            fork.y = 390;
            shadow.y = 393;
            fork2.y = 390;
            shadow2.y = 393;
            menu = 1;
        });

        start.inputEnabled = true;
        start.events.onInputDown.add(() => {
            game.state.start('Round');
        });

        settings.events.onInputOver.add(() => {
            fork.y = 530;
            shadow.y = 533;
            fork2.y = 530;
            shadow2.y = 533;
            menu = 2;
        });

        settings.inputEnabled = true;
        settings.events.onInputDown.add(() => {
            game.state.start('Controls');
        });

        lead.events.onInputOver.add(() => {
            fork.y = 670;
            shadow.y = 673;
            fork2.y = 670;
            shadow2.y = 673;
            menu = 3;
        });

        lead.inputEnabled = true;
        lead.events.onInputDown.add(() => {
            game.state.start('Leaderboard');
        });



        p1_wins = 0;
        p2_wins = 0;
        roundCount = 0;
        menu = 1;

        game.stage.backgroundColor = "#a37041";
    },
    update: function() {
        var cursors = game.input.keyboard.createCursorKeys();

        if (cursors.down.justDown && menu < 3) {
            fork.y += 140;
            shadow.y += 140;
            fork2.y += 140;
            shadow2.y += 140;
            menu++;
        }

        if (cursors.up.justDown && menu > 1) {
            fork.y -= 140;
            shadow.y -= 140;
            fork2.y -= 140;
            shadow2.y -= 140;
            menu--;
        }

        //changes states
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && menu == 1) {
            game.state.start('Round');
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && menu == 2) {
            game.state.start('Controls');
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && menu == 3) {
            game.state.start('Leaderboard');
        }
    }
}





var Controls = function(game) {};
Controls.prototype = {
    preload: function() {
        background = game.add.sprite(0, 0, 'background');
    },
    create: function() {

        controlText = game.add.text(game.world.centerX, 200, 'Controls', { fontSize: '120px', fill: '#48f442' });
        controlText.anchor.setTo(0.5, 0.5);
        game.stage.backgroundColor = "#a37041";
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }

    }
}

var Leaderboard = function(game) {};
Leaderboard.prototype = {
    preload: function() {
        background = game.add.sprite(0, 0, 'background');
    },
    create: function() {

        controlText = game.add.text(game.world.centerX, 200, 'LeaderBoard', { fontSize: '120px', fill: '#48f442' });
        controlText.anchor.setTo(0.5, 0.5);
        game.stage.backgroundColor = "#a37041";
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }

    }
}





var Round = function(game) {};
Round.prototype = {
    preload: function() {
        game.load.path = 'assets/img/';
        game.load.image('table', 'table2.png');
        game.load.image('food', 'sushiroll.png');
        game.load.image('Icon', 'myMeat.png');
        game.load.image('food2', 'watermelon.png');
        game.load.image('food3', 'bread.png');
        game.load.image('bar', 'PowerBar.png');
        game.load.image('barTop', 'PowerBarTop.png');
        game.load.image('barBottom', 'PowerBarBottom.png');


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
        powerText = game.add.text(30, 750, 'Telekinetic Power', { fontSize: '32px', fill: 'white' });
        scoreText2 = game.add.text(600, 16, 'P2 Score: 0', { fontSize: '32px', fill: '#000' });
        powerText2 = game.add.text(490, 750, 'Telekinetic Power', { fontSize: '32px', fill: 'white' });
        WinText = game.add.text(16, 60, 'Wins: ', { fontSize: '32px', fill: '#000' });
        WinText = game.add.text(600, 60, 'Wins: ', { fontSize: '32px', fill: '#000' });
        RoundText = game.add.text(400, 350, 'Round ' + (roundCount + 1), { fontSize: '140px', fill: '#c10f09' });
        powerText.stroke = 'black';
        powerText.strokeThickness = 8;
        powerText2.stroke = 'black';
        powerText2.strokeThickness = 8;

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
var up2;
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
var powerBarHelper2;
var shoot;
var shoot2;
var width;
var width2;
var x;
var y;
var foodInPlay;
var menu;


//ends game
function endGame(player, box) {
    game.state.start('GameOver')
}

//rotates the fork from clockwise to counter clockwise
function rotation() {
    if (fork.angle < 110 && clockwise) {
        fork.angle += 8;
    } else if (fork.angle >= 110 && clockwise) {
        clockwise = false;
    } else if (fork.angle > -110 && !clockwise) {
        fork.angle -= 8;
    } else {
        clockwise = true;
    }
}

function powerBar() {
    if (speedFactor < 99 && up) {
        speedFactor += 3;
    } else if (speedFactor >= 99 && up) {
        up = false;
    } else if (speedFactor > 3 && !up) {
        speedFactor -= 3;
    } else {
        up = true;
    }
}

function powerBar2() {
    if (speedFactor2 < 99 && up2) {
        speedFactor2 += 3;
    } else if (speedFactor2 >= 99 && up2) {
        up2 = false;
    } else if (speedFactor2 > 3 && !up2) {
        speedFactor2 -= 3;
    } else {
        up2 = true;
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
            enableObstacleCollide = true;
        }, this);
    }
}

function returnFork2() {
    if (!didCollide2) {
        let i2 = 60;
        let xDif2 = (fork2.x - 600);
        let yDif2 = (fork2.y - 600);
        fork2.body.velocity.x = 0;
        fork2.body.velocity.y = 0;
        game.time.events.repeat(1000 / 60, 60, () => {
            let xPos2 = xDif2 / i2;
            let yPos2 = yDif2 / i2;
            xDif2 -= xPos2;
            yDif2 -= yPos2;
            i2--;
            fork2.x -= xPos2;
            fork2.y -= yPos2;
        }, this);

        game.time.events.add(1000, () => {
            origPos2 = true;
            speedFactor2 = 0;
            powerBarHelper2 = true;
            enableObstacleCollide2 = true;
        }, this);
    }

}

//moves the food to the plate 300 550
//check and see if already pulled or not?
//pool[w] increase w each pass through then change it back to 0 at end of pull
//game.time.events.remove(pool[w])
function returnFood(x, y) {
    console.log('return food');
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
    console.log('obstacle collision? ' + enableObstacleCollide);
    console.log('collision detected2');
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

        if (p1_wins > 2 || p2_wins > 2) {
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

        barBot = game.add.sprite(525, 790, 'barBottom');
        barBot2 = game.add.sprite(65, 790, 'barBottom');
        bar = game.add.sprite(80, 800, 'bar');
        bar2 = game.add.sprite(540, 800, 'bar');
        barTop = game.add.sprite(540, 800, 'barTop');
        barTop2 = game.add.sprite(80, 800, 'barTop');

        width = bar.width;
        width2 = bar.width;

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
        fork2.body.setSize(30, 30, 0, 71.5);

        food.anchor.setTo(0.5, 0.5);
        food2.anchor.setTo(0.5, 0.5);
        food3.anchor.setTo(0.5, 0.5);
        food1.anchor.setTo(0.5, 0.5);

        winIcon.anchor.setTo(0.5, 0.5);
        winIcon2.anchor.setTo(0.5, 0.5);
        winIcon3.anchor.setTo(0.5, 0.5);
        winIcon4.anchor.setTo(0.5, 0.5);


        fork.body.gravity.y = 0;
        //fork.body.collideWorldBounds = true;
        fork.body.allowRotation = true;
        fork.angle = 0;
        fork.anchor.setTo(0.5, 0.5);

        fork2.body.gravity.y = 0;
        //fork2.body.collideWorldBounds = true;
        fork2.body.allowRotation = true;
        fork2.angle = 0;
        fork2.anchor.setTo(0.5, 0.5);


        y = 0;
        x = 0;
        breaker = false;
        clockwise = true;
        up = true;
        up2 = true;
        powerBarHelper = true;
        powerBarHelper2 = true;
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
        shoot2 = false;
        foodInPlay = true;
        powerText = game.add.text(30, 750, 'Telekinetic Power', { fontSize: '32px', fill: 'white' });
        powerText2 = game.add.text(490, 750, 'Telekinetic Power', { fontSize: '32px', fill: 'white' });
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        scoreText2 = game.add.text(600, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        powerText.stroke = 'black';
        powerText.strokeThickness = 8;
        powerText2.stroke = 'black';
        powerText2.strokeThickness = 8;
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
        scoreText2.text = 'P2 Score: ' + score2;

        var cursors = game.input.keyboard.createCursorKeys();

        let temp = (fork.angle + 90) * (Math.PI / 180);
        x = Math.cos(temp) * 45;
        y = Math.sin(temp) * 45;

        if (fork.angle < 0) {
            fork.body.setSize(30, 30, -x, -y + 69.5);
        } else {
            fork.body.setSize(30, 30, -x, -y + 69.5);
        }

        let temp2 = (fork2.angle + 90) * (Math.PI / 180);
        let x2 = Math.cos(temp2) * 45;
        let y2 = Math.sin(temp2) * 45;

        if (fork2.angle < 0) {
            fork2.body.setSize(30, 30, -x2, -y2 + 69.5);
        } else {
            fork2.body.setSize(30, 30, -x2, -y2 + 69.5);
        }



        //charges the power "bar"
        if (cursors.down.isDown) {
            powerBarHelper2 = false;
            shoot2 = true;
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

        if (powerBarHelper2) {
            powerBar2();
            shoot2 = false;
        }

        bar.width = width * (speedFactor / 100);
        bar2.width = width2 * (speedFactor2 / 100);

        bar.tint = Math.round((1 - (speedFactor / 100) * 0xFF)) * 65536 + Math.round(((speedFactor / 100) * 0xFF)) * 256;
        bar2.tint = Math.round((1 - (speedFactor2 / 100) * 0xFF)) * 65536 + Math.round(((speedFactor2 / 100) * 0xFF)) * 256;


        //moves fork based on power level
        if (cursors.up.justDown && origPos2 && shoot2) {
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
        if (foodInPlay) {
            if ((game.input.keyboard.isDown(Phaser.Keyboard.A) && foodEat) || (cursors.left.isDown && foodEat2)) {
                foodInPlay = false;
                enableObstacleCollide = false;
                enableObstacleCollide2 = false;
                game.time.events.remove(timerEvents[w]);
                game.time.events.remove(timerEvents2[w]);
                food.x = 1000;
                food.y = 220;
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
                    foodEat = false;
                    foodEat2 = false;
                    foodInPlay = true;
                    enableObstacleCollide = true;
                    enableObstacleCollide2 = true;
                }, this);

            }
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
        /* game.debug.body(fork);
        game.debug.body(fork2);
        game.debug.body(food);
        game.debug.text('FPS: ' + game.time.fps || 'FPS: -- ', 40, 40, "#00ff00");

        //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
        //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);
		*/
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
game.state.add('Controls', Controls);
game.state.add('Leaderboard', Leaderboard);
game.state.start('MainMenu');