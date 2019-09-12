import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() iNumberEvent = new EventEmitter<{iNumber: number}>();
  i: number = 1;
  intervalFunction = null;

  constructor() { }

  ngOnInit() {
  }

  startGame() {
    this.intervalFunction = setInterval(() => {
      this.iNumberEvent.emit({iNumber: this.i++});
    }, 1000);
  }

  stopGame() {
    clearInterval(this.intervalFunction);
  }

}
