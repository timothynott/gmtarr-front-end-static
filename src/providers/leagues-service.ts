import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service'

@Injectable()
export class LeaguesService {

  leagues: any;

  constructor(private http: Http, private Auth: AuthService) {
    this.leagues = [];
  }

  loadLeagues() {
    if (this.leagues.length) {
      return Promise.resolve(this.leagues);
    }

    return new Promise(resolve => {
      this.http.get('/api/leagues')
        .map(res => res.json())
        .subscribe(data => {
          this.leagues = data;
          resolve(this.leagues);
        });
    });
  }

}
