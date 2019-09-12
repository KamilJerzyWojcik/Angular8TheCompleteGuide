// tslint:disable-next-line: max-line-length
import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnDestroy, DoCheck, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  @Input() element: {
    type: string,
    name: string,
    content: string;
  };

  @Input() name: string;

  @ViewChild('header', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) contentParagraph: ElementRef;
  //@ContentChild('header', {static: true})

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('on changes called!');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngOnInit() {
    console.log('on Init called!');
    console.log('content child: ', this.contentParagraph.nativeElement.textContent);
  }

  ngAfterContentInit() {
    console.log("ngAfterContenetInit");
    console.log('content child: ', this.contentParagraph.nativeElement.textContent);

  }

  ngAfterContentChecked() {
    console.log("after conetent check")
  }ServerElementComponentS

  ngAfterViewChecked() {
    console.log("after view check");
  }

  ngAfterViewInit() {
    console.log("after view init");
    console.log(this.header.nativeElement.textContent);

  }

  ngOnDestroy() {
    console.log("on destroy !!!");
  }
}
