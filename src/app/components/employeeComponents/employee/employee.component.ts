import { PermissionService } from './../../../service/permission.service';
import { PrivilegeService } from './../../../service/privilege.service';
import { RoleService } from './../../../service/role.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { QueryParam } from 'src/app/_base/query.param';
import { Utility } from 'src/app/_base/utility';
import {BaseComponent} from '../../../_base/base.component';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseComponent {

  employeeForm: FormGroup;
  employee: Employee;
  dataSource = [];
  dataSourceRoles = [];
  selectedRoles = [];
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private employeeService:EmployeeService,
    private roleService:RoleService,) {

    super();
  }
  
  init() {
    this.employeeForm = new FormGroup({
      name: new FormControl(this.employee.name, [
        Validators.required,
      ]),
      lastName: new FormControl(this.employee.lastName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      roleUser: new FormControl(this.employee.roles),
      
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.loadEmployee(params['id']);
      this.roleService.listRoles().subscribe((response) => {
        this.dataSourceRoles = response['payload'];
        console.log(this.dataSourceRoles);
      });
    });
  }

  getData(qp: QueryParam) {
    return this.roleService.listRoles();
  }
  	  
  onRoleChanged(roleUser: any) {
    this.employee.roles = [roleUser.value];
  }

  ngAfterViewInit() {
  }

  actionSave(){
    if (!this.employeeForm.valid) {
      return;
    }
    
    const model = this.employeeForm.value;
    this.employee.name = model.name;
    this.employee.lastName = model.lastName;
    this.employee.roles =model.roleUser;

    
    if (Utility.isEmpty(this.employee.id)) {
      this.employeeService.createEmployee(this.employee).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/employees']);
        }
      });
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/employees']);
        }
      });
    }
  
  }
  
    private loadEmployee(id: any) {
      if (Utility.isEmpty(id)) {
        this.employee = new Employee();
        this.init();
        return;
      }
      this.employeeService.retrieveEmployee(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.employee = Object.assign(new Employee(), response['payload']);
          this.selectedRoles = this.employee.roles;
          console.log(this.selectedRoles);
          this.init();
        }
      });
      
}

public compareWith(object1: Role, object2: Role) {
  console.log(object1.id)
  console.log(object1.name)
  return object1.id && object2.id && object1.name === object2.name;
}


}