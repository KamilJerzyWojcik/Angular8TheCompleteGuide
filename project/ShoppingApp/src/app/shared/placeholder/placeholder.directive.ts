import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholde]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
