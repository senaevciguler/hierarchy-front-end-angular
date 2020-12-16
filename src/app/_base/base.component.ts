import {AfterViewInit, Directive, OnDestroy, OnInit} from '@angular/core';
import {Utility} from './utility';
import {Decorator} from '@angular/compiler-cli/src/ngtsc/reflection';

@Directive({
  selector: '[appBaseComponentDirective]',
})
export abstract class BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading = false;
  public title = 'hierarcy';
  public breakpoint = 2;
  public isMobile = false;

  public errors: string;
  public isComponentReady = false;

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  ngOnDestroy() {
    Utility.debug('Destroying');
  }

  ngAfterViewInit() {
    Utility.debug('After init');
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }


}
