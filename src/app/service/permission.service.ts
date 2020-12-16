import { Permission } from './../model/permission.model';
import { Role } from './../model/role.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private userSubject: BehaviorSubject<Permission>;
  public role: Observable<Permission>;


  constructor(protected http:HttpClient) {
    
   }

  listPermission(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Permission[]>(`${environment.apiURL}/permissions`, {
        params: qp.toURLSearchParams()
    });
}
  deletePermission(id:any){
    return this.http.delete(`${environment.apiURL}/permissions/${id}`);
  }
  retrievePermission(id:any){
    return this.http.get<Permission>(`${environment.apiURL}/permissions/${id}`);
  }
  updatePermission(model: Permission){
    return this.http.put(`${environment.apiURL}/permissions/${model.id}`, model);
  }
  createPermission(model: Permission){
    return this.http.post(`${environment.apiURL}/permissions` ,model);
  }
}