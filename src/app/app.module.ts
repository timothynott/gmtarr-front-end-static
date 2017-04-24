import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FlightPage } from '../pages/flight/flight';
import { ScoreModal } from '../pages/flight/score';
import { FlightsService } from '../providers/flights-service';
import { AuthService } from '../providers/auth-service';
import { UserinfoService } from '../providers/userinfo-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FlightPage,
    ScoreModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FlightPage,
    ScoreModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FlightsService,
    AuthService,
    UserinfoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
