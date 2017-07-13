import { Component, OnInit } from '@angular/core';
import { ProjectSettingsService } from '../project-settings.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  actName: any;
  activities = []
  tasks = []
  newTask: any;

  selAct: any;
  constructor(
    public settingService: ProjectSettingsService
  ) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.settingService.getActivities().on('value', (actss) => {
      this.activities = _.toPairs(actss.val());
      console.log('settings: activities', this.activities);
    })
  }
  addTask(actKey) {
    if (!this.newTask) {
      return
    }
    this.settingService.addTask(actKey, { name: this.newTask }).then(
      (res) => {
        this.newTask = null;
      });
    // this.tasks.push({ name: this.newTask })
  }

  addNewAct() {
    if (!this.actName) {
      console.log('empty actname')
      return
    }
    this.settingService.addActivities({ name: this.actName })
  }

  setToSummary(taskKey, ifset) {
    this.settingService.setTaskToActSummary(this.selAct, taskKey, ifset);
  }
}
