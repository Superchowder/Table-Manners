var game = new Phaser.Game(800, 850, Phaser.AUTO);
//localStorage.clear();
var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {

    },
    create: function() {
        if (!MainMusic.isPlaying) {
            //MainMusic = game.add.audio('MainMusic');
            MainMusic.loopFull(.5);
        }

        background = game.add.sprite(0, 0, 'background');

        copyright = game.add.text(game.world.centerX, 830, '©2018 HungryBois Games', { fontSize: '40px', fill: 'white' });
        copyright.anchor.setTo(0.5, 0.5);
        copyright.scale.set(.40);

        highscore = 0;
        highest = 0;

        shadow = game.add.sprite(game.world.centerX - 220, 243, 'fork');
        shadow.alpha = 0.5;
        shadow.tint = 0x000000;
        shadow.angle = 90;
        fork = game.add.sprite(game.world.centerX - 225, 240, 'fork');
        fork.angle = 90;
        fork.anchor.setTo(0.5, 0.5);
        shadow.anchor.setTo(0.5, 0.5);

        shadow2 = game.add.sprite(game.world.centerX + 220, 243, 'fork');
        shadow2.alpha = 0.5;
        shadow2.tint = 0x000000;
        shadow2.angle = -90;
        fork2 = game.add.sprite(game.world.centerX + 225, 240, 'fork');
        fork2.angle = -90;
        fork2.anchor.setTo(0.5, 0.5);
        shadow2.anchor.setTo(0.5, 0.5);

        shadowSettings = game.add.sprite(game.world.centerX + 10, 395, 'shadow');
        shadowSettings.alpha = 0.1;
        shadowSettings.tint = 0x000000;
        shadowSettings.anchor.setTo(0.5, 0.5);

        shadowLead = game.add.sprite(game.world.centerX + 10, 530, 'shadow');
        shadowLead.alpha = 0.1;
        shadowLead.tint = 0x000000;
        shadowLead.anchor.setTo(0.5, 0.5);

        shadowStart = game.add.sprite(game.world.centerX + 10, 260, 'shadow');
        shadowStart.alpha = 0.1;
        shadowStart.tint = 0x000000;
        shadowStart.anchor.setTo(0.5, 0.5);
        start = game.add.sprite(game.world.centerX, 250, 'start');
        start.anchor.setTo(0.5, 0.5);




        settings = game.add.sprite(game.world.centerX, 385, 'settings');
        settings.anchor.setTo(0.5, 0.5);


        lead = game.add.sprite(game.world.centerX, 520, 'leaderboard');
        lead.anchor.setTo(0.5, 0.5);

        start.events.onInputOver.add(() => {
            fork.y = 240;
            shadow.y = 243;
            fork2.y = 240;
            shadow2.y = 243;
            menu = 1;
        });

        start.inputEnabled = true;
        start.events.onInputDown.add(() => {
            game.state.start('Round');
        });

        settings.events.onInputOver.add(() => {
            fork.y = 380;
            shadow.y = 383;
            fork2.y = 380;
            shadow2.y = 383;
            menu = 2;
        });

        settings.inputEnabled = true;
        settings.events.onInputDown.add(() => {
            game.state.start('Controls');
        });

        lead.events.onInputOver.add(() => {
            fork.y = 520;
            shadow.y = 523;
            fork2.y = 520;
            shadow2.y = 523;
            menu = 3;
        });

        lead.inputEnabled = true;
        lead.events.onInputDown.add(() => {
            game.state.start('GameOver');
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
        controlBG = game.add.sprite(0, 0, 'controlBG');

    },
    create: function() {

        controlBG = game.add.sprite(0, 0, 'controlBG');

        //controlText = game.add.bitmapText(game.world.centerX, 100, 'font', 'Controls', 64);
        //controlText.anchor.setTo(0.5, 0.5);
        game.stage.backgroundColor = "#a37041";

        controlText2 = game.add.bitmapText(game.world.centerX, 230, 'font', 'Table Manners is a two player competitve eating game.\n\n' +
            'The goal of the game is to eat more food than your sibling', 28);
        controlText2.anchor.setTo(0.5, 0.5);

        controlText3 = game.add.bitmapText(178, 300, 'font', 'by any means necessary.', 28);
        controlText3.anchor.setTo(0.5, 0.5);

        controlText3 = game.add.bitmapText(16, 350, 'font', 'Eat more food in this 5 course meal experience to win.', 28);
        //controlText3.anchor.setTo(0.5, 0.5);

        controlText4 = game.add.bitmapText(game.world.centerX, 800, 'font', 'Press "Enter" to go to main menu', 40);
        controlText4.anchor.setTo(0.5, 0.5);


        p1 = game.add.sprite(game.world.centerX / 2 + 25, 600, 'p1');
        p2 = game.add.sprite(3 * (game.world.centerX / 2) - 25, 600, 'p2');
        p1.anchor.setTo(0.5, 0.5);
        p2.anchor.setTo(0.5, 0.5);
        p1.scale.set(.35);
        p2.scale.set(.35);
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            roundCount = 0;
            game.state.start('Round');
        }

    }
}

