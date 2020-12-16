import { Privilege } from './../model/privilege.model';
import { Role } from './../model/role.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParam } from '../_base/query.param';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private userSubject: BehaviorSubject<Privilege>;
  public privilege: Observable<Privilege>;


  constructor(protected http:HttpClient) {
    
   }

  listprivilege(qp?: QueryParam) {
    qp = qp || new QueryParam();
    return this.http.get<Privilege[]>(`${environment.apiURL}/privileges`, {
        params: qp.toURLSearchParams()
    });
}
  deletePrivilege(id:any){
    return this.http.delete(`${environment.apiURL}/privileges/${id}`);
  }
  retrievePrivilege(id:any){
    return this.http.get<Privilege>(`${environment.apiURL}/privileges/${id}`);
  }
  updatePrivilege(model: Privilege){
    return this.http.put(`${environment.apiURL}/privileges/${model.id}`, model);
  }
  createPrivilege(model: Privilege){
    return this.http.post(`${environment.apiURL}/privileges` ,model);
  }
}
