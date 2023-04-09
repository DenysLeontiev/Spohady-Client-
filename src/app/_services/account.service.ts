import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = environment.baseUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient) { }

  login(user:any){
    return this.httpClient.post<User>(this.baseUrl + "account/login", user).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(user:any){
    return this.httpClient.post<User>(this.baseUrl + 'account/register', user).pipe(
      map((response:User) => {
        const user = response;
        if(user)
        {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  };
  

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