var Credits = function(game) {};
Credits.prototype = {
    preload: function() {
        creditsBG = game.add.sprite(0, 0, 'creditsBG');

    },
    create: function() {
        creditText1 = game.add.bitmapText(game.world.centerX, 800, 'font', 'Press "Enter" to go to main menu', 40);
        creditText1.anchor.setTo(0.5, 0.5);

        creditText2 = game.add.bitmapText(32, 200, 'font', 'Programming/Design/Audio', 30);
        //creditText2.anchor.setTo(0.5, 0.5);
        creditText3 = game.add.bitmapText(game.world.centerX + 165, 213, 'font', 'Samuel Barish', 30);
        creditText3.anchor.setTo(0.5, 0.5);

        creditText4 = game.add.bitmapText(32, 265, 'font', 'Art', 30);
        //creditText4.anchor.setTo(0.5, 0.5);
        creditText5 = game.add.bitmapText(game.world.centerX + 140, 285, 'font', 'Jinjun Xiao', 30);
        creditText5.anchor.setTo(0.5, 0.5);

        creditText6 = game.add.bitmapText(32, 335, 'font', 'Design', 30);
        //creditText6.anchor.setTo(0.5, 0.5);
        creditText7 = game.add.bitmapText(game.world.centerX + 160, 350, 'font', 'Charles Miller', 30);
        creditText7.anchor.setTo(0.5, 0.5);

        creditText8 = game.add.bitmapText(game.world.centerX, 420, 'font', 'Special Thanks', 35);
        creditText8.anchor.setTo(0.5, 0.5);

        creditText6 = game.add.bitmapText(game.world.centerX - 220, 480, 'font', 'Kubbi', 35);
        creditText6.anchor.setTo(0.5, 0.5);
        creditText7 = game.add.bitmapText(game.world.centerX + 140, 483, 'font', 'Song "Dolphin Af"', 30);
        creditText7.anchor.setTo(0.5, 0.5);

        creditText9 = game.add.bitmapText(game.world.centerX - 220, 530, 'font', 'Rhett Dahl', 35);
        creditText9.anchor.setTo(0.5, 0.5);
        creditText10 = game.add.bitmapText(game.world.centerX + 140, 535, 'font', 'Song "8bit jazzy theme"', 30);
        creditText10.anchor.setTo(0.5, 0.5);

        creditText11 = game.add.bitmapText(game.world.centerX - 220, 580, 'font', 'imagex', 35);
        creditText11.anchor.setTo(0.5, 0.5);
        creditText12 = game.add.bitmapText(game.world.centerX + 140, 583, 'font', 'font "Supersonic Rocketship"', 30);
        creditText12.anchor.setTo(0.5, 0.5);

        creditText11 = game.add.bitmapText(game.world.centerX - 220, 630, 'font', 'Nick Forester', 35);
        creditText11.anchor.setTo(0.5, 0.5);
        creditText12 = game.add.bitmapText(game.world.centerX + 140, 633, 'font', 'Consultant', 30);
        creditText12.anchor.setTo(0.5, 0.5);

        food = game.add.sprite(100, 715, 'food');
        food2 = game.add.sprite(300, 715, 'food2');
        food3 = game.add.sprite(500, 715, 'food3');
        food4 = game.add.sprite(700, 715, 'food4');
        food5 = game.add.sprite(900, 715, 'food5');
        food6 = game.add.sprite(1100, 715, 'food6');
        food.anchor.setTo(0.5, 0.5);
        food2.anchor.setTo(0.5, 0.5);
        food3.anchor.setTo(0.5, 0.5);
        food4.anchor.setTo(0.5, 0.5);
        food5.anchor.setTo(0.5, 0.5);
        food6.anchor.setTo(0.5, 0.5);
        food.scale.set(0.8);
        food2.scale.set(0.8);
        food3.scale.set(0.8);
        food4.scale.set(0.8);
        food5.scale.set(0.8);
        food6.scale.set(0.8);


    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }

        food.x -= 1;
        food2.x -= 1;
        food3.x -= 1;
        food4.x -= 1;
        food5.x -= 1;
        food6.x -= 1;

        if (food.x <= -100) {
            food.x = 1100;
        }
        if (food2.x <= -100) {
            food2.x = 1100;
        }
        if (food3.x <= -100) {
            food3.x = 1100;
        }
        if (food4.x <= -100) {
            food4.x = 1100;
        }
        if (food5.x <= -100) {
            food5.x = 1100;
        }
        if (food6.x <= -100) {
            food6.x = 1100;
        }
    }
}

