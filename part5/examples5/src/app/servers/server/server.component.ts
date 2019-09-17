import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from './../servers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: { id: number, name: string, status: string };

  constructor(private serverService: ServersService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.server = this.serverService.getServer(id);

    this.route.params.subscribe(
      (param: Params) => {
        this.server = this.serverService.getServer(+param['id']);
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
