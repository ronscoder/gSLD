import { Component, OnInit, Input } from '@angular/core';
import { ProjectserviceService } from '../projectservice.service';
import * as _ from 'lodash';
import { ProjectSettingsService } from '../settings/project-settings.service'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input() sid;
  projectSettings: any;

  activities: any;
  name: string;

  settingTab = 'newActivity'
  tab = 'exec';
  actSettings: any;
  checkValue: boolean;

  constructor(
    public service: ProjectserviceService,
    public settings: ProjectSettingsService
  ) { }

  ngOnInit() {
    //TODO: Fetch nhead for each network
    //TODO: Fetch activities
    this.projectSettings = this.service.selProjectHeaderData.settings;
    if (this.sid) {
      this.getData();
    } else {
      this.sid = this.service.selSiteKey;
      this.getData();
    }
  }

  getData() {
    this.service.getSite(this.sid, (data) => {

      this.activities = _.toPairs(data.activities);
      this.name = data.name;
    })
  }

  getSettings() {
    this.tab = 'settings';
    if (this.actSettings) {
      return;
    }
    this.settings.getActivities().once('value', snap => {
      console.log('getting settings', snap.val())
      this.actSettings = snap.val();
    })
  }

  settingTaskChanged() {

  }

  newActKey(newAct) {
    this.service.setActivityToSite(this.sid, newAct.key,
      {
        name: newAct.name,
        active: true
      })
  }
}