var Leaderboard = function(game) {};
Leaderboard.prototype = {
    preload: function() {
        leadBG = game.add.sprite(0, 0, 'leadBG');
    },
    create: function() {
        leaderText = game.add.bitmapText(game.world.centerX - 30, 200, 'font', "RANK     SCORE        NAME", 64);
        leaderText2 = game.add.bitmapText(game.world.centerX / 8 + 50, 300, 'font', "1.", 64);
        leaderText3 = game.add.bitmapText(game.world.centerX - 55, 300, 'font', "---", 64);
        leaderText4 = game.add.bitmapText(game.world.centerX + 240, 300, 'font', "---", 64);

        leaderText5 = game.add.bitmapText(game.world.centerX / 8 + 50, 400, 'font', "2.", 64);
        leaderText6 = game.add.bitmapText(game.world.centerX - 55, 400, 'font', "---", 64);
        leaderText7 = game.add.bitmapText(game.world.centerX + 240, 400, 'font', "---", 64);

        leaderText8 = game.add.bitmapText(game.world.centerX / 8 + 50, 500, 'font', "3.", 64);
        leaderText9 = game.add.bitmapText(game.world.centerX - 55, 500, 'font', "---", 64);
        leaderText10 = game.add.bitmapText(game.world.centerX + 240, 500, 'font', "---", 64);

        leaderText11 = game.add.bitmapText(game.world.centerX, 800, 'font', 'Press "Enter" to go to main menu', 40);
        leaderText11.anchor.setTo(0.5, 0.5);

        leaderText.anchor.setTo(0.5, 0.5);
        leaderText2.anchor.setTo(0.5, 0.5);
        leaderText3.anchor.setTo(0.5, 0.5);
        leaderText4.anchor.setTo(0.5, 0.5);

        leaderText5.anchor.setTo(0.5, 0.5);
        leaderText6.anchor.setTo(0.5, 0.5);
        leaderText7.anchor.setTo(0.5, 0.5);
        leaderText8.anchor.setTo(0.5, 0.5);

        leaderText9.anchor.setTo(0.5, 0.5);
        leaderText10.anchor.setTo(0.5, 0.5);


        if (localStorage.getItem('hiscore') != null) {
            let storedScoreName = localStorage.getItem("playerName");
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            leaderText3.text = storedScore + " pts";
            leaderText4.text = storedScoreName;

        }

        if (localStorage.getItem('hiscore2') != null) {
            let storedScoreName = localStorage.getItem("playerName2");
            let storedScore = parseInt(localStorage.getItem('hiscore2'));
            leaderText6.text = storedScore + " pts";
            leaderText7.text = storedScoreName;

        }

        if (localStorage.getItem('hiscore3') != null) {
            let storedScoreName = localStorage.getItem("playerName3");
            let storedScore = parseInt(localStorage.getItem('hiscore3'));
            leaderText9.text = storedScore + " pts";
            leaderText10.text = storedScoreName;

        }


        game.stage.backgroundColor = "#a37041";
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }

    }
}

