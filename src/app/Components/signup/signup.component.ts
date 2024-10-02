import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockBackendService } from 'src/app/services/mock-backend.service';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mockBackendService: MockBackendService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  checkUsername(): void {
    const username = this.signupForm.get('username')?.value;
    this.mockBackendService.isUsernameTaken(username).subscribe(isTaken => {
      if (isTaken) {
        this.signupForm.get('username')?.setErrors({ nonUnique: true });
      }
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.mockBackendService.saveUser(this.signupForm.value).pipe(
        catchError(err => {
          console.error('Error occurred while saving user:', err);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
