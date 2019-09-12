import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test server';
  userName = '';
  serverCerate = false;
  servers = ['Testserver', 'Testserver 2'];
  isVisible = false;
  passwordLog = [];
  i = 0;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCerate = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = (event.target as HTMLInputElement).value;
  }

  clearUserName() {
    this.userName = '';
  }

  displayDetails() {
    this.isVisible = !this.isVisible;
    //this.passwordLog.push(this.i++);
    this.passwordLog.push(new Date());

  }

  getBackgroundColor(log) {
    return log > 5 ? 'blue' : 'white';
  }

  getTextColor(log) {
    return log > 5 ? 'white' : 'black';
  }

}
