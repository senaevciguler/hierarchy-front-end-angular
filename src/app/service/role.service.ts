import { Role } from './../model/role.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private userSubject: BehaviorSubject<Role>;
  public role: Observable<Role>;


  constructor(protected http:HttpClient) {
    
   }

  listRoles(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Role[]>(`${environment.apiURL}/roles`, {
        params: qp.toURLSearchParams()
    });
}
  deleteRoles(id:any){
    return this.http.delete(`${environment.apiURL}/roles/${id}`);
  }
  retrieveRoles(id:any){
    return this.http.get<Role>(`${environment.apiURL}/roles/${id}`);
  }
  updateRole(model: Role){
    return this.http.put(`${environment.apiURL}/roles/${model.id}`, model);
  }
  createRole(model: Role){
    return this.http.post(`${environment.apiURL}/roles` ,model);
  }
}
