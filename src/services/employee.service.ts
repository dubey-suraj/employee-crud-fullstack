import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../api.constats';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployee(): Observable<any>{
    return this.http.get(employee.Get)
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(employee.Post, employeeData);
  }

  deleteEmployee(employeeId: string): Observable<any> {
     return this.http.delete(employee.Delete.replace('{id}', employeeId));
  }

  updateEmployee(employeeData: any): Observable<any> {
    return this.http.put(employee.Put, employeeData);
  }
}
