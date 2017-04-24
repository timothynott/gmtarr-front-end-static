import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: "score.html"
})
export class ScoreModal{
  matches: any;
  player: any;
  matchScore: any;
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
  listPlayers: any[] = [
    {id: 2, name: 'bob vila'},
    {id: 3, name: 'bob barker'}
  ];
  constructor(params: NavParams, public ViewCtrl: ViewController) {
    this.matches = params.data.matches;
    this.player = params.data.player;
    this.matchScore = {
      id: 0,
      played_date: '2017-04-17',
      scoreHome: '10',
      scoreVisitor: '2',
      status: 'completed',
      winner: 0
    };
    console.log(this.matches);
  }

  validate() {
    // make sure everything is kosher
  }

  formUpdate(){
    if(this.matchScore.id) {
      this.matches.forEach(matchWeek => {
        if (matchWeek.matches[0].id == this.matchScore.id) {

        }
      });
      // update the list of players
    }
    else {
      this.formReset()
    }
  }

  formReset() {
    this.matchScore = {
      id: 0,
      played_date: '',
      scoreHome: '',
      scoreVisitor: '',
      status: '',
      winner: 0
    };
  }

  dismiss() {
    this.ViewCtrl.dismiss();
  }
}
