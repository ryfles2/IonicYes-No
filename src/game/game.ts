
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
    widthDev:number=window.innerWidth;
    heightDev:number=window.innerHeight;
    game;
    constructor() {
        // call parent constructor
        //super( 800, 600, Phaser.CANVAS, "game", null );
        super( window.innerWidth, window.innerHeight, Phaser.AUTO, "game", { preload :preload,create: create, update: update } );
        var poly, graphics;
        function preload()
        {
 
            
        }
        // add some game states
        function create() {
            poly = new Phaser.Polygon();
            poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);
            graphics = this.add.graphics(0, 0);
            graphics.beginFill(0xFF33ff);
            graphics.drawPolygon(poly.points);
            graphics.endFill();
        }
        // start with boot state
        
        function update()
        {

        }
    }
}
