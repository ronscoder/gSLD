import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ProjectSettingsService } from '../settings/project-settings.service';
import { ProjectserviceService } from '../projectservice.service'
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() pKey: any;
  // pKey: any;
  p: any;
  networkGroups: any;
  // showNetworks = false;
  // projectSettings: any;
  actUnderScope: any;

  actSettings: any;
  tab = 'exec';
  selAct: any;

  constructor(
    public projectservice: ProjectserviceService,
    public settings: ProjectSettingsService
  ) { }

  ngOnInit() {
    // this.pKey = this.pObj[0];
    this.projectservice.getProjectHeaderData(this.pKey).once('value', snap => {
      // const pdata = snap.val()));
      this.p = snap.val();
      if (this.p.settings) {
        this.actUnderScope = this.p.settings.activities;
      }

      this.networkGroups = this.p.netgroups;
      console.log('net groups', this.networkGroups);
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

  settingActivitykChanged(actKey, nName) {
    this.settings.setActivityScopeToProject(this.pKey, actKey, { name: nName, active: !this.isActivityUnderScope(actKey) })
  }

  isActivityUnderScope(ackKey) {
    if (this.actUnderScope) {
      if (ackKey in this.actUnderScope) {
        return this.actUnderScope[ackKey]['active'];
      }
      else return false;
    } else {
      return false;
    }
  }

  setTaskToSummary(taskKey) {
    this.settings.setProjectSummaryTask(this.pKey, this.selAct[0], taskKey, !this.isTaskInSummary(taskKey))
  }

  isTaskInSummary(taskKey) {
    if (this.actUnderScope[this.selAct[0]]) {
      if (taskKey in this.actUnderScope[this.selAct[0]].summarytasks) {
        return this.actUnderScope[this.selAct[0]].summarytasks[taskKey];
      }
      else return false;
    } else {
      return false;
    }
  }
}
