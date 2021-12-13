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
    localStorage.setItem('currentUser', JSON.stringify(username));
    this.router.navigateByUrl('');
  }

}
