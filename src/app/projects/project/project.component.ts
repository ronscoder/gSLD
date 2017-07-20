import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ProjectSettingsService } from '../settings/project-settings.service';
import { ProjectserviceService } from '../projectservice.service';
import Chart from 'chart.js';
import { Router } from '@angular/router';

declare const google: any;
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() pKey: any;
  @ViewChild('activitiesChart') activitiesChart: ElementRef;
  // pKey: any;
  p: any;
  networkGroups: any;
  // showNetworks = false;
  // projectSettings: any;
  actUnderScope: any;

  actSettings: any;
  tab = 'exec';
  selAct: any;

  // Booleans
  ifChartLoading = true;

  constructor(
    public projectservice: ProjectserviceService,
    public settings: ProjectSettingsService,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this.pKey) {
      this.pKey = this.projectservice.selectedProjectKey;
    }
    this.projectservice.getProjectHeaderData(this.pKey, (key, data) => {
      this.p = data;
      if (this.p.settings) {
        this.actUnderScope = this.p.settings.activities;
      }
      this.networkGroups = this.p.netgroups;
      console.log('net groups', this.networkGroups);
      this.prepareChartActivity();

    });
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
    // this.settings.setProjectSummaryTask(this.pKey, this.selAct[0], taskKey, !this.isTaskInSummary(taskKey))
  }


  prepareCompletionChart() {
    const ctx = this.activitiesChart.nativeElement.getContext('2d');

    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'completed',
          'ongoing',
          'not started'
        ],
        datasets: [
          {
            label: 'Site Activities Status',
            data: [10, 20, 30],
            backgroundColor: [
              'blue', 'orange', 'red'
            ]
          }
        ]
      },
    });
  }

  prepareChartActivity() {
    this.projectservice.appservice.status = {
      text: 'loading chart', loading: true
    }
    //data
    const remaining = this.p.progress.activities.total - this.p.progress.activities.completed;
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.projectservice.appservice.status = null;
      this.ifChartLoading = false;
      var data = google.visualization.arrayToDataTable([
        ['Activity', this.p.settings.labels.activity],
        [`Completed (${this.p.progress.activities.completed})`, this.p.progress.activities.completed],
        [`Remaining (${remaining})`, remaining]
      ]);
      var options = {
        title: `Completion status (${this.p.settings.labels.activity})`
      };
      // document.getElementById('piechart')
      const ctx = this.activitiesChart.nativeElement;
      // var chart = new google.visualization.PieChart(document.getElementById('activitiesChart'));
      var chart = new google.visualization.PieChart(ctx);
      chart.draw(data, options);
    });
  }

  toSite(siteKey) {
    this.projectservice.selSiteKey = siteKey;
    this.router.navigate(['/projects/toSite']);
  }
}
