import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.background-color') backgroundColor: string;

  constructor(private elRef: ElementRef, private render: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    // this.render.setStyle(this.elRef.nativeElement, 'background-color', 'blue', );
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    // this.render.setStyle(this.elRef.nativeElement, 'background-color', 'blue' );
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.render.setStyle(this.elRef.nativeElement, 'background-color', 'transparent' );
    this.backgroundColor = this.defaultColor;
  }

}
