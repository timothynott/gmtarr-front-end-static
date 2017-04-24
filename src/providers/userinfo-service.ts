import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

@Injectable()
export class UserinfoService {

  userinfo: any;
  myPlayers: any;

  constructor(public http: Http, private Auth: AuthService) {
    this.userinfo = false;
    this.myPlayers = false;
  }

  getUserInfo() {
    if(this.userinfo) {
      return this.userinfo;
    }
    return this.getUserInfoFromAPI();
  }

  getUserInfoFromAPI() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/userinfo')
        .map(res => res.json())
        .subscribe(
          data => {
            this.userinfo = data;
            resolve(data);
          },
          err => {
            reject(err);
          });
    });
  }

  getMyPlayers(){
    if(!this.myPlayers) {
      return new Promise((resolve, reject) => {
        let authHeader = new Headers();
        authHeader.append('Authorization', 'JWT ' + this.Auth.getToken());
        this.http.get('/api/players/mine', {headers: authHeader})
          .map(res => res.json())
          .subscribe(
            data => {
              this.myPlayers = data;
              resolve(data);
            },
            err => {
              reject(err);
            });
      });
    }
    else {
      return Promise.resolve(this.myPlayers);
    }
  }

}
