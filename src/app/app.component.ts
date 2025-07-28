import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  employeeData: any = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    console.log('hello');
    this.getEmployeeDetails();
  }

  getEmployeeDetails(): void {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeData = data;
      console.log(data)
    });
  }
}
