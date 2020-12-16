import { RoleService } from './service/role.service';
import { PrivilegeService } from './service/privilege.service';
import { PermissionService } from './service/permission.service';
import { EmployeeService } from './service/employee.service';
import { AppLoaderService } from './service/app-loader/app-loader.service';
import { AppConfirmService } from './service/app-confirm/app-confirm.service';
import { ErrorComponent } from './error/error.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {LayoutModule} from '@angular/cdk/layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { EmployeeComponent } from './components/employeeComponents/employee/employee.component';
import { EmployeeListComponent } from './components/employeeComponents/employee-list/employee-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RoleListComponent } from './components/roleComponents/role-list/role-list.component';
import { RoleComponent } from './components/roleComponents/role/role.component';
import { PrivilegeComponent } from './components/privilegeComponents/privilege/privilege.component';
import { PrivilegeListComponent } from './components/privilegeComponents/privilege-list/privilege-list.component';
import { PermissionListComponent } from './components/permissionComponents/permission-list/permission-list.component';
import { PermissionComponent } from './components/permissionComponents/permission/permission.component';
import { HomeComponent } from './components/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    EmployeeComponent,
    EmployeeListComponent,
    RoleListComponent,
    RoleComponent,
    PrivilegeListComponent,
    PrivilegeComponent,
    PermissionListComponent,
    PermissionComponent,
    HomeComponent
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatButtonModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    

  ],
  providers: [AppConfirmService,AppLoaderService,EmployeeService,PermissionService,PrivilegeService,RoleService,
     {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
