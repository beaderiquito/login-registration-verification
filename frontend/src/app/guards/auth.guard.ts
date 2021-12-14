import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //check if session is expired
    if (this.getWithExpiry('currentUser')) {

    }
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  getWithExpiry(key: string){
    const itemStr = localStorage.getItem(key)

    // if the item does not exist, return null
    if(!itemStr){
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date()

    // compare the expiry time of the item with current time
    if(now.getTime() > item.expiry) {
      // if the item is expired, delete the item from storage
      localStorage.removeItem(key)
      return null;
    }

    // else return the item value
    return item.value
  }
}