var Loading = function(game) {};
Loading.prototype = {
    preload: function() {
        background = game.add.sprite(0, 0, 'background1');
        TimerText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'Loading...', 120);
        TimerText.anchor.setTo(0.5, 0.5);
        this.preloadBar = this.add.sprite(game.world.centerX - 100, game.world.centerY + 100, 'bar');
        this.load.setPreloadSprite(this.preloadBar);

        game.load.audio('music', 'assets/audio/GameSound.mp3');
        game.load.audio('yelp1', 'assets/audio/ahhh.mp3');
        game.load.audio('eating', 'assets/audio/eating.mp3');
        game.load.audio('cooking', 'assets/audio/cooking.mp3');
        game.load.audio('yelp2', 'assets/audio/ouch.mp3');
        game.load.audio('yelp3', 'assets/audio/hehehe.mp3');
        game.load.audio('yelp4', 'assets/audio/scared.mp3');
        game.load.audio('yelp5', 'assets/audio/whee.mp3');
        game.load.audio('yelp6', 'assets/audio/ouchie.mp3');
        game.load.audio('MainMusic', 'assets/audio/Theme.mp3');
        game.load.image('endScreen', 'assets/img/endscreen.png');
        game.load.image('background', 'assets/img/background.png');
        game.load.image('creditsBG', 'assets/img/credits.png');
        game.load.image('start', 'assets/img/plateStart.png');
        game.load.image('settings', 'assets/img/plateControls.png');
        game.load.image('leaderboard', 'assets/img/plateLead.png');
        game.load.image('shadow', 'assets/img/plateSettings.png');
        game.load.image('fork', 'assets/img/fork.png');
        game.load.image('controlBG', 'assets/img/controls.png');
        game.load.image('leadBG', 'assets/img/leaderboard.png');

        game.load.path = 'assets/img/';
        game.load.image('table', 'table2.png');
        game.load.image('food', 'sushiroll.png');
        game.load.image('Icon', 'belly.png');
        game.load.image('food2', 'watermelon.png');
        game.load.image('food3', 'bread.png');
        game.load.image('food4', 'milk.png');
        game.load.image('food5', 'pepper.png');
        game.load.image('food6', 'cookie.png');
        game.load.image('barTop', 'PowerBarTop.png');
        game.load.image('barBottom', 'PowerBarBottom.png');
        game.load.image('p1', 'P1_controls.png');
        game.load.image('p2', 'P2_controls.png');

    },
    create: function() {
        MainMusic = game.add.audio('MainMusic');
        if (window.localStorage) {
            console.log("Local storage Supported");
        } else {
            console.log("Local storage not supported")
        }

    },
    update: function() {
        if (!MainMusic.isDecoding) {
            game.state.start('MainMenu');
        }

    }
}

var PreLoading = function(game) {};
PreLoading.prototype = {
    preload: function() {
        game.load.image('background1', 'assets/img/background.png');
        game.load.image('bar', 'assets/img/PowerBar.png');
        game.load.bitmapFont('font', 'assets/Bitmap/SpaceShip.png', 'assets/Bitmap/SpaceShip.fnt');
    },
    create: function() {

    },
    update: function() {
        game.state.start('Loading');

    }
}





