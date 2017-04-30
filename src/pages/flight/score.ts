import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { FlightsService} from '../../providers/flights-service'

@Component({
  templateUrl: "score.html"
})
export class ScoreModal{
  match: any;
  player: any;
  score: any[] = [0,0];
  errors: any[];
  listStatus: any[] = [
    {data: 'completed', display: 'Completed'},
    {data: 'retired', display: 'Retired'},
    {data: 'default', display: 'Default'},
    {data: 'timed match', display: 'Timed match'}
  ];
  listWinner: any[] = [
    {data: 'home', display: 'Home'},
    {data: 'visitor', display: 'Visitor'},
    {data: 'double default', display: 'Double Default'}
  ];
  scoreOptionsHome: any[] = [
    {data: 0},
    {data: 1},
    {data: 2},
    {data: 3},
    {data: 4},
    {data: 5},
    {data: 6},
    {data: 7},
    {data: 8},
    {data: 9},
    {data: 10},
    {data: 11}
  ];
  scoreOptionsVisitor: any[] = [
    {data: 0},
    {data: 1},
    {data: 2},
    {data: 3},
    {data: 4},
    {data: 5},
    {data: 6},
    {data: 7},
    {data: 8},
    {data: 9}
  ];

  constructor(params: NavParams, public ViewCtrl: ViewController, private Flights: FlightsService) {
    this.match = params.data.match;
    this.player = params.data.player
    if(!this.match.played_date) this.match.played_date = this.match.scheduled_date;
    if(this.match.score) this.score = this.match.score.split("-");
    this.errors = new Array();
  }

  invalid() {
    // make sure everything is kosher
    let errors = new Array();
    let winner = parseInt(this.score[0]);
    let loser = parseInt(this.score[1]);
    if(this.match.status) {
      switch(this.match.status) {
        case 'completed':
          if(winner < 10) {
            errors.push("The winner of a completed match must score at least 10");
          }
          else if (winner == 10 && loser == 9) {
            errors.push("The winner of a completed must win by 2 unless there is a tie breaker");
          }
        case 'retired':
        case 'timed match':
          if (winner == 11 && loser < 9) {
            errors.push("The winner cannot score 11 unless the loser has at least 9");
          }
          if (winner < loser) {
            errors.push("Winner score must be higher than loser score unless the match is a double default: " + winner + "-" + loser);
          }
          break;
        case 'default':
          if(this.match.winner == "double default") {
            if (winner > 0 || loser > 0) {
              errors.push("The score of a double default must be 0-0");
            }
          }
          else if (winner != 10 || loser != 0) {
            errors.push("The score of a default is 10-0");
          }
          break;
      }
    }
    else {
      errors.push("Please select a match status");
    }
    if(!this.match.winner) {
      errors.push("Please select a winner");
    }
    if(!this.match.played_date) {
      errors.push("Please select a date played");
    }
    this.errors = errors;
    if(this.match.winner == "double default"){
      if (winner > 0 || loser > 0 || this.match.status != "default") {
        errors.push("The score of a double default must be 0-0 and the status must be 'default'");
      }
    }
    if(errors.length) {
      return true;
    }
    return false;
  }

  changeWinner() {
    if(this.match.winner == "double default"){
      this.score[0] = 0;
      this.score[1] = 0;
      this.match.status = "default";
    }
  }

  dismiss() {
    this.match.score = this.score[0] + "-" + this.score[1];
    let data = this.match;
    this.ViewCtrl.dismiss(data);
  }
}
