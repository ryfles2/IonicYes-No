import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import { LoadingController } from 'ionic-angular';
//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
  providers:[HttpProvider]
})
export class PlayPage 
{

  eventData: any;
  loading: any;
  
  //injecting HttpProvider with angular 2 dependancy in ctor + Loader
  constructor(public navCtrl: NavController, private httpProvider:HttpProvider, public loadingCtrl: LoadingController) 
  {
  
    this.loading = this.loadingCtrl.create
    (
      {
        content: `
        <ion-spinner ></ion-spinner>`
      }
    );
    this.getdata();
  }
  
  getdata()
  {
    this.httpProvider.getJsonData().subscribe
    (
      data => 
    {
      console.log(data);
      this.eventData=JSON.parse(JSON.stringify(data));
      console.log(this.eventData);
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
}