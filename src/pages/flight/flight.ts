import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.hiddenGroups = [false, false];
      this.flight = navParams.get('flight');
      this.flightMatchesGrouped = [];
      this.getFlightMatches(this.flight.id).then(data => {
        this.flightMatches = data;
        this.groupFlightMatches();
      });
      this.getFlightPlayers(this.flight.id).then(data => {
        this.flightPlayers = data;
      });
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

    getFlightPlayers(id: number) {
      //https://roundrobin.gmtatennis.org/api/flights/1/players
      return new Promise((resolve, reject) => {
        let data = [
                {
                    "id": 1,
                    "name": "Amy Bishop",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 8,
                    "name": "Laurie Dischler",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 25,
                    "name": "Dami Ko",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 36,
                    "name": "Bo Hee Min",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 37,
                    "name": "Maribeth Mohr",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 41,
                    "name": "Kathleen O'Connell",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 45,
                    "name": "Sunghee Pak",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                },
                {
                    "id": 57,
                    "name": "Vicki Wildes",
                    "gender": "female",
                    "ntrp": "3.0",
                    "flight": 1,
                    "league": 1
                }
            ]
        resolve(data);
      });
    }

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

    getFlightMatches(id: number) {
        //https://roundrobin.gmtatennis.org/api/flights/1/matches
      return new Promise((resolve, reject) => {
        resolve(
          [
              {
                  "id": 1,
                  "flight": {
                      "id": 1,
                      "league": 1,
                      "name": "3.0 Women",
                      "year": 2017,
                      "ntrp": "3.0",
                      "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                      "id": 57,
                      "name": "Vicki Wildes",
                      "gender": "female",
                      "ntrp": "3.0",
                      "flight": 1,
                      "league": 1
                  },
                  "visitor_player": {
                      "id": 1,
                      "name": "Amy Bishop",
                      "gender": "female",
                      "ntrp": "3.0",
                      "flight": 1,
                      "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-17",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 2,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-17",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 3,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-17",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 4,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-17",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 5,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 57,
                  "name": "Vicki Wildes",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-24",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 6,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-24",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 7,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-24",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 8,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 1,
                  "name": "Amy Bishop",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-04-24",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 9,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 57,
                  "name": "Vicki Wildes",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-01",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 10,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 1,
                  "name": "Amy Bishop",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-01",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 11,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-01",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 12,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-01",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 13,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 57,
                  "name": "Vicki Wildes",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-08",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 14,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-08",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 15,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 1,
                  "name": "Amy Bishop",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-08",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 16,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-08",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 17,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 57,
                  "name": "Vicki Wildes",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-15",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 18,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-15",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 19,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 1,
                  "name": "Amy Bishop",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-15",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 20,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-15",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 21,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 57,
                  "name": "Vicki Wildes",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-22",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 22,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 1,
                  "name": "Amy Bishop",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-22",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 23,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-22",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 24,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-22",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 25,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 57,
                  "name": "Vicki Wildes",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 36,
                  "name": "Bo Hee Min",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-29",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 26,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 25,
                  "name": "Dami Ko",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 37,
                  "name": "Maribeth Mohr",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-29",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 27,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 8,
                  "name": "Laurie Dischler",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 41,
                  "name": "Kathleen O'Connell",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-29",
                  "played_date": null,
                  "entry_date": null
              },
              {
                  "id": 28,
                  "flight": {
                  "id": 1,
                  "league": 1,
                  "name": "3.0 Women",
                  "year": 2017,
                  "ntrp": "3.0",
                  "start_date": "2017-04-17"
                  },
                  "year": 2017,
                  "status": null,
                  "home_player": {
                  "id": 1,
                  "name": "Amy Bishop",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "visitor_player": {
                  "id": 45,
                  "name": "Sunghee Pak",
                  "gender": "female",
                  "ntrp": "3.0",
                  "flight": 1,
                  "league": 1
                  },
                  "score": null,
                  "winner": null,
                  "scheduled_date": "2017-05-29",
                  "played_date": null,
                  "entry_date": null
              }
          ]
          );
      });
    }
}