var Round = function(game) {};
Round.prototype = {
    preload: function() {
        MainMusic.stop();
    },
    create: function() {
    	cooking = game.add.audio('cooking');
    	cooking.play();
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
        TimerText = game.add.bitmapText(400, 60, 'font', '30', 120);
        //TimerText = game.add.text(400, 60, '30', { fontSize: '120px', fill: '#48f442' });
        TimerText.scale.set(.5);
        TimerText.anchor.setTo(.5, .5);

        if (p1_wins == 1) {
            winIcon.x = 130;
        }

        if (p1_wins == 2) {
            winIcon2.x = 170;
            winIcon.x = 130;
        }

        if (p2_wins == 1) {
            winIcon3.x = 715;
        }

        if (p2_wins == 2) {
            winIcon4.x = 755;
            winIcon3.x = 715;
        }

        scoreText = game.add.bitmapText(16, 16, 'font', 'P1 Score: 0', 32);
        powerText = game.add.bitmapText(30, 750, 'font', 'Telekinetic Power', 32);
        scoreText2 = game.add.bitmapText(600, 16, 'font', 'P2 Score: 0', 32);
        powerText2 = game.add.bitmapText(490, 750, 'font', 'Telekinetic Power', 30);
        WinText = game.add.bitmapText(16, 60, 'font', 'Wins: ', 32);
        WinText2 = game.add.bitmapText(600, 60, 'font', 'Wins: ', 32);
        RoundText = game.add.bitmapText(400, 350, 'font', 'Course ' + (roundCount + 1), 120);

        barBot = game.add.sprite(525, 790, 'barBottom');
        barBot2 = game.add.sprite(65, 790, 'barBottom');
        bar = game.add.sprite(80, 800, 'bar');
        bar2 = game.add.sprite(540, 800, 'bar');
        barTop = game.add.sprite(540, 800, 'barTop');
        barTop2 = game.add.sprite(80, 800, 'barTop');
        bar.tint = 0x00FF00;
        bar2.tint = 0x00FF00;


        if (lastWinner) {
            WinnerText = game.add.bitmapText(400, 350, 'font', 'PLAYER 1 WINS! ', 70);
        } else {
            WinnerText = game.add.bitmapText(400, 350, 'font', 'PLAYER 2 WINS! ', 70);
        }
        WinnerText.anchor.set(.5);
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
var up;
var r;
var w;
var up2;
var maxSpeed = 100;
var foodEat;
var foodEat2;
var score;
var score2;
var rainbowOn;
var time;
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
var MainMusic;
var highscore;
var highest;


//ends game
function endGame(player, box) {
    game.state.start('GameOver')
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
        let xPos = xDif / i;
        let yPos = yDif / i;
        xDif -= xPos;
        yDif -= yPos;
        i--;
        food.x -= xPos;
        food.y -= yPos;
    }, this);


    timerEvents2[w] = game.time.events.add(1200, () => {
        w = 0;
        alreadyPulled = false;
        food.x = x;
        food.y = y;

        if (fork.isFoodOnPlate()) {
            foodEat = true;
            foodEat2 = false;
        } else {
            foodEat2 = true;
            foodEat = false;
        }
    }, this);

}

