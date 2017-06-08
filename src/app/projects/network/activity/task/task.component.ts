import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() tid;
  task;
  constructor(
    private formb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.task = {
      name: 'Pole Erection',
      maxqty: 12,
      completion: [
        { completed: 10, date: (new Date()).getTime(), remark: 'Slow', status: 'ongoing' },
        { completed: 10, date: (new Date()).getTime(), remark: 'Slow', status: 'halt' }
      ],
      unit: 'EA',
      date: (new Date()).getTime(),
      remarks: [
        { date: new Date().getTime(), text: 'slow' },
        { date: new Date().getTime(), text: 'good' }
      ],
      issues: [
        { date: new Date().getTime(), text: 'issue1', status: 'open', resolution: '' },
        { date: new Date().getTime(), text: 'issue2', status: 'resolved', resolution: 'Reported to SD' }
      ]
    }
  }

}
