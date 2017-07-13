import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectserviceService } from '../projectservice.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // Task db properties
  @Input() tid;
  @Output() statusChanged = new EventEmitter();
  maxqty: any;
  name: any;
  progress: any;
  status: string;
  lastStatus: string;
  remarks: any;
  unit: any;
  issuerefs = [];
  date = Date.now();
  qty: any;
  rem: any;
  startDateExp: number;
  endDateExp: number;
  startDateAct: number;
  fstartDateAct: number;
  endDateAct: number;

  // Modified Data
  openIssueCount = 0;
  latestProgres: any;
  issueh: any;
  selProgressKey: any;
  // Flags
  // ifUpdateTask = false;
  expanded = false;
  editing = false;
  ifNewIssue = false;

  // Decorations
  labelClass: string;
  tab = 'header';

  selIssueKey: any;

  constructor(
    public service: ProjectserviceService
  ) { }

  ngOnInit() {
    if (this.tid) {
      this.getTask();
    }
  }

  issueCreated(issueRef) {
    // this.issuerefs.push(issueRef);
    this.issueh = {
      refkey: issueRef, open: true
    }
    this.updateProgress();
    // this.service.addTaskIssue(this.tid, issueRef, res => {
    //   console.log('issue added');
    // });
  }

  getTask() {
    // setTimeout(() => {
    // }, 2000);
    this.service.appservice.loading = true;
    this.service.getTask(this.tid, taskdata => {
      console.log('task data', taskdata)
      this.maxqty = taskdata.header.maxqty;
      this.name = taskdata.header.name;
      this.startDateAct = taskdata.header.startDateAct;
      this.startDateExp = taskdata.header.startDateExp;
      this.endDateExp = taskdata.header.endDateExp;
      this.endDateAct = taskdata.header.endDateAct;
      if (taskdata.progress) {
        this.progress = _.toPairs(taskdata.progress);
        this.latestProgres = (_.sortBy(this.progress, (o) => {
          console.log('sorting...', o);
          return -o[1].date;
        }))[0][1];
        if (this.latestProgres.status === 'completed') {
        }
        this.lastStatus = this.latestProgres.status;
        this.status = this.latestProgres.status;
      }
      this.remarks = _.toPairs(taskdata.remarks);
      this.labelClass = this.service.statusLabel(this.status);
      console.log('remarks', this.remarks)
      this.unit = taskdata.header.unit;
      if (taskdata.issues) {
        this.issuerefs = (_.toPairs(taskdata.issues));
        this.openIssueCount = this.issuerefs.filter((val) => {
          return val[1] !== 'resolved'; // resolved or not
        }).length;
      }
      // Get latest progress
      console.log('lastest progress', this.latestProgres);
      this.service.appservice.loading = false;
    })
  }

  updateProgress() {
    this.service.updateTaskProgress(this.tid,
      { qty: this.qty, date: Date.now(), remark: this.rem || null, status: this.status, issueh: this.issueh || null })
      .then(
      (res) => {
        this.qty = null;
        this.rem = null;
      })
  }

  setStatus(status: string) {
    if (!status) {
      return;
    }
    this.qty = this.latestProgres.qty;
    this.status = status;
  }

  newIssue() {
    //Link an issue to the lastest progress
    this.ifNewIssue = true;
    this.setStatus(this.status)
  }

  issueCreateCanceled(canceled) {
    this.ifNewIssue = false;
    this.qty = null;
    this.rem = null;
  }

  showIssue(issueKey, selProgressKey) {
    this.selIssueKey = issueKey;
    this.selProgressKey = selProgressKey
  }

  issueResolved(ifResolved) {
    if (ifResolved) {
      this.service.resolveProgressIssue(this.tid, this.selProgressKey)
    }
  }

  setStart() {
    if (!this.fstartDateAct) {
      return;
    }
    const startDate = (new Date(this.fstartDateAct)).getTime();
    // if (!this.status) {
    this.status = 'ongoing';
    // }
    // this.updateProgress();
    this.service.updateTaskProgress(this.tid,
      { qty: 0, date: startDate, remark: 'Work started', status: this.status })
      .then(
      (res) => {
        this.service.setStartDate(this.tid, startDate);
        // this.qty = null;
        // this.rem = null;
      })
  }
}
