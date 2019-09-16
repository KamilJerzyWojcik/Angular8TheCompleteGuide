import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Test Account',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknow'
    }
  ];

  constructor() { }

  addAccount(name: string, statu: string) {
    this.accounts.push({name, status});
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
  }
}
