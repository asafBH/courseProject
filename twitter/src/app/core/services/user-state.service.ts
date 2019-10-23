import { Injectable } from '@angular/core';
import { Store } from './store';
import { CoreDataService } from './core-data.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends Store<any> {

  constructor(private data: CoreDataService, private router: Router) { 
    super(null);

    if(localStorage.getItem('user')) {
      this.setState(JSON.parse(localStorage.getItem('user')));
    }
  }

  register(registrationDetails: {email: string, user: string, password: string}){
    return this.data.registerUser(registrationDetails).pipe(
      tap(res => localStorage.setItem('user', JSON.stringify(res.userDetails))),
      tap(res => this.setState(res.userDetails))
    )
  }

  login(loginDetails: {email: string, password: string}){
    return this.data.login(loginDetails).pipe(
      tap(res => localStorage.setItem('user', JSON.stringify(res.userDetails))),
      tap(res => this.setState(res.userDetails))
    )
  }

  logout() {
    return this.data.logout().pipe(
      tap(res => localStorage.removeItem('user')),
      tap(res => this.setState(null)),
      tap(res => this.router.navigate(['login']))
    ).subscribe()
  }


}
