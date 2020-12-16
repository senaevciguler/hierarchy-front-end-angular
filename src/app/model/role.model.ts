import { Permission } from './permission.model';
import { Base } from "./base.model";

export class Role extends Base {
  name: string; 
  permissions: Permission[];   
  }