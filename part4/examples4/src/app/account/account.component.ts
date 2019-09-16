import { AccountsService } from './../accounts.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountsService]
})
export class AccountComponent implements OnInit {

  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
  }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    console.log('A server status changed, new status: ' + status);
  }

}
