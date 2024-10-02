import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockBackendService } from 'src/app/services/mock-backend.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userFullName: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.loadUserFromSession();
    this.userService.user$.subscribe(user => {
      if (user) {
        this.userFullName = `${user.firstName} ${user.lastName}`;
      } else {
        this.userFullName = null;
      }
    });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}