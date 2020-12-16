import {BaseComponent} from './base.component';
import {OnInit, ViewChild, Directive, Input, Output} from '@angular/core';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {QueryParam} from './query.param';
import {Utility} from './utility';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Directive()
export abstract class PaginationListComponent extends BaseComponent implements OnInit {
  dataSource;
  resultsLength = 0;
  pageSize = QueryParam.DEFAULT_ITEMS_PER_PAGE;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort = {} as MatSort;

  ngOnInit() {
    super.ngOnInit();
    // If the user changes the sort order, reset back to the first page.
    this.paginator.pageIndex = 0;
    this.sort.direction='';
    this.refresh();
  }

  public refresh() {
    console.log('test refresh pagination');
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const qp = new QueryParam(this.pageSize, this.paginator.pageIndex)
            .setSortQuery(this.sort.active, this.sort.direction)
            .addFilters(this.getFilters());
          Utility.debug('Query Params', qp);
          return this.getData(qp);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['payload']['totalElements'] || data['payload']['total_items'];
          const result = data['payload'] || data['payload']['items'];
          this.onDataLoaded(result);
          return result;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Return empty data.
          this.isRateLimitReached = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  onDataLoaded(data: any[]) {

  }

  actionSearch() {
    this.refresh();
  }

  /**
  * Call related service method
  * @param {QueryParam} qp
  */
 abstract getData(qp: QueryParam);

 /**
  * This is added into query params while refreshing
  *
  * @return {Map<string, any>} can be null or undefined
  */
 abstract getFilters(): Map<string, any>;
}
