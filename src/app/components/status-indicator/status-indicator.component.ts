import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../services/status.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.css']
})
export class StatusIndicatorComponent implements OnInit {

  networkOnline=false;
  serverOnline=false;
  private subscriptions: Subscription[] = [];

  constructor(private statusService:StatusService) { }


  ngOnInit(): void {
    this.statusService.networkOnline$.subscribe(status => this.networkOnline = status);
    this.statusService.serverOnline$.subscribe(status => this.serverOnline = status);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
