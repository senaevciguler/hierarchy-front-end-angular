import { PermissionService } from './../../../service/permission.service';
import { RoleService } from './../../../service/role.service';
import { BaseComponent } from 'src/app/_base/base.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/model/role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParam } from 'src/app/_base/query.param';
import { Utility } from 'src/app/_base/utility';
import { Permission } from 'src/app/model/permission.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends BaseComponent {

  form: FormGroup;
  role: Role;
  dataSource = [];
  dataSourcePermission = [];
  selectedPermission = [];
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private roleService:RoleService,
    private permissionService:PermissionService) {

    super();
  }
  
  init() {
    this.form = new FormGroup({
      name: new FormControl(this.role.name, [
        Validators.required,
      ]),
      permission: new FormControl(this.role.permissions),
      
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.loadRoles(params['id']);
      this.permissionService.listPermission().subscribe((response) => {
        this.dataSourcePermission = response['payload'];
        console.log(this.dataSourcePermission);
      });
    });
  }

  getData(qp: QueryParam) {
    return this.permissionService.listPermission();
  }

  onRoleChanged(permission: any) {
    this.role.permissions = [permission.value];
  }

  ngAfterViewInit() {
  }

  actionSave(){
    if (!this.form.valid) {
      return;
    }
    
    const model = this.form.value;
    this.role.name = model.name;
    this.role.permissions =model.permission;

    
    if (Utility.isEmpty(this.role.id)) {
      this.roleService.createRole(this.role).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/roles']);
        }
      });
    } else {
      this.roleService.updateRole(this.role).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/roles']);
        }
      });
    }
  
  }
  
    private loadRoles(id: any) {
      if (Utility.isEmpty(id)) {
        this.role = new Role();
        this.init();
        return;
      }
      this.roleService.retrieveRoles(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.role = Object.assign(new Role(), response['payload']);
          this.selectedPermission = this.role.permissions;
          console.log(this.selectedPermission);
          this.init();
        }
      });
      
}

public compareWith(object1: Permission, object2: Permission) {
  console.log(object1.id)
  console.log(object1.name)
  return object1.id && object2.id && object1.name === object2.name;
}
}
