import { PrivilegeService } from './../../../service/privilege.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Privilege } from 'src/app/model/privilege.model';
import { BaseComponent } from 'src/app/_base/base.component';
import { Utility } from 'src/app/_base/utility';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent extends BaseComponent   {

  form: FormGroup;
  privilege: Privilege;
  dataSource = [];
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private service:PrivilegeService) {

    super();
  }
  
  init() {
    this.form = new FormGroup({
      name: new FormControl(this.privilege.name, [
        Validators.required,
      ]),
    });

    this.isComponentReady = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
    this.loadPrivilege(params['id']);
    });

  }

  ngAfterViewInit() {
  }


  actionSave(){
    if (!this.form.valid) {
      return;
    }
    
    const model = this.form.value;
    this.privilege.name = model.name;
    
    if (Utility.isEmpty(this.privilege.id)) {
      this.service.createPrivilege(this.privilege).subscribe(response => {
        console.log(response)
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/privileges']);
        }
      });
    } else {
      this.service.updatePrivilege(this.privilege).subscribe(response => {
        if (Utility.isSuccess(response)) {
          this.router.navigate(['/privileges']);
        }
      });
    }
  
  }
  
    private loadPrivilege(id: any) {
      if (Utility.isEmpty(id)) {
        this.privilege = new Privilege();
        this.init();
        return;
      }
      this.service.retrievePrivilege(id).subscribe((response) => {
        if (Utility.isSuccess(response)) {
          this.privilege = Object.assign(new Privilege(), response['payload']);
          this.init();
        }
      });
  
    }
      
}
