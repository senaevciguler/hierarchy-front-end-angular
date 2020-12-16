import { PrivilegeService } from './../../../service/privilege.service';
import { Privilege } from './../../../model/privilege.model';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { QueryParam } from 'src/app/_base/query.param';

@Component({
  selector: 'app-privilege-list',
  templateUrl: './privilege-list.component.html',
  styleUrls: ['./privilege-list.component.css']
})
export class PrivilegeListComponent extends PaginationListComponent {

  priviliges: Privilege[]
  privilege:Privilege = new Privilege();
  message:String
  displayedColumns = ['name','actions'];

  constructor(
    @Inject(PrivilegeService) private privilegeService: PrivilegeService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
    private loader: AppLoaderService) {
    super();
      }

  ngOnInit(): void {
    super.ngOnInit();
    this.privilegeService.listprivilege(QueryParam.ALL).subscribe((response) => {
      this.dataSource = response['payload'];
    });
  }
  getData(qp: QueryParam) {
    return this.privilegeService.listprivilege(qp);
  }

  getFilters(): Map<string, any> {
    return new Map()
      .set('name', this.privilege.name);
  }

  delete(id) {
    this.confirmService.confirm({message: `Delete ${id}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.privilegeService.deletePrivilege(id)
          .subscribe(
            response => {
              console.log(response);
              this.dataSource = this.priviliges;
              this.loader.close();
              this.refresh();
            })
        }
      })
  }


  update(id) {
    console.log(`update ${id}`)
    this.router.navigate([`privileges/profile/${id}`])
  }

  actionClear() {
    this.privilege = new Privilege();
  }
  add(){
    this.router.navigate(['privileges/profile'])
  }

}
