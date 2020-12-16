import { RoleService } from './../../../service/role.service';
import { PaginationListComponent } from 'src/app/_base/pagination.list.component';
import { Component, Inject, OnInit } from '@angular/core';
import { Role } from 'src/app/model/role.model';
import { Router } from '@angular/router';
import { AppConfirmService } from 'src/app/service/app-confirm/app-confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'src/app/service/app-loader/app-loader.service';
import { QueryParam } from 'src/app/_base/query.param';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends PaginationListComponent {

  roles: Role[]
  role:Role = new Role();
  message:String
  displayedColumns = ['name','permissions','actions'];

  constructor(
    @Inject(RoleService) private service: RoleService, private router:Router,
    private snack: MatSnackBar,  private confirmService: AppConfirmService,
    private loader: AppLoaderService) {
    super();
      }


      ngOnInit() {
        super.ngOnInit();
        this.service.listRoles(QueryParam.ALL).subscribe((response) => {
          this.dataSource = response['payload'];
        });
      }
    
    
      getData(qp: QueryParam) {
        return this.service.listRoles(qp);
      }
      getFilters(): Map<string, any> {
        return new Map()
          .set('name', this.role.name);
      }
      
      delete(id){    
        this.confirmService.confirm({message: `Delete ${id}?`})
          .subscribe(res => {
            if (res) {
              this.loader.open();
              this.service.deleteRoles(id)         
              .subscribe(response => {
                  this.dataSource = this.roles;
                  this.loader.close();
                  this.message =`Delete of Employee ${id} Successful!`;
                  this.snack.open('Member deleted!', 'OK', { duration: 4000 })     
                  this.refresh();
                })
            }
          })
          
      }
      
      update(id){
        console.log(`update ${id}`)
        this.router.navigate([`roles/profile/${id}`])
      }
      
      actionClear() {
        this.role = new Role();
      }
    
      actionDelete(row: Role) {
        alert('Not implemented');
      }
}
