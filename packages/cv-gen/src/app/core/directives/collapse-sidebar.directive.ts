import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[cvGenCollapseSidebar]' })
export class CollapseSidebarDirective {
  @Input() isCollapsed = false;

  constructor(private element: ElementRef) {
  }
}
