import { UsersService } from './../users.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  @Input() users: string[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users = this.usersService.activerUsers;
  }

  onSetToInactive(id: number) {
    this.usersService.setToInactive(id);
  }

}
