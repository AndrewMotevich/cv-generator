import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[cvGenHideElement]' })
export class HideElementDirective {
  constructor(private element: ElementRef) {}
}
