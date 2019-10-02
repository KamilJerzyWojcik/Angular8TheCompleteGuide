import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  servers = [
    {
      name: 'test1',
      id: 1,
      status: 'online'
    },
    {
      name: 'test2',
      id: 2,
      status: 'offline'
    }
  ];

  constructor() { }

  getServer(id: number) {
    const serv = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return serv;
  }

  getServers() {
    return this.servers.slice();
  }

  updateServer(id: number, data: { name: string, status: string }) {

    const serv = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (serv) {
      serv.name = data.name;
      serv.status = data.status;
    }
  }
}
