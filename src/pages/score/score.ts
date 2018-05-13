import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


declare var Phaser: any;
var poly, graphics, game;

@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {

  constructor(public navCtrl: NavController) {
    //this.buildPhaserRenderer();
    this.pharserExample();
   
   this.create();
  }







  private buildPhaserRenderer() {
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });
    console.log("buildPhaserRenderer");
    function create() {
        poly = new Phaser.Polygon();
        poly.setTo([ new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200) ]);
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0xFF33ff);
        graphics.drawPolygon(poly.points);
        graphics.endFill();
        console.log("creat");
    }
  }
 


  private pharserExample()
  {

   game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
    game.load.image('einstein', '../../assets/imgs');

}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    var s = game.add.sprite(80, 0, 'einstein');

    s.rotation = 0.14;

}

  }
 
create() {

  //  This creates a simple sprite that is using our loaded image and
  //  displays it on-screen
  var s = game.add.sprite(80, 0, 'einstein');

  s.rotation = 0.14;

}
}
