import { PrivilegeService } from './../../../service/privilege.service';
import { BaseComponent } from 'src/app/_base/base.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/app/model/permission.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/service/permission.service';
import { QueryParam } from 'src/app/_base/query.param';
import { Utility } from 'src/app/_base/utility';
import { Privilege } from 'src/app/model/privilege.model';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent extends BaseComponent {

  form: FormGroup;
  permission: Permission;
  dataSource = [];
  dataSourcePrivilege = [];
  selectedPrivileges = [];
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private privilegeService:PrivilegeService,
    private permissionService:PermissionService) {

    super();
  }
  
  init() {
    this.form = new FormGroup({
      name: new FormControl(this.permission.name, [
        Validators.required,
      ]),
      privilege: new FormControl(this.permission.privileges),
      
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.load(params['id']);
      this.privilegeService.listprivilege().subscribe((response) => {
        this.dataSourcePrivilege = response['payload'];
        console.log(this.dataSourcePrivilege);
      });
    });
  }

  getData(qp: QueryParam) {
    return this.privilegeService.listprivilege();
  }

  onRoleChanged(privilege: any) {
    this.permission.privileges = [privilege.value];
  }

  ngAfterViewInit() {
  }

  actionSave(){
    if (!this.form.valid) {
      return;
    }
    
    const model = this.form.value;
    this.permission.name = model.name;
    this.permission.privileges =model.privilege;

    
    if (Utility.isEmpty(this.permission.id)) {
      this.permissionService.createPermission(this.permission).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/permissions']);
        }
      });
    } else {
      this.permissionService.updatePermission(this.permission).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/permissions']);
        }
      });
    }
  
  }
  
    private load(id: any) {
      if (Utility.isEmpty(id)) {
        this.permission = new Permission();
        this.init();
        return;
      }
      this.permissionService.retrievePermission(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.permission = Object.assign(new Permission(), response['payload']);
          this.selectedPrivileges = this.permission.privileges;
          console.log(this.selectedPrivileges);
          this.init();
        }
      });
      
}

public compareWith(object1: Privilege, object2: Privilege) {
  console.log(object1.id)
  console.log(object1.name)
  return object1.id && object2.id && object1.name === object2.name;
}

}
