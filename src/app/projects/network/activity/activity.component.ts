import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() actid;
  actdata = {
    name: 'act01 - act',
    tasks: ['t1']
  }
  constructor() { }

  ngOnInit() {
    //TODO: get activity details
  }

}
