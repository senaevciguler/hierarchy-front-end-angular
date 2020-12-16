/**
 * Query parameters for pagination
 */
import {Utility} from './utility';

export class QueryParam {

  static MAX_ITEMS_PER_PAGE = 300;

  static DEFAULT_ITEMS_PER_PAGE = 10;

  /**
   * Used for selection box and list box in which needed to show all records.
   * Nevertheless all means at most 300 rows. If you want to increase all records limit
   * increase 300.
   *
   * @deliveryType {QueryParam}
   */
  public static ALL = new QueryParam(QueryParam.MAX_ITEMS_PER_PAGE, 0);

  /**
   * parameter name as writing to url parameter
   * @deliveryType {string}
   */
  static PAGE = 'page';

  /**
   * parameter name as writing to url parameter
   * @deliveryType {string}
   */
  static PER_PAGE = 'size';

  static SORT = 'sortxx';

  static ORDER = 'order';

  /**
   * sortField=fieldName&sortOrder=ASC|DESC|UNSORTED
   */
  public sortQuery?: string;

  /**
   * Don't add "page" and "perPage" named keys to filters
   * @param {number} itemsPerPage The number of items per paginated page. [page]
   * @param {number} currentPage The current (active) page. [perPage]
   */
  constructor(public itemsPerPage?: number,
              public currentPage?: number,
              public filters?: Map<string, any>) {
    if (Utility.isEmpty(this.currentPage)) {
      this.currentPage = 0;
    }
  }

  /**
   * sortOrder=ASC|DESC|UNSORTED
   * @param {string} sortField
   * @param sortOrder
   * @return {QueryParam}
   */
  public setSortQuery(sortField: string, sortOrder: string): QueryParam {
    sortField = sortField || '';
    this.sortQuery = `${QueryParam.SORT}=${sortField}&${QueryParam.ORDER}=${sortOrder}`;
    return this;
  }

  public getFilters(): Map<string, any> {
    if (this.filters == null) {
      this.filters = new Map();
    }
    return this.filters;
  }

  /**
   * Don't add "page" and "perPage" named keys to filters
   * @param {string} key
   * @param value
   * @returns {QueryParam} this
   */
  public addFilter(key: string, value: any): QueryParam  {
    if (Utility.isDate(value)) {
      this.getFilters().set(key, Utility.formatDate(value));
    } else if (!Utility.isEmpty(value)) {
      this.getFilters().set(key, value);
    } else {
      this.getFilters().delete(key);
    }
    return this;
  }

  public toString = (): string => {
    return QueryParam.PAGE + '=' + this.currentPage + '&=' + QueryParam.PER_PAGE + this.itemsPerPage;
  }

  /**
   *
   * @param {boolean} dontAddEmptyKeys if true, keys whose values are empty don't be added to url parameters
   * @return {{page: string; perPage: string}}
   */
  public toURLSearchParams(dontAddEmptyKeys?: boolean) {
    dontAddEmptyKeys = dontAddEmptyKeys || false;
    const result = {};
    result [QueryParam.PAGE] = this.currentPage + '';
    result [QueryParam.PER_PAGE] = this.itemsPerPage + '';

    this.getFilters().forEach((value: string, key: any) => {
      if (dontAddEmptyKeys === false || (dontAddEmptyKeys === true && !Utility.isEmpty(value))) {
        result[key] = value;
      }
    });
    let sortStr = [];
    let keyValue = [];
    if (!Utility.isEmpty(this.sortQuery)) {
      sortStr = this.sortQuery.split('&'); // key=value format
      for (const sortEntry of sortStr) {
        keyValue = sortEntry.split('=');
        result[keyValue[0]] = keyValue[1];
      }
    }
    Utility.deepTrim(result);
    return result;
  }

  public addFilters(filters: Map<string, any>): QueryParam {
    if (!Utility.isEmpty(filters)) {
      filters.forEach((value, key) => {
        this.addFilter(key, value);
      });
    }
    return this;
  }
}
