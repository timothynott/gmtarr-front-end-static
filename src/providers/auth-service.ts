import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserinfoService } from './userinfo-service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  token: any;
  authArgs: any;
  ssoCode: any = '';

  constructor(public http: Http, private Userinfo: UserinfoService) {
    this.token = {};
    this.authArgs = {
        'client_id': 'roundrobin',
        'redirect_uri': '',
        'scope': 'contacts_me',
      };
  }

  checkToken() {
    if(this.token.hasOwnProperty('token')){
      return true;
    }
    return false;
  }

  validateToken() {
    // use a call to userinfo to see if our token is valid
    this.Userinfo.getUserInfoFromAPI()
      .then(value => {
        // doesn't matter what the value is, the token is valid
        return true;
      })
      .catch(err => {
        return false;
      })
  }

  login(route: string) {
    let redirect_uri = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
    this.authArgs.redirect_uri = redirect_uri + '?route=' + route;
    let queryString = '';
    for (let key in this.authArgs) {
      if (this.authArgs.hasOwnProperty(key)) {
        queryString += key + '=' + encodeURIComponent(this.authArgs[key]) + '&';
      }
    }
    let waLoginUrl = 'https://www.gmtatennis.org/sys/login/OAuthLogin';
    window.location.replace(waLoginUrl+'?'+queryString);
  }

  setSSOCode(code) {
    this.ssoCode = code;
  }

  requestToken(code, redirect_uri) {
    this.setSSOCode(code);
    this.http.get('/api/auth-token?code=' + code + '&redirect_uri=' + redirect_uri)
      .map(res => res.json())
      .subscribe(
        data => {
          this.token = data;
        },
        err => {
          console.log('Auth.getToken error:', err);
        });
  }

  getToken(){
    return this.token.token;
  }


}