function rainbowMaker() {
    rainbowOn = true;

    if (TimerText.tint == 0xFF0000) {
        TimerText.tint = 0xe59809;
    } else if (TimerText.tint == 0xe59809) {
        TimerText.tint = 0xffda0a;
    } else if (TimerText.tint == 0xffda0a) {
        TimerText.tint = 0x48f442;
    } else if (TimerText.tint == 0x48f442) {
        TimerText.tint = 0x099dff;
    } else if (TimerText.tint == 0x099dff) {
        TimerText.tint = 0xa608ce;
    } else {
        TimerText.tint = 0xFF0000;
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
            if (highest < score) {
                highest = score;
            }
            p1_wins++;
            lastWinner = true;
            roundCount++;
        } else {
            if (highest < score2) {
                highest = score2;
            }
            p2_wins++;
            lastWinner = false;
            roundCount++;
        }

        if (p1_wins > 2 || p2_wins > 2) {
            game.state.start('GameOver');
        } else {
            gameMusic.stop();
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
        gameMusic.loopFull(.5);
        yelp1 = game.add.audio('yelp1');
        yelp2 = game.add.audio('yelp2');
        yelp3 = game.add.audio('yelp3');
        yelp4 = game.add.audio('yelp4');
        yelp5 = game.add.audio('yelp5');
        yelp6 = game.add.audio('yelp6');
        eating = game.add.audio('eating');
        //adds all sprites

        food = game.add.sprite(395, 270, 'food');
        food1 = game.add.sprite(1000, 100000, 'food');
        fork = new Fork(game, food, 100, 600, 165, 670, 'fork');
        fork2 = new Fork(game, food, 600, 600, 620, 670, 'fork');
        food2 = game.add.sprite(10000, 10000, 'food2');
        food3 = game.add.sprite(10000, 10000, 'food3');
        food4 = game.add.sprite(10000, 10000, 'food4');
        food5 = game.add.sprite(10000, 10000, 'food5');
        food6 = game.add.sprite(10000, 10000, 'food6');


        barBot = game.add.sprite(525, 790, 'barBottom');
        barBot2 = game.add.sprite(65, 790, 'barBottom');
        bar = game.add.sprite(80, 800, 'bar');
        bar2 = game.add.sprite(540, 800, 'bar');
        barTop = game.add.sprite(540, 800, 'barTop');
        barTop2 = game.add.sprite(80, 800, 'barTop');

        width = bar.width;
        width2 = bar.width;

        r = 1;

        winIcon = game.add.sprite(3000, 80, 'Icon');
        winIcon2 = game.add.sprite(3000, 80, 'Icon');
        winIcon3 = game.add.sprite(3000, 80, 'Icon');
        winIcon4 = game.add.sprite(3000, 80, 'Icon');

        game.physics.arcade.enable(food);
        game.physics.arcade.enable(food2);
        game.physics.arcade.enable(food3);
        game.physics.arcade.enable(food1);
        game.physics.arcade.enable(food4);
        game.physics.arcade.enable(food5);
        game.physics.arcade.enable(food6);

        food.anchor.setTo(0.5, 0.5);
        food2.anchor.setTo(0.5, 0.5);
        food3.anchor.setTo(0.5, 0.5);
        food1.anchor.setTo(0.5, 0.5);
        food4.anchor.setTo(0.5, 0.5);
        food5.anchor.setTo(0.5, 0.5);
        food6.anchor.setTo(0.5, 0.5);

        winIcon.anchor.setTo(0.5, 0.5);
        winIcon2.anchor.setTo(0.5, 0.5);
        winIcon3.anchor.setTo(0.5, 0.5);
        winIcon4.anchor.setTo(0.5, 0.5);

        w = 0;
        up = true;
        up2 = true;
        foodEat = false;
        foodEat2 = false;
        score = 0;
        score2 = 0;
        time = 30;
        alreadyPulled = false;
        lastWinner = false;
        foodInPlay = true;

        scoreText = game.add.bitmapText(16, 16, 'font', 'P1 Score: 0', 32);
        powerText = game.add.bitmapText(30, 750, 'font', 'Telekinetic Power', 32);
        scoreText2 = game.add.bitmapText(600, 16, 'font', 'P2 Score: 0', 32);
        powerText2 = game.add.bitmapText(490, 750, 'font', 'Telekinetic Power', 30);
        WinText = game.add.bitmapText(16, 60, 'font', 'Wins: ', 32);
        WinText2 = game.add.bitmapText(600, 60, 'font', 'Wins: ', 32);

        TimerText = game.add.bitmapText(400, 60, 'font', '30', 120);
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
            winIcon2.x = 170;
            winIcon.x = 130;
        }

        if (p2_wins == 1) {
            winIcon3.x = 715;
        }

        if (p2_wins == 2) {
            winIcon4.x = 755;
            winIcon3.x = 715;
        }

        let Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        //moves fork based on power level
        Wkey.onDown.add(() => {
            if (fork.isStartPos() && fork.canShoot && fork.speedFactor > 1) {
                fork.forkMovement();
            }
        });

    },


    update: function() {
        scoreText.text = 'P1 Score: ' + score;
        scoreText2.text = 'P2 Score: ' + score2;

        var cursors = game.input.keyboard.createCursorKeys();

        //only rotates the fork if its in the original position
        if (fork.isStartPos()) {
            fork.rotate();
        }

        if (fork2.isStartPos()) {
            fork2.rotate();
        }

        //moves fork based on power level
        if (cursors.up.justDown && fork2.isStartPos() && fork2.canShoot) {
            if (fork2.speedFactor > 1) {
                fork2.forkMovement();
            }
        }

        //charges the power "bar"
        if (cursors.down.isDown && !fork2.isFoodOnPlate()) {
            fork2.canShoot = true;
            fork2.enableCollision = true;
        }
        //charges the power "bar"
        if (game.input.keyboard.isDown(Phaser.Keyboard.S) && !fork.isFoodOnPlate()) {
            fork.canShoot = true;
            fork.enableCollision = true;
        }

        if (fork.isStartPos() && !fork.canShoot) {
            fork.powerBar();
        }

        if (fork2.isStartPos() && !fork2.canShoot) {
            fork2.powerBar();
        }

        bar.width = width * (fork.speedFactor / 100);
        bar2.width = width2 * (fork2.speedFactor / 100);

        bar.tint = Math.round((1 - (fork.speedFactor / 100) * 0xFF)) * 65536 + Math.round(((fork.speedFactor / 100) * 0xFF)) * 256;
        bar2.tint = Math.round((1 - (fork2.speedFactor / 100) * 0xFF)) * 65536 + Math.round(((fork2.speedFactor / 100) * 0xFF)) * 256;

        //checks for collision
        game.physics.arcade.collide(fork, food, () => {
            fork.collision();
            let temp = r;
                    r = game.rnd.integerInRange(1, 6);
                    while (temp === r) {
                        r = game.rnd.integerInRange(1, 6);
                    }
                    if (r == 1) {
                        yelp1.play('', 0, 5);
                    } else if (r == 2) {
                        yelp2.play('', 0, 5);
                    } else if (r == 3) {
                        yelp3.play('', 0, 1);
                    } else if (r == 4) {
                        yelp4.play('', 0, 1);
                    } else if (r == 5) {
                        yelp5.play('', 0, 5);
                    } else {
                        yelp6.play('', 0, 5);
                    }
        }, () => { return fork.enableCollision; });
        game.physics.arcade.collide(fork2, food, () => {
            fork2.collision();
            let temp = r;
                    r = game.rnd.integerInRange(1, 6);
                    while (temp === r) {
                        r = game.rnd.integerInRange(1, 6);
                    }
                    if (r == 1) {
                        yelp1.play('', 0, 5);
                    } else if (r == 2) {
                        yelp2.play('', 0, 5);
                    } else if (r == 3) {
                        yelp3.play('', 0, 1);
                    } else if (r == 4) {
                        yelp4.play('', 0, 1);
                    } else if (r == 5) {
                        yelp5.play('', 0, 5);
                    } else {
                        yelp6.play('', 0, 5);
                    }
        }, () => { return fork2.enableCollision; });

        game.physics.arcade.overlap(fork, fork2);

        //allows the player to eat food if its on their plate
        if (foodInPlay) {
            if ((game.input.keyboard.isDown(Phaser.Keyboard.A) && foodEat) || (cursors.left.isDown && foodEat2)) {
                eating.play('', 0, 5);
                foodInPlay = false;
                game.time.events.remove(timerEvents[w]);
                game.time.events.remove(timerEvents2[w]);
                food.x = 1000;
                food.y = 220;

                if (foodEat) {
                    score += 10;
                } else {
                    score2 += 10;
                }

                foodEat = false;
                foodEat2 = false;
                game.time.events.add(1000, () => {
                    let temp = r;
                    r = game.rnd.integerInRange(1, 6);
                    while (temp === r) {
                        r = game.rnd.integerInRange(1, 6);
                    }
                    if (r == 1) {
                        food = food1;
                    } else if (r == 2) {
                        food = food2;
                    } else if (r == 3) {
                        food = food3;
                    } else if (r == 4) {
                        food = food4;
                    } else if (r == 5) {
                        food = food5;
                    } else {
                        food = food6;
                    }
                    fork.food = fork2.food = food;
                    food.x = 395;
                    food.y = 270;
                    food.revive();
                    game.time.events.remove(timerEvents[1]);
                    game.time.events.remove(timerEvents2[1]);
                    game.time.events.remove(timerEvents[2]);
                    game.time.events.remove(timerEvents2[2]);
                }, this);

                game.time.events.add(1500, () => {
                    foodEat = false;
                    foodEat2 = false;
                    foodInPlay = true;
                }, this);

            }
        }

        //changes game state
    },

    render: function() {
        /*
        game.debug.body(fork);
        game.debug.body(fork2);
        game.debug.body(food);
        game.debug.text('FPS: ' + game.time.fps || 'FPS: -- ', 40, 40, "#00ff00");
		*/
        //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
        //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

    }


}

