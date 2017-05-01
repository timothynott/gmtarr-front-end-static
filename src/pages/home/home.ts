import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FlightPage} from '../flight/flight';
import {FlightsService} from '../../providers/flights-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flights: any; //Array<{id: number, league: number, name: string, year: number, ntrp: string, start_date: string}>;
  ie: boolean = false;

  constructor(public navCtrl: NavController, private Flights: FlightsService) {
    this.flights = [];
  }

  public ionViewWillEnter() {
    this.Flights.loadFlights()
      .then(data => {
        this.flights = data;
      });
    this.ie = this.isIE();
  }

  flightTapped(event, flight) {
    this.navCtrl.push(FlightPage, {
      flight: flight
    });
  }

  isIE() {
    let ua = window.navigator.userAgent;
    if(ua.indexOf('Trident/') > 0 || ua.indexOf('MSIE ') > 0) {
      return true;
    }
  }

}
