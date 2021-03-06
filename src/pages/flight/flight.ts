import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FlightsService} from '../../providers/flights-service'
import { AuthService} from '../../providers/auth-service'
import { UserinfoService} from '../../providers/userinfo-service'
import { ScoreModal } from './score'

@Component({
    selector: "page-flight",
    templateUrl: "flight.html"
})
export class FlightPage{
  flight: any;
  flightMatches: any; //
  flightPlayers: any; //{id: number, name: string, gender: string, ntrp: string, flight: number, league: number}[];
  flightMatchesGrouped: any; //Array<{scheduledDate: string, matches: any}>;
  hiddenItems: Array<boolean>;
  myPlayer: any;
  myMatches: any;
  myFilter: boolean;
  loggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Flights: FlightsService, public Auth: AuthService, private Userinfo: UserinfoService, private ModalCtrl: ModalController) {
    this.hiddenItems = [false, false, false];
    this.flight = navParams.get('flight');
    this.flightMatchesGrouped = [];
    this.flightMatches = [];
    this.flightPlayers = [];
    this.myPlayer = {};
    this.myMatches = [];
    this.myFilter = false;
  }

  public ionViewWillEnter() {
    this.Flights.loadFlightMatches(this.flight.id)
      .then(data => {
        this.flightMatches = data;
        this.groupFlightMatches();
        if(this.Auth.checkToken()) {
          this.Userinfo.getMyPlayers().then(players => {
            this.loggedIn = true;
            players.forEach(player => {
              if(player.flight == this.flight.id) {
                this.myPlayer = player;
                this.getMyMatches();
              }
            });
          });
        }
      });
    this.Flights.loadFlightPlayers(this.flight.id)
      .then(data => {
        this.flightPlayers = data;
      });


  }

  toggleItem(item) {
    if (this.isItemHidden(item)) {
        this.hiddenItems[item] = false;
    } else {
        this.hiddenItems[item] = true;
    }
  };

  isItemHidden(item) {
    return (this.hiddenItems[item] === true);
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

  flightMatchesGroupedAndFiltered() {
    if(this.isItemHidden(2)) {
      return this.myMatches;
    }
    else {
      return this.flightMatchesGrouped;
    }
  }

  getMyMatches() {
    this.flightMatchesGrouped.forEach(group => {
      group.matches.forEach(match => {
        if(match.home_player.id == this.myPlayer.id || match.visitor_player.id == this.myPlayer.id) {
          match.descriptor = (match.home_player.id == this.myPlayer.id ? "Home" : "Visiting") + " versus " + (match.home_player.id == this.myPlayer.id ? match.visitor_player.name : match.home_player.name);
          this.myMatches.push({
            scheduledDate: match.scheduled_date,
            matches: [match]
          });
        }
      });
    });
  }

  enterScore(matchId) {
    let matchFound = false;
    let that = this;
    this.flightMatches.forEach(match => {
      if(match.id == matchId) {
        console.log("Found match by id:", matchId, match.id);
        matchFound = true;
        let modal = that.ModalCtrl.create(ScoreModal, {player: that.myPlayer, match: match});
        modal.onDidDismiss(data => {
          this.Flights.updateMatch(match);
        });
        modal.present();
      }
    }, that);
    if (!matchFound) {
      console.log("Did not find match by id:", matchId);
    }
  }

}
