import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from './../servers.service';
import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivated } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivated {

  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serverService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.route.queryParams.subscribe(
      (param: Params) => {
        this.allowEdit = param['allowEdit'] === '1' ? true : false;
        console.log(param['allowEdit']);
      }
    );

    this.server = this.serverService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

  }

  onUpdateServer() {
    this.serverService.updateServer(this.server.id, { name: this.server.name, status: this.server.status });
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
