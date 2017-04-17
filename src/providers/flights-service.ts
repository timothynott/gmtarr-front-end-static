import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FlightsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FlightsService {

  flights: any;
  flightMatches: any;
  flightPlayers: any;

  constructor(private http: Http) {
    //console.log('Hello FlightsService Provider');
    this.flights = [];
    this.flightMatches = [];
    this.flightPlayers = [];
  }

  loadFlights() {
    if (this.flights.length) {
      return Promise.resolve(this.flights);
    }

    return new Promise(resolve => {
      this.http.get('/api/flights')
        .map(res => res.json())
        .subscribe(data => {
          this.flights = data;
          resolve(this.flights);
        });
    });
  }

  loadFlightMatches(id: number) {
    let flightMatchTest = this.checkFlightMatches(id);
    if(!flightMatchTest) {
      return new Promise(resolve => {
        this.http.get('/api/flights/' + id + '/matches')
          .map(res => res.json())
          .subscribe(data => {
            this.flightMatches.push({flightId: id, matches: data});
            resolve(data);
          });
      });
    }
    else {
      return Promise.resolve(flightMatchTest);
    }
  }

  checkFlightMatches(id: number) {
    // look through the gathered flight matches to see if one matches
    this.flightMatches.forEach(element => {
      if(element.flightId === id) {
        return element.matches;
      }
    });
    return false;
  }

  loadFlightPlayers(id: number) {
    let flightPlayersTest = this.checkFlightPlayers(id);
    if(!flightPlayersTest) {
      return new Promise(resolve => {
        this.http.get('/api/flights/' + id + '/players')
          .map(res => res.json())
          .subscribe(data => {
            this.flightPlayers.push({flightId: id, players: data});
            resolve(data);
          });
      });
    }
    else {
      return Promise.resolve(flightPlayersTest);
    }
  }

  checkFlightPlayers(id: number) {
    // look through the gathered flight players to see if one matches
    this.flightPlayers.forEach(element => {
      if(element.flightId === id) {
        return element.players;
      }
    });
    return false;
  }

}
