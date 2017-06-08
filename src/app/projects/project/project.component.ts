import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  pid;
  phead: any;
  networks = ['P01N1'];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pid = this.route.params['pid']
    // Get P details here
    this.phead = {
      name: 'Pname001',
      status: 'ONGOING',
      startdate1: '22-may-2017',
      enddate1: '13-april-2017'
    }
  }

}
