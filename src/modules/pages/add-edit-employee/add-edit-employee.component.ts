import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss'],
})
export class AddEditEmployeeComponent implements OnInit {
  addEmpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  btnText: string = '';
  dialogRef = inject(MatDialogRef<AddEditEmployeeComponent>);
  empDetails: any = {};
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {
    console.log('EmployeeService:', this.employeeService);
  }

  ngOnInit(): void {
    this.btnText = this.data?.isEdit ? 'Edit' : 'Add';
    if (this.data) {
      this.addEmpForm.patchValue(this.data.rowData);
    }
  }

  addEmployee(): void {
    this.empDetails = this.addEmpForm.value;
    this.dialogRef.close(this.empDetails); // Pass data back to parent
  }
}
