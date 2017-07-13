import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectserviceService } from '../projectservice.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  // If issueref is given, then existing issue
  // 
  @Input() issueref?: any;
  @Output() issuecreated = new EventEmitter<any>();
  @Output() issueResolved = new EventEmitter<any>();
  @Output() issueCreateCanceled = new EventEmitter<any>();

  today: any;
  text: any;
  dateopen: number;
  dateclose: number;
  open: boolean;
  newRemTxt: string;
  remarks: any;
  showRemarks = false;
  createNewIssue = false;
  constructor(
    public service: ProjectserviceService
  ) { }

  ngOnInit() {
    this.today = Date.now();
    // Existing issue
    if (this.issueref) {
      this.getData();
    } else {
      this.createNewIssue = true;
    }
  }

  createIssue() {
    this.service.createIssue(this.text, (key => {
      if (key) {
        // this.issueref = key;
        this.issuecreated.emit(key);
        this.text = null;
        // this.getData();
      }
    }));
  }
  getData() {
    this.service.getIssue(this.issueref, data => {
      if (!data) { return }
      this.text = data.text;
      this.dateopen = data.dateopen;
      this.dateclose = data.dateclose;
      this.open = data.open;
      this.remarks = (_.toPairs(data.remarks));
      // console.log(data);
    })
  }

  addRem() {
    if (!this.newRemTxt) {
      return;
    }
    console.log('entering new rem text')
    this.service.updateIssueRem(this.issueref,
      { text: this.newRemTxt, date: Date.now() }
      , data => {
        this.newRemTxt = null;
      })
    // this.issue.remarks.push({
    //   text: this.newRemTxt, date: Date.now()
    // })
  }
  showRem() {
    this.showRemarks = !this.showRemarks;
  }

  resolved() {
    this.service.resolveIssue(this.issueref).then(res => {
      this.issueResolved.emit(true);
    });
  }
  cancelIssue() {
    this.issueCreateCanceled.emit(true);
  }
}