var GameOver = function(game) {};
GameOver.prototype = {
    preload: function() {
        MainMusic.loopFull(.5);
    },
    create: function() {

        //checks for highscore in the local storage
        if (localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //see if current play is higher than stored score
            if (highest > storedScore) {
                localStorage.setItem('hiscore', highest.toString());
                highscore = highest;
                newHighScore = true;
                var storedName1 = localStorage.getItem('playerName');
                var player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                while (player == null || player.length > 3) {
                    player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                }
                localStorage.setItem("playerName", player);

                //move second spot to third spot
                if (localStorage.getItem('hiscore2') != null) {
                    let storedScore2 = parseInt(localStorage.getItem('hiscore2'));
                    let storedName = localStorage.getItem('playerName2');
                    localStorage.setItem('hiscore3', storedScore2.toString());
                    localStorage.setItem('playerName3', storedName);
                }
                //set old score to 2nd spot
                localStorage.setItem('hiscore2', storedScore.toString());
                localStorage.setItem('playerName2', storedName1);
            } else {
                if (localStorage.getItem('hiscore2') != null) {
                    let storedScore = parseInt(localStorage.getItem('hiscore2'));
                    if (highest > storedScore) {
                        localStorage.setItem('hiscore2', highest.toString());
                        let storedName2 = localStorage.getItem('playerName2');
                        localStorage.setItem('playerName3', storedName2);
                        var player = prompt("NewpHighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                        while (player == null || player.length > 3) {
                            player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                        }
                        localStorage.setItem("playerName2", player);
                        //push old second score to third spot
                        localStorage.setItem('hiscore3', storedScore.toString());
                    } else {
                        if (localStorage.getItem('hiscore3') != null) {
                            let storedScore = parseInt(localStorage.getItem('hiscore3'));
                            if (highest > storedScore) {
                                localStorage.setItem('hiscore3', highest.toString());
                                var player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                                while (player == null || player.length > 3) {
                                    player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                                }
                                localStorage.setItem("playerName3", player);
                            }
                        } else {
                            var player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                            while (player == null || player.length > 3) {
                                player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                            }
                            localStorage.setItem("playerName3", player);
                            highScore = highest;
                            localStorage.setItem('hiscore3', highScore.toString());
                            newHighScore = true;
                        }
                    }
                } else {
                    var player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                    while (player == null || player.length > 3) {
                        player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
                    }
                    localStorage.setItem("playerName2", player);
                    highScore = highest;
                    localStorage.setItem('hiscore2', highScore.toString());
                    newHighScore = true;
                }
            }
            //create local storage if none exists
        } else {
            var player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
            while (player == null || player.length > 3) {
                player = prompt("New HighScore, Enter Name (MAX 3 LETTERS)", "AAA");
            }
            localStorage.setItem("playerName", player);
            highScore = highest;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;

        }

        background = game.add.sprite(0, 0, 'endScreen');
        GameOver = game.add.bitmapText(game.world.centerX, 200, 'font', 'Meal Over', 80);
        GameOver2 = game.add.bitmapText(game.world.centerX, 425, 'font', 'Press "R" to start a new meal', 45);
        GameOver3 = game.add.bitmapText(game.world.centerX, 500, 'font', 'Press "Enter" to go to the Main Menu', 45);
        GameOver4 = game.add.bitmapText(game.world.centerX, 575, 'font', 'Press "C" to see the all the Cooks', 45);

        if (p1_wins > p2_wins) {
            GameOver5 = game.add.bitmapText(game.world.centerX, 300, 'font', 'Player 1 WINS!', 80);
        } else {
            GameOver5 = game.add.bitmapText(game.world.centerX, 300, 'font', 'Player 2 WINS!', 80);
        }
        GameOver.anchor.setTo(0.5, 0.5);
        GameOver2.anchor.setTo(0.5, 0.5);
        GameOver3.anchor.setTo(0.5, 0.5);
        GameOver4.anchor.setTo(0.5, 0.5);
        GameOver5.anchor.setTo(0.5, 0.5);
        p1_wins = 0;
        p2_wins = 0;

    },
    update: function() {
        //moves to main menu state
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
            MainMusic.stop();


        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            roundCount = 0;
            game.state.start('Round');
            MainMusic.stop();
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            game.state.start('Credits');
        }
    }
}


game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.add('Round', Round);
game.state.add('Controls', Controls);
game.state.add('Leaderboard', Leaderboard);
game.state.add('Loading', Loading);
game.state.add('PreLoading', PreLoading);
game.state.add('Credits', Credits);
game.state.start('PreLoading');