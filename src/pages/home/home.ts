import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {FlightPage} from '../flight/flight';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flights: Array<{id: number, league: number, name: string, year: number, ntrp: string, start_date: string}>;

  constructor(public navCtrl: NavController) {
    this.flights = [{"id":1,"league":1,"name":"3.0 Women","year":2017,"ntrp":"3.0","start_date":"2017-04-17"},{"id":2,"league":1,"name":"3.5/4.0 Women","year":2017,"ntrp":"3.5, 4.0","start_date":"2017-04-17"},{"id":3,"league":1,"name":"3.0 Men","year":2017,"ntrp":"3.0","start_date":"2017-04-17"},{"id":4,"league":1,"name":"3.5 Men Flight A","year":2017,"ntrp":"3.5","start_date":"2017-04-17"},{"id":5,"league":1,"name":"3.5 Men Flight B","year":2017,"ntrp":"3.5","start_date":"2017-04-17"},{"id":6,"league":1,"name":"3.5 Men Flight C","year":2017,"ntrp":"3.5","start_date":"2017-04-17"},{"id":7,"league":1,"name":"4.0 Men Flight A","year":2017,"ntrp":"4.0","start_date":"2017-04-17"},{"id":8,"league":1,"name":"4.0 Men Flight B","year":2017,"ntrp":"4.0","start_date":"2017-04-17"}];
  }

  flightTapped(event, flight) {
    this.navCtrl.push(FlightPage, {
      flight: flight
    });
  }

}
