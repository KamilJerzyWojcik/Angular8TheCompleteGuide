import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements DoCheck, OnInit, OnChanges {

  @Input() element: {
    type: string,
    name: string,
    content: string;
  };

  @Input() name: string;

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
  }

}
