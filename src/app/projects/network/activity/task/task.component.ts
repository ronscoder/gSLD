import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task = {
    name: 'Pole Erection',
    maxqty: 12,
    completed: 5,
    unit: 'EA',
    date: (new Date()).getTime(),
    status: 'ongoing',
    remark: [{ date: new Date().getTime(), text: 'issue' }]
  }
  constructor() { }

  ngOnInit() {
  }

}
