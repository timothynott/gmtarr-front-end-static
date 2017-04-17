import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FlightsService} from '../../providers/flights-service'

@Component({
    selector: "page-flight",
    templateUrl: "flight.html"
})
export class FlightPage{
    flight: any;
    flightMatches: any; //
    flightPlayers: any; //{id: number, name: string, gender: string, ntrp: string, flight: number, league: number}[];
    flightMatchesGrouped: any; //Array<{scheduledDate: string, matches: any}>;
    hiddenGroups: Array<boolean>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private Flights: FlightsService) {
      this.hiddenGroups = [false, false];
      this.flight = navParams.get('flight');
      this.flightMatchesGrouped = [];
      this.flightMatches = [];
      this.flightPlayers = [];
    }

    public ionViewWillEnter() {
      this.Flights.loadFlightMatches(this.flight.id)
        .then(data => {
          this.flightMatches = data;
          this.groupFlightMatches();
        });
      this.Flights.loadFlightPlayers(this.flight.id)
        .then(data => {
          this.flightPlayers = data;
        })
    }

    toggleGroup(group) {
      if (this.isGroupHidden(group)) {
          this.hiddenGroups[group] = false;
      } else {
          this.hiddenGroups[group] = true;
      }
    };

    isGroupHidden(group) {
      console.log(this.hiddenGroups[group]);
      return (this.hiddenGroups[group] === true);
    };

    groupFlightMatches() {
      let currDate = '';
      let currMatches = [];
      this.flightMatches.forEach((value, index) => {
        if(value.scheduled_date != currDate){

          currDate = value.scheduled_date

          let newGroup = {
              scheduledDate: value.scheduled_date,
              matches: []
          };

          currMatches = newGroup.matches;
          this.flightMatchesGrouped.push(newGroup);

        }
        currMatches.push(value);
      });
    }

}
