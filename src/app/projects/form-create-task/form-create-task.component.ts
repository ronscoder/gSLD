import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectserviceService } from '../projectservice.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.css']
})
export class FormCreateTaskComponent implements OnInit {
  @Input() actKeyOfNewTask: any;
  @Input() taskKeyForUpdate: any;
  @Input() oldDataForUpdate: any;
  @Output() keyTaskCreated = new EventEmitter();
  @Output() taskUpdated = new EventEmitter<boolean>();
  // Inputs
  taskHeadForm: FormGroup;


  constructor(
    private formb: FormBuilder,
    public service: ProjectserviceService
  ) { }

  ngOnInit() {
    console.log('old data', this.oldDataForUpdate);
    this.buildFormTaskHeader();
    if (this.taskKeyForUpdate) {
      // Updating 
      this.taskHeadForm.setValue({
        name: [this.oldDataForUpdate.name, Validators.required],
        maxqty: this.oldDataForUpdate.maxqty,
        unit: this.oldDataForUpdate.unit,
        startDateExp: this.formDateForForm(this.oldDataForUpdate.startDateExp),
        startDateAct: this.formDateForForm(this.oldDataForUpdate.startDateAct),
        endDateExp: this.formDateForForm(this.oldDataForUpdate.endDateExp),
        endDateAct: this.formDateForForm(this.oldDataForUpdate.endDateAct)
      })
    }
  }

  buildFormTaskHeader() {
    this.taskHeadForm = this.formb.group({
      name: ['', Validators.required],
      maxqty: '',
      unit: '',
      startDateExp: '',
      startDateAct: '',
      endDateExp: '',
      endDateAct: ''
    })
  }

  getFormData() {
    return {
      name: this.taskHeadForm.value['name'],
      maxqty: this.taskHeadForm.value['maxqty'],
      unit: this.taskHeadForm.value['unit'],
      startDateExp: new Date(this.taskHeadForm.value['startDateExp']).getTime(),
      startDateAct: new Date(this.taskHeadForm.value['startDateAct']).getTime() || null,
      endDateExp: new Date(this.taskHeadForm.value['endDateExp']).getTime(),
      endDateAct: new Date(this.taskHeadForm.value['endDateAct']).getTime()  || null
    }
  }
  addTask() {

    this.service.createTaskHead(this.actKeyOfNewTask, this.getFormData(), (taskkey) => {
      this.taskHeadForm.reset(); //don't reset but hide
      // this.tid = taskkey;
      // this.actKeyOfNewTask = null;
      this.keyTaskCreated.emit(taskkey);
      console.log('new task data', this.getFormData());
    })
  }

  updateTask() {
    this.service.updateTaskHead(this.taskKeyForUpdate, this.getFormData(), (res) => {
      // this.taskHeadForm.resetForm(); //Don't reset, as it 
      // this.ifUpdateTask = false;
      this.taskUpdated.emit(true);
      console.log('task data updated', this.getFormData());
    })
  }

  formDateForForm(date: number) {
    if (!date) {
      return null;
    }
    return (new Date(date)).toISOString().slice(0, 10)
  }
}
