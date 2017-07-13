import { Component, OnInit } from '@angular/core';
import { ProjectserviceService } from '../projectservice.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  ps: any;
  selp: any;
  ifShowList = false;

  constructor(
    public service: ProjectserviceService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.service.getProjectList().once('value',
      (data) => {
        console.log('project list', data.val())
        this.ps = data.val();
      })
  }
  showList() {
    this.ifShowList = true;
    console.log('show project list', this.ifShowList);
  }
  selectProject(p) {
    this.ifShowList = false;
    this.selp = p;
  }

}
