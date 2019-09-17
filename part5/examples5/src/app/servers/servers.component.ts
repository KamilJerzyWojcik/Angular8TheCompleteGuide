import { ServersService } from './servers.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  servers = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private serverService: ServersService) { }

  ngOnInit() {
    this.servers = this.serverService.getServers();
  }

  onReload() {
    // this.router.navigate(['servers'], {relativeTo: this.activatedRoute});
  }

}
