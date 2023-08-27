import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({ selector: '[cvGenCollapseSidebar]' })
export class CollapseSidebarDirective implements OnInit {
  @Input() public cvGenCollapseSidebar: Observable<boolean>;

  private spanElements: HTMLElement[];

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.spanElements = this.element.nativeElement.querySelectorAll('span');
    this.cvGenCollapseSidebar.subscribe((value) => {
      if (value) {
        this.element.nativeElement.style.width = '5rem';

        this.spanElements.forEach((elem) => {
          this.renderer.setStyle(elem, 'display', 'none');
        });
      } else {
        this.element.nativeElement.style.width = '18rem';

        this.spanElements.forEach((elem) => {
          this.renderer.setStyle(elem, 'display', 'inline');
        });
      }
    });
  }
}
