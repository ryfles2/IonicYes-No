//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import { FormsModule } from '@angular/forms';



import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PlayPage } from '../pages/play/play';
import { ScorePage } from '../pages/score/score';
import { AboutPage } from '../pages/about/about';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';

@NgModule({
  declarations: [
    MyApp,
    PlayPage,
    ScorePage,
    AboutPage
  ],
  imports: [
    //FormsModule,
    //HttpModule,
    HttpClientModule,

    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlayPage,
    ScorePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    HttpProvider
  ]
})
export class AppModule {}