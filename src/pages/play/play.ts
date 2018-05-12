import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import { LoadingController } from 'ionic-angular';
import { ScorePage } from '../score/score';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
  providers:[HttpProvider]
})

export class PlayPage 
{
  //json variable
  json: any;
  loading: any;
  //quiz variable
  static score: number = 0;
  category : string;
  question: string;
  correctAnswer: string;
  Answer0: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  correctAnswerNumer:number;
  
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
      //let correct = Math.floor(Math.random() * 4);
      this.correctAnswerNumer = Math.floor(Math.random() * 4);
      // for (var i = 0; i < 30; i++)
      // {
      //   let corect = Math.floor(Math.random() * 4);
      //   console.log(corect);
      // }
      let pom:number =0;
    if(this.correctAnswerNumer == 0)
    {
      this.Answer0= this.loopEscape((this.json.results["0"].correct_answer).toString());
    }
    else
    {
      this.Answer0 = this.loopEscape((this.json.results["0"].incorrect_answers[pom]).toString());
      pom++;
    }
    if(this.correctAnswerNumer == 1)
    {
      this.Answer1= this.loopEscape((this.json.results["0"].correct_answer).toString());
    }
    else
    {
      this.Answer1 = this.loopEscape((this.json.results["0"].incorrect_answers[pom]).toString());
      pom++;
    }
    if(this.correctAnswerNumer == 2)
    {
      this.Answer2= this.loopEscape((this.json.results["0"].correct_answer).toString());
    }
    else
    {
      this.Answer2 = this.loopEscape((this.json.results["0"].incorrect_answers[pom]).toString());
      pom++;
    }
    if(this.correctAnswerNumer == 3)
    {
      this.Answer3= this.loopEscape((this.json.results["0"].correct_answer).toString());
    }
    else
    {
      this.Answer3 = this.loopEscape((this.json.results["0"].incorrect_answers[pom]).toString());
      pom++;
    }
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
  update0(){
    if(0 == this.correctAnswerNumer) PlayPage.score++;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  update1(){
    if(1 == this.correctAnswerNumer) PlayPage.score++;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  update2(){
    if(2 == this.correctAnswerNumer) PlayPage.score++;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  update3(){
    if(3 == this.correctAnswerNumer) PlayPage.score++;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  get staticScore() {
    return PlayPage.score;
  }
}