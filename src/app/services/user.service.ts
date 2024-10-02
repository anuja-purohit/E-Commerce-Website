import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  setUser(user: any): void {
    this.userSubject.next(user);
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  clearUser(): void {
    this.userSubject.next(null);
    sessionStorage.removeItem('loggedInUser');
  }

  loadUserFromSession(): void {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  getUser(): any {
    return this.userSubject.value;
  }
}
