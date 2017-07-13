import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database'
import { DateserviceService } from '../dateservice.service'
@Injectable()
export class ProjectserviceService {
  selectedProjectKey: any;
  constructor(
    public http: Http,
    public afdb: AngularFireDatabase,
    public appservice: DateserviceService
  ) {

  }

  createIssue(issuetext, cb) {
    const keyref = this.afdb.database.ref('issues').push()
    keyref.set({
      dateopen: Date.now(),
      text: issuetext,
      open: true
    }).then(res => {
      cb(keyref.key);
    });
  }

  getIssue(issueref, cb) {
    this.afdb.database.ref('issues').child(issueref).on('value', data => {
      cb(data.val());
    })
    // this.http.get('assets/data/issue.json').subscribe(data => {
    //   cb(data.json()[issueref]);
    // })
  }

  updateIssueRem(issueref, data, cb) {
    this.afdb.database.ref('issues').child(issueref).child('remarks').push(data)
      .then(res => {
        console.log('issue updated');
        cb(res);
      }).catch(err => {
        console.log('issue rejected', err)
      })
  }
  resolveIssue(issueref) {
    return this.afdb.database.ref('issues').child(issueref).child('open').set(false);
  }

  massUpdate(
    data: [{}]
  ) {
    return this.afdb.database.ref().update(data);
  }
  createTaskHead(ackkey, data, cb) {
    // Create task and update activity
    const taskkey = this.afdb.database.ref('tasks').push().key;
    const updates = {};

    updates['tasks/' + taskkey] = { header: data };
    updates[`activities/${ackkey}/tasks/${taskkey}`] = true;
    return this.afdb.database.ref().update(updates).then(
      res => {
        cb(taskkey);
      }
    )
    // taskkey.set({ header: data }).then(res => {
    //   this.afdb.database.ref('activities').child(ackkey).child('tasks').child(taskkey.key).set(true)
    //     .then(res => {
    //       cb(taskkey);
    //     })
    // })
  }
  updateTaskHead(taskkey, data, cb) {
    // const taskkey = this.afdb.database.ref('tasks').push();
    this.afdb.database.ref('tasks').child(taskkey).child('header').set(data).then(res => {
      cb(res);
    })
  }

  getTask(taskkey, cb) {
    this.afdb.database.ref('tasks').child(taskkey).on('value', tasksnap => {
      cb(tasksnap.val());
    })
  }
  addTaskIssue(taskkey, issueref, cb) {
    this.afdb.database.ref('tasks').child(taskkey).child('issues').child(issueref).set(true).then(res => {
      cb(res);
    })
  }

  resolveProgressIssue(taskkey, progressKey) {
    return this.afdb.database.ref(`tasks/${taskkey}/progress/${progressKey}/issueh/open`).set(false);
  }

  updateTaskProgress(taskkey, data) {
    return this.afdb.database.ref('tasks').child(taskkey).child('progress').push(data).then(res => {
      // cb(res);
      return this.updateTaskStatus(taskkey, data.status);
    })
  }

  setStartDate(taskKey, date) {
    return this.afdb.database.ref(`tasks/${taskKey}/header/startDateAct`).set(date)
  }
  updateTaskStatus(taskKey, data) {
    return this.afdb.database.ref(`tasks/${taskKey}/status`).set(data)
  }

  getActivity(actkey, cb) {
    this.afdb.database.ref('activities').child(actkey).on('value', actsnap => {
      cb(actsnap.val());
    })
  }

  createActivity(data: { name: string, defName: string, defKey: string }) {
    return this.afdb.database.ref('activities').push(data);
  }

  setActivityToSite(siteKey, actKey, data: { name: string, active: boolean }) {
    return this.afdb.database.ref('sites').child(siteKey).child('activities').child(actKey).set(data);
  }

  addRemarkActivity(actkey, data, cb) {
    this.afdb.database.ref('activities').child(actkey).child('remarks').push(data).then(res => {
      cb(res);
    })
  }

  setActivityTaskStatus(actKey, taskKey, status, cb) {
    this.afdb.database.ref('activities').child(actKey).child('tasks').child(taskKey).set(status).then(res => {
      cb(res);
    })
  }

  getSite(skey, cb) {
    this.afdb.database.ref('sites').child(skey).on('value', snap => {
      cb(snap.val());
    })
  }

  addRemarkSite(skey, data, cb) {
    this.afdb.database.ref('sites').child(skey).child('remarks').push(data).then(res => {
      cb(res);
    })
  }

  getNetwork(nkey, cb) {
    this.afdb.database.ref('networks').child(nkey).on('value', snap => {
      cb(snap.val());
    })
  }

  addRemarkNetwork(netkey, data, cb) {
    this.afdb.database.ref('networks').child(netkey).child('remarks').push(data).then(res => {
      cb(res);
    })
  }

  getProjectList() {
    return this.afdb.database.ref('projects/list')
  }

  getProjectHeaderData(pKey) {
    this.selectedProjectKey = pKey;
    return this.afdb.database.ref('projects/data').child(pKey);
  }

  statusLabel(val) {
    switch (val) {
      case 'completed':
      case 'resolved':
      case true:
        return 'blue positive';
      case 'ongoing':
        return 'yellow positive';
      case 'stopped': case 'open': case false:
        return 'red negative';
      case 'canceled':
        return 'grey negative';
      default:
        return '';
    }
  }
}
