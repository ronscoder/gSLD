import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectSettingsService } from '../settings/project-settings.service'
import { ProjectserviceService } from '../projectservice.service'

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  @Input() actDefKey: any;
  @Output() actvCreated = new EventEmitter<any>();
  actDefinition: any;
  actData: {
    name: string,
    defnName: string,
    defnKey: string,
    tasks: [
      { name: string, maxqty: string, unit: string }
    ]
  }
  // projectActs: any;

  constructor(
    public projectSetting: ProjectSettingsService,
    public projectService: ProjectserviceService
  ) { }

  ngOnInit() {
    if (this.actDefKey) {
      this.getActivityDefinition(this.actDefKey);
    } else {
      console.error('Empty actv definition key');
    }
  }

  getActivityDefinition(defnKey) {
    this.projectSetting.getActivityDefinition(defnKey).on('value', snap => {
      this.actDefinition = snap.val();
    })
  }
  // getActivities() {
  //   if (this.projectActs) {
  //     return
  //   }
  //   this.projectSetting.getActivitiesUnderScope('p01') //this.projectService.selectedProjectKey);
  //     .once('value', snap => {
  //       this.projectActs = snap.val();
  //       console.log('project setting acts', this.projectActs)
  //     })
  // }

  setActToSite() {
    // this.projectSetting.setActivityToSite()
  }

  submitActData(form) {
    const formData = form.value;
    console.log('submitting actv data', form);
    const actRef = this.projectService.createActivity({
      name: formData['actName'],
      defName: this.actDefinition.name,
      defKey: this.actDefKey
    });
    actRef.then(res => {
      this.actvCreated.emit({ key: actRef.key, name: formData['actName'] });
    })
    // add task, get the key and set to activity
    let taskData = {};
    for (const key in this.actDefinition.tasks) {
      this.projectService.createTaskHead(actRef.key, {
        name: this.actDefinition.tasks[key].name,
        maxqty: formData[key],
        unit: this.actDefinition.tasks[key].unit
      }, taskKey => {

      })
    }
  }

}
