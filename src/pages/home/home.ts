import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlightPage } from '../flight/flight';
import { FlightsService } from '../../providers/flights-service';
import { LeaguesService } from '../../providers/leagues-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flights: any; //Array<{id: number, league: number, name: string, year: number, ntrp: string, start_date: string}>;
  leagues: any;
  ie: boolean = false;

  constructor(public navCtrl: NavController, private Flights: FlightsService, private Leagues: LeaguesService) {
    this.leagues = [];
    this.flights = [];
  }

  public ionViewWillEnter() {
    var self = this;
    self.Leagues.loadLeagues()
      .then(data => {
        self.leagues = data.sort(function(a,b) {
          if(a.id > b.id) {
            return -1;
          }
          if(a.id < b.id) {
            return 1;
          }
          return 0;
        });

        self.Flights.loadFlights()
          .then(data => {
            self.flights = data;
            self.addFlightsToLeagues();
          });
      });
    this.ie = this.isIE();
  }

  addFlightsToLeagues() {
    var self = this;
    this.leagues.forEach(league => {
      var leagueFlights = self.flights.filter(flight => {
        return flight.league === league.id;
      })
      league.flights = leagueFlights;
    });
  }

  flightTapped(event, flight) {
    this.navCtrl.push(FlightPage, {
      flight: flight
    });
  }

  getLeagueFlights(id) {
    var leagueFlights =  this.flights.filter(flight => {
      return flight.league = id;
    });
    return leagueFlights;
  }

  isIE() {
    let ua = window.navigator.userAgent;
    if(ua.indexOf('Trident/') > 0 || ua.indexOf('MSIE ') > 0) {
      return true;
    }
  }

}
