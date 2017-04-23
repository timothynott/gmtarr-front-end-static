import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserinfoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserinfoService {

  userinfo: any;

  constructor(public http: Http) {
    this.userinfo = false;
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
}
