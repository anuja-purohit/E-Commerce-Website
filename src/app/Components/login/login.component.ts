import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MockBackendService } from 'src/app/services/mock-backend.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mockBackendService: MockBackendService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.mockBackendService.validateUser(username, password).subscribe({
        next: (user) => {
          if (user) {
            console.log('Login successful');
            this.userService.setUser(user);
            sessionStorage.setItem('loggedInUserId', user.id);
            this.router.navigate(['/product-listing']);
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (error) => {
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Login error:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}