import { Component, OnInit, Input } from '@angular/core';
import { ProjectserviceService } from '../projectservice.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() actid;
  name: any;
  defName: string;
  taskrefs: any;
  remarks: any;
  remtext: any;
  date = Date.now();

  // FLAGS
  ifNewTask = false;
  ifMore = false;
  
  // Templating
  tab = "tasks";

  // Calc data
  tasksProgress: string; // Check the completion status of all the tasks

  constructor(
    public service: ProjectserviceService
  ) { }

  ngOnInit() {
    //TODO: get activity details
    console.log('activity key', this.actid);
    if (this.actid) {
      this.getData();
    }
  }

  getData() {
    this.service.getActivity(this.actid, (data) => {
      this.name = data.name;
      this.defName = data.defName;
      this.taskrefs = _.toPairs(data.tasks);
      // this.calcActivityStatus(this.taskrefs);
      console.log('activity data', data);
      this.remarks = _.toPairs(data.remarks);
    })
  }

  calcActivityStatus(tasks: any[]) {
    // ongoing, canceled, stopped, not started, completed
    if (tasks.filter(val => val[1] === 'completed').length === 4) {
      this.tasksProgress = 'completed';
      return;
    }
    if (tasks.filter(val => val[1] === 'canceled').length === 4) {
      this.tasksProgress = 'canceled';
      return;
    }
    if (tasks.filter(val => val[1] === 'stopped').length === 4) {
      this.tasksProgress = 'stopped';
      return;
    }
    if (tasks.filter(val => val[1] === 'ongoing').length > 0) {
      this.tasksProgress = 'ongoing';
      return;
    }
    this.tasksProgress = 'not stated';
  }

  addRemark() {
    this.service.addRemarkActivity(this.actid,
      {
        text: this.remtext,
        date: Date.now()
      }, (res) => {
        this.remtext = null;
      }
    )
  }

  updateTaskStatus(newStatus: string, taskKey) {
    console.log('updating task status to activity', newStatus, taskKey);
    this.service.setActivityTaskStatus(this.actid, taskKey, newStatus, res => {
      console.log('task updated in activity');
    })
  }

  taskCreated(taskKey){
    console.log('Task created', taskKey)
  }
}
