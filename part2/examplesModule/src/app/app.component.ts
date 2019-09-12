import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  serverElements = [{
    type: 'server',
    name: 'Testserver',
    content: 'Just a test!'
  }];

  oddNumber: boolean = null;
  iNumber: number = null;


  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Change!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  onINumberEvent(event: any) {
    console.log(event);
    this.oddNumber = event.iNumber % 2 === 0 ? true : false;
    this.iNumber = event.iNumber;
  }

}
