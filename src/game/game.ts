
// import pixi, p2 and phaser ce
import "pixi";
import "p2";
import * as Phaser from "phaser-ce";
/**
 * Main entry game class
 * @export
 * @class Game
 * @extends {Phaser.Game}
 */
export class Game extends Phaser.Game {
    /**
     * Creates an instance of Game.
     * @memberof Game
     */
  
    
    constructor() {
        // call parent constructor
        //'../assets/pong/paddle.png'
        

        super( window.innerWidth, window.innerHeight, Phaser.CANVAS, "game", { preload: preload, create: create, update: update } );
        //super( 800, 600, Phaser.CANVAS, "game", { preload: preload, create: create, update: update } );
        

        // var poly, graphics;
    
        // function create() {
        //     poly = new Phaser.Polygon();
        //     poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);
        //     graphics = this.add.graphics(0, 0);
        //     graphics.beginFill(0xFF33ff);
        //     graphics.drawPolygon(poly.points);
        //     graphics.endFill();
            
        // }
        function preload() {

            // this.load.atlas('breakout', 'assets/games/breakout/breakout.png', 'assets/games/breakout/breakout.json');
            // this.load.image('starfield', 'assets/misc/starfield.jpg');
            this.load.atlas('breakout', 'assets/pong/breakout.png', 'assets/pong/breakout.json');
            this.load.image('starfield', 'assets/pong/starfield.jpg');
        
        }
        
        var ball;
        var paddle;
        var bricks;
        
        var ballOnPaddle = true;
        
        var lives = 3;
        var score = 0;
        
        var scoreText;
        var livesText;
        var introText;
        
        var s;
        
        function create() {
        
            this.physics.startSystem(Phaser.Physics.ARCADE);
        
            //  We check bounds collisions against all walls other than the bottom one
            this.physics.arcade.checkCollision.down = false;
        
            //s = this.add.tileSprite(0, 0, 800, 600, 'starfield');
            s = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'starfield');
            console.log(window.innerWidth);
            console.log(window.innerHeight);


            bricks = this.add.group();
            bricks.enableBody = true;
            bricks.physicsBodyType = Phaser.Physics.ARCADE;
        
            var brick;
        
            //przeszkody
            for (var y = 0; y < 4; y++)
            {
                for (var x = 0; x < 11; x++)
                {
                    brick = bricks.create(10 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
            }
        
            //gracz!!!!!!!!!!!!!
            paddle = this.add.sprite(this.world.centerX, window.innerHeight-200, 'breakout', 'paddle_big.png');
            paddle.anchor.setTo(0.5, 0.5);
        
            this.physics.enable(paddle, Phaser.Physics.ARCADE);
        
            paddle.body.collideWorldBounds = true;
            paddle.body.bounce.set(1);
            paddle.body.immovable = true;
        
            //piłka
            ball = this.add.sprite(this.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
            ball.anchor.set(0.5);
            ball.checkWorldBounds = true;
        
            this.physics.enable(ball, Phaser.Physics.ARCADE);
        
            ball.body.collideWorldBounds = true;
            ball.body.bounce.set(1);
        
            ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);
        
            ball.events.onOutOfBounds.add(ballLost, this);
        
            scoreText = this.add.text(30, window.innerHeight-50, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
            livesText = this.add.text(window.innerWidth-100, window.innerHeight-50, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
            introText = this.add.text(this.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
            introText.anchor.setTo(0.5, 0.5);
        
            this.input.onDown.add(releaseBall, this);
        
        }
        
        function update () {
        
            //  Fun, but a little sea-sick inducing :) Uncomment if you like!
            // s.tilePosition.x += (game.input.speed.x / 2);
        
            paddle.x = this.input.x;
        
            if (paddle.x < 24)
            {
                paddle.x = 24;
            }
            else if (paddle.x > this.width - 24)
            {
                paddle.x = this.width - 24;
            }
        
            if (ballOnPaddle)
            {
                ball.body.x = paddle.x;
            }
            else
            {
                this.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
                this.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
            }
        
        }
        
        function releaseBall () {
        
            if (ballOnPaddle)
            {
                ballOnPaddle = false;
                ball.body.velocity.y = -300;
                ball.body.velocity.x = -75;
                introText.visible = false;
            }
        
        }
        
        function ballLost () {
        
            lives--;
            livesText.text = 'lives: ' + lives;
        
            if (lives === 0)
            {
                gameOver();
            }
            else
            {
                ballOnPaddle = true;
        
                ball.reset(paddle.body.x + 16, paddle.y - 16);
                
                ball.animations.stop();
            }
        
        }
        
        function gameOver () {
        
            ball.body.velocity.setTo(0, 0);
            
            introText.text = 'Game Over!';
            introText.visible = true;
        
        }
        
        function ballHitBrick (_ball, _brick) {
        
            _brick.kill();
        
            score += 10;
        
            scoreText.text = 'score: ' + score;
        
            //  Are they any bricks left?
            if (bricks.countLiving() == 0)
            {
                //  New level starts
                score += 1000;
                scoreText.text = 'score: ' + score;
                introText.text = '- Next Level -';
        
                //  Let's move the ball back to the paddle
                ballOnPaddle = true;
                ball.body.velocity.set(0);
                ball.x = paddle.x + 16;
                ball.y = paddle.y - 16;
                ball.animations.stop();
        
                //  And bring the bricks back from the dead :)
                bricks.callAll('revive');
            }
        
        }
        
        function ballHitPaddle (_ball, _paddle) {
        
            var diff = 0;
        
            if (_ball.x < _paddle.x)
            {
                //  Ball is on the left-hand side of the paddle
                diff = _paddle.x - _ball.x;
                _ball.body.velocity.x = (-10 * diff);
            }
            else if (_ball.x > _paddle.x)
            {
                //  Ball is on the right-hand side of the paddle
                diff = _ball.x -_paddle.x;
                _ball.body.velocity.x = (10 * diff);
            }
            else
            {
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                _ball.body.velocity.x = 2 + Math.random() * 8;
            }
        
        }
    }
}
