import { AccountsService } from './accounts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

accounts: {name: string, status: string}[] = [];

  constructor(private accountService: AccountsService) {}

  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }

  onAccountAdded(newAccount: {name: string, status: string}) {
    this.accountService.addAccount(newAccount.name, newAccount.status);
  }

  onStatusChanged(updateInfo: {id: number, newStatus: string}) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
  }
}
