import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({ selector: '[cvGenHideElement]' })
export class HideElementDirective implements OnInit, AfterViewInit {
  @Input() cvGenHideElement: number;

  private isCreated = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe((res) => {
        const size = (res.target as Window).innerWidth;
        if (size > this.cvGenHideElement) {
          if (!this.isCreated) {
            this.renderer.setStyle(
              this.element.nativeElement,
              'display',
              'block'
            );
            this.isCreated = true;
          }
        } else {
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          this.isCreated = false;
        }
      });
  }

  ngAfterViewInit() {
    const initInnerWidth = window.innerWidth;
    if (initInnerWidth > this.cvGenHideElement) {
      if (!this.isCreated) {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'block');
        this.isCreated = true;
      }
    } else {
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      this.isCreated = false;
    }
  }
}

// import {
//   AfterViewInit,
//   ChangeDetectorRef,
//   Directive,
//   Input,
//   NgZone,
//   TemplateRef,
//   ViewContainerRef,
// } from '@angular/core';
// import { debounceTime, fromEvent } from 'rxjs';

// @Directive({ selector: '[cvGenHideElement]' })
// export class HideElementDirective implements AfterViewInit {
//   @Input() cvGenHideElement: number;

//   private isCreated = false;

//   constructor(
//     private element: TemplateRef<unknown>,
//     private vcr: ViewContainerRef,
//     private ngZone: NgZone,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.manageElementVisibility();

//     fromEvent(window, 'resize')
//       .pipe(debounceTime(500))
//       .subscribe(() => {
//         this.manageElementVisibility();
//         this.cdr.markForCheck();
//       });
//   }

//   ngAfterViewInit() {
//     const initInnerWidth = window.innerWidth;
//     if (initInnerWidth > this.cvGenHideElement) {
//       this.manageElementVisibility();
//       this.cdr.markForCheck();
//     }
//   }

//   private manageElementVisibility(): void {
//     this.ngZone.run(() => {
//       const size = window.innerWidth;

//       if (size > this.cvGenHideElement) {
//         if (!this.isCreated) {
//           this.vcr.createEmbeddedView(this.element);
//           this.isCreated = true;
//         }
//       } else {
//         this.vcr.clear();
//         this.isCreated = false;
//       }
//     });
//   }
// }
