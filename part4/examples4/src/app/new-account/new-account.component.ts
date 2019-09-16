import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [AccountsService]
})
export class NewAccountComponent implements OnInit {

  constructor( private accountsService: AccountsService) { }

  ngOnInit() {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    console.log('A server status changed, new status: ' + accountStatus);
  }

}
