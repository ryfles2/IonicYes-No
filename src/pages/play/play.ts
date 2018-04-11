import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import { LoadingController } from 'ionic-angular';
//import { HttpClientModule } from '@angular/common/http';
import { ScorePage } from '../score/score';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
  providers:[HttpProvider]
})

export class PlayPage 
{
  
  json: any;
  loading: any;

  category : string;
  question: string;
  correctAnswer: string;
  
  //injecting HttpProvider with angular 2 dependancy in ctor + Loader
  constructor(public navCtrl: NavController, private httpProvider:HttpProvider, public loadingCtrl: LoadingController) 
  {
  
    
    this.getdata();
  }
  
  getdata()
  {
    this.httpProvider.getJsonData().subscribe
    (
      data => 
    {
      console.log(data);
      this.json=JSON.parse(JSON.stringify(data));
      this.question= this.loopEscape((this.json.results["0"].question).toString());
      this.category= this.loopEscape((this.json.results["0"].category).toString());
      this.correctAnswer= this.loopEscape((this.json.results["0"].correct_answer).toString());
      
      console.log(this.json);
    },
    err =>
    {
      console.error("Error : " +err);
    },
    () => 
    {
      console.log('getData completed');
    }
    );
  }

  loopEscape(badString: string):string
  {
    var ret: string = badString;
    for(var i=0;i<20;i++)
     {
      ret=ret.replace("&amp;", "&").replace("&quot;", "\"").replace("&apos;", "'").replace("&gt;",">").replace("&lt;", "<").replace("&#039;","'");
     }
     return ret;
  }


  goToScore(params){
    if (!params) params = {};
    this.navCtrl.push(ScorePage);
  }
  update(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
}
}