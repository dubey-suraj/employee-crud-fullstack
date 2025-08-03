import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { EMP_CONSTANTS } from './employee-landing-constants';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee-landing',
  imports: [ButtonModule, TableModule, NgFor],
  templateUrl: './employee-landing.component.html',
  styleUrl: './employee-landing.component.scss',
})
export class EmployeeLandingComponent implements OnInit {
  EMP_CONSTANTS = EMP_CONSTANTS;
  employeeSubscription!: Subscription;
  employeeData: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployeeDetails();
    console.log(this.employeeData);
  }

  getEmployeeDetails(): void {
    this.employeeSubscription = this.employeeService
      .getEmployee()
      .subscribe((data) => {
        this.employeeData = data;
      });
  }

  onAddEmp(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result === 'cancel')
          return;
        this.addEmployee(result);
        console.log('Dialog closed with result:', result);
      }
    });
  }

  deleteEmployee(employeeId: string): void {
    this.dialog
      .open(DeleteEmployeeComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.employeeService.deleteEmployee(employeeId).subscribe({
            next: (response) => {
              console.log('Employee deleted!', response);
              this.getEmployeeDetails();
            },
          });
        }
      });
  }

  addEmployee(employeeData: any): void {
    this.employeeService.addEmployee(employeeData).subscribe({
      next: (response) => {
        console.log('Employee added!', response);
        this.getEmployeeDetails(); // Refresh the employee list after addition
      },
      error: (err) => console.error('Error occurred:', err),
    });
  }

  updateEmployee(employeeData: any): void {
    this.employeeService.updateEmployee(employeeData).subscribe({
      next: (response) => {
        console.log('Employee updated!', response);
        this.getEmployeeDetails(); // Refresh the employee list after update
      },
      error: (error) => {
        console.error('Error updating employee:', error);
      },
    });
  }
  onDelete(rowData: any): void {
    this.deleteEmployee(rowData.id);
  }

  onEditEmp(rowData: any, isEdit: boolean): void {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: { rowData, isEdit },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result === 'cancel')
          return;
        const empData = result;
        empData.id = rowData.id; // Ensure the ID is set for updates
        this.updateEmployee(empData);
      }
    });
  }
}
