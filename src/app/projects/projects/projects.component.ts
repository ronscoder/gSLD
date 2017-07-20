import { Component, OnInit } from '@angular/core';
import { ProjectserviceService } from '../projectservice.service'
import * as _ from 'lodash';
import { Router } from '@angular/router';

declare var $: any;
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
    public service: ProjectserviceService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.service.getProjectList().once('value',
      (data) => {
        console.log('project list', data.val());
        this.ps = data.val();
      })
  }
  showList() {
    $('#projectmenu').dropdown();
    this.ifShowList = !this.ifShowList;
    console.log('show project list', this.ifShowList);
  }
  selectProject(pKey) {
    this.service.selectedProjectKey = pKey;
    this.router.navigate(['./projects/project']);
    // this.router.navigate(['./projects/project']);
    
    // console.log('select a project', p)
    // this.ifShowList = false;
    // this.selp = p;
  }

}
