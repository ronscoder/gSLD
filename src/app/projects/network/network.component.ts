import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  @Input() nid;
  nhead = {
    name: 'LAM',
    label: 'DIV', 
    subnets: ['sn1']
  }
  activities = ['act1']
  constructor() { }

  ngOnInit() {
    //TODO: Fetch nhead for each network
    //TODO: Fetch activities
  }

}
