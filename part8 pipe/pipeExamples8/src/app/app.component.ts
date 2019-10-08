import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });

  servers = [
    {
      instanceType: 'medium',
      name: 'Production',
      status: 'stable',
      started: new Date(2017, 1, 15)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(2017, 1, 14)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(2017, 1, 13)
    },
    {
      instanceType: 'small',
      name: 'Testing Envirnoment Server',
      status: 'stable',
      started: new Date(2017, 1, 12)
    },
    {
      instanceType: 'small',
      name: 'Danger Envirnoment Server',
      status: 'critical',
      started: new Date(2017, 1, 11)
    }
  ];

  filteredStatus = '';

  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'stable',
      started: new Date(2018, 1, 11)
    })
  }

}
