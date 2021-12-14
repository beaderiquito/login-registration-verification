import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _username: string = "";
  private _password: string = "";

  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string){
    return this.http.get(environment.hostUrl + `/api/v1/login`,
      {headers: {authorization: this.createBasicAuthToken(username, password)}}).pipe(map((rest) => {
        this._username = username;
        this._password = password;
        this.registerSuccessfulLogin(username);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string){
    const daysBeforeExpiration = 3;
    const inMilliseconds = daysBeforeExpiration * 24 * 60 * 60 * 1000;
    this.setExpiryDate('currentUser', username, inMilliseconds);
    this.router.navigateByUrl('/');
  }

  setExpiryDate(key:string, value:string, ttl:number){
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item));
  }

}
