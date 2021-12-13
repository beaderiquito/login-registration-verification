import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string = "";
  private password: string = "";

  constructor(private http: HttpClient) { }

  setUsername(username: string){
    this.username = username;
  }

  setPassword(password: string){
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  getPassword(){
    return this.username;
  }

  login(username: string, password: string){
    return this.http.get(environment.hostUrl + `/api/v1/login`,
      {headers: {authorization: this.createBasicAuthToken(username, password)}}).pipe(map((rest) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string){
    //save the username to session
  }

}
