import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SignupComponent } from '../signup/signup.component';

import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,HeaderComponent,SignupComponent,RouterModule,LoginComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

}
