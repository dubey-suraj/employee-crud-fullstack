import { Component, OnInit } from '@angular/core';
import { EmployeeLandingComponent } from '../modules/pages/employee-landing/employee-landing.component';

@Component({
  selector: 'app-root',
  imports: [EmployeeLandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  employeeData: any = [];

  constructor() {}

  ngOnInit(): void {
    console.log('hello');
  }
}
