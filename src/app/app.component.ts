import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from './services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'universal-shopping';
  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login' && this.userService.getUser()) {
          this.userService.clearUser();
          alert('You have been logged out.');
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
