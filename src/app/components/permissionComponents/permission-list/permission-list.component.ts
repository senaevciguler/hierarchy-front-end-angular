import { Permission } from './../../../model/permission.model';
import { PermissionService } from './../../../service/permission.service';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { QueryParam } from 'src/app/_base/query.param';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent extends PaginationListComponent {

  permissions: Permission[]
  permission:Permission = new Permission();
  message:String
  displayedColumns = ['name','privileges','actions'];

  constructor(
    @Inject(PermissionService) private service: PermissionService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
    private loader: AppLoaderService) {
    super();
      }


      ngOnInit() {
        super.ngOnInit();
        this.service.listPermission(QueryParam.ALL).subscribe((response) => {
          this.dataSource = response['payload'];
        });
      }
    
    
      getData(qp: QueryParam) {
        return this.service.listPermission(qp);
      }


      getFilters(): Map<string, any> {
        return new Map()
          .set('name', this.permission.name);
      }
      
      delete(id){    
        this.confirmService.confirm({message: `Delete ${id}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.service.deletePermission(id)
          .subscribe(
            response => {
              console.log(response);
              this.dataSource = this.permissions;
              this.loader.close();
              this.refresh();
            })
        }
      })
          
      }
      
      update(id){
        console.log(`update ${id}`)
        this.router.navigate([`permissions/profile/${id}`])
      }
      
      actionClear() {
        this.permission = new Permission();
      }
    
      actionDelete(row: Permission) {
        alert('Not implemented');
      }

}
