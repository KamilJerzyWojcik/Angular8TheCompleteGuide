import { CounterService } from './counter.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  activerUsers = ['Chris', 'Manu'];
  inactiveUsers = ['Max', 'Anna'];

  constructor(private counterService: CounterService) { }

  setToActive(id: number) {
    this.activerUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.incrementInactiveToActive();
  }

  setToInactive(id: number) {
    this.inactiveUsers.push(this.activerUsers[id]);
    this.activerUsers.splice(id, 1);
    this.counterService.incrementActiveToInactive();
  }
}
