import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export abstract class BaseService {
  apiContext = environment.apiURL;

  /**
   *
   * @returns {string}
   */
  protected getApiContext(): string {
    return this.apiContext;
  }
}
