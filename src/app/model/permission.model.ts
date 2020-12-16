import { Privilege } from './privilege.model';
import { Base } from "./base.model";

export class Permission extends Base {
  
  name: string;
  privileges: Privilege[];
    
  }