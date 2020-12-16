import { HomeComponent } from './components/home/home.component';
import { RoleComponent } from './components/roleComponents/role/role.component';
import { RoleListComponent } from './components/roleComponents/role-list/role-list.component';
import { EmployeeComponent } from './components/employeeComponents/employee/employee.component';
import { EmployeeListComponent } from './components/employeeComponents/employee-list/employee-list.component';
import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionListComponent } from './components/permissionComponents/permission-list/permission-list.component';
import { PermissionComponent } from './components/permissionComponents/permission/permission.component';
import { PrivilegeListComponent } from './components/privilegeComponents/privilege-list/privilege-list.component';
import { PrivilegeComponent } from './components/privilegeComponents/privilege/privilege.component';



const routes: Routes = [

  {path: '', component:HomeComponent},

  {path:'employees', component:EmployeeListComponent},
  {path:'employees/profile', component:EmployeeComponent},
  {path:'employees/profile/:id', component:EmployeeComponent},

  {path:'permissions', component:PermissionListComponent},
  {path:'permissions/profile', component:PermissionComponent},
  {path:'permissions/profile/:id', component:PermissionComponent},

  {path:'privileges', component:PrivilegeListComponent},
  {path:'privileges/profile', component:PrivilegeComponent},
  {path:'privileges/profile/:id', component:PrivilegeComponent},

  {path:'roles', component:RoleListComponent},
  {path:'roles/profile', component:RoleComponent},
  {path:'roles/profile/:id', component:RoleComponent},
 
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
