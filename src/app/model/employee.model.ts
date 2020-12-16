import { Role } from './role.model';
import { Permission } from './permission.model';
import { Base } from "./base.model";
import { Privilege } from './privilege.model';

export class Employee extends Base {
    name: string;
    lastName:string;
    roles?: Role[];

    constructor() {
      super();
    }
}