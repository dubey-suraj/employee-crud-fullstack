import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-employee',
  imports: [ButtonModule, MatDialogModule],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss',
})
export class DeleteEmployeeComponent {
  public dialogRef = inject(MatDialogRef<DeleteEmployeeComponent>);

  onClose(result: boolean): void {
    this.dialogRef.close(result);
    console.log('Dialog closed with result:', result);
  }
}
