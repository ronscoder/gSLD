import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectserviceService } from '../projectservice.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  @Input() nid;
  @Output() data = new EventEmitter();
  sites: any;
  name: string;
  showSites = false;
  constructor(
    public service: ProjectserviceService
  ) { }

  ngOnInit() {
    //TODO: Fetch nhead for each network
    //TODO: Fetch activities
    if (this.nid) {
      this.getData();
    }
  }

  getData() {
    this.service.getNetwork(this.nid, (data) => {
      this.sites = _.toPairs(data.sites);
      this.name = data.name;
      this.data.emit(data);
    })
  }

}
