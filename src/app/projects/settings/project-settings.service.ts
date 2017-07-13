import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
@Injectable()
export class ProjectSettingsService {

  constructor(
    public afdb: AngularFireDatabase
  ) { }

  getActivities() {
    return this.afdb.database.ref('/settings/activities')
  }

  addActivities(actData) {
    return this.afdb.database.ref('/settings/activities').push(actData);
  }

  addTask(actKey, taskData) {
    return this.afdb.database.ref('/settings/activities').child(actKey).child('tasks').push(taskData);
  }

  setTaskToActSummary(actKey, taskKey, data: boolean) {
    return this.afdb.database.ref(`/settings/activities/${actKey}/tasks/${taskKey}/summary`).set(data)
  }

  setActivityScopeToProject(pkey, actKey, data: { name: string, active: boolean }) {
    return this.afdb.database.ref(`projects/data/${pkey}/settings/activities/${actKey}`).set(data);
  }

  getActivitiesUnderScope(pKey) {
    return this.afdb.database.ref(`projects/data/${pKey}/settings/activities`).orderByChild('active').equalTo(true)
  }

  setActivityToSite(siteKey, actKey, data: { name: string, active: boolean }) {
    return this.afdb.database.ref(`sites/${siteKey}/activities/${actKey}`).set(data);
  }

  setProjectSummaryTask(pKey, actKey, taskKey, value: boolean) {
    return this.afdb.database.ref(`projects/data/${pKey}/settings/activities/${actKey}/summarytasks/${taskKey}`).set(value);
  }

  getActivityDefinition(key) {
    return this.afdb.database.ref('settings/activities').child(key);
  }


  // getProjectSetting(pkey) {
  //   return this.afdb.database.ref(`projects/${pkey}/settings`);

  // }


  // getActivityScope() {
  //   return this.afdb.database.ref(`/sites/${}`)
  // }

}
