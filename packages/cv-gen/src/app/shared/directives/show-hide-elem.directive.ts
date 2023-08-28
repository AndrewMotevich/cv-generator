import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  Input,
  NgZone,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({ selector: '[cvGenHideElement]' })
export class HideElementDirective implements OnInit, AfterViewInit {
  @Input('cvGenHideElement') public params: {breakpoint: number, isMobile?: boolean};

  private isCreated = false;

  constructor(
    private element: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.manageElementVisibility();
      });
  }

  public ngAfterViewInit() {
    this.manageElementVisibility();
  }

  private manageElementVisibility(): void {
    this.ngZone.run(() => {
      const comparedValues = {
        firstValue: this.params.isMobile ? this.params.breakpoint : window.innerWidth,
        secondValue: this.params.isMobile ? window.innerWidth : this.params.breakpoint,
      };
      if (comparedValues.firstValue > comparedValues.secondValue) {
        if (!this.isCreated) {
          this.vcr.createEmbeddedView(this.element);
          this.isCreated = true;
        }
      } else {
        this.vcr.clear();
        this.isCreated = false;
      }
      this.cdr.detectChanges();
    });
  }
}
