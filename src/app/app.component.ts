import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import data from './data.json';
import { Http } from '@angular/http';
import { DateserviceService } from './dateservice.service';
// import * as $ from 'jquery';

// declare var XLSX: any;
declare var $: any;
// declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'app works!';
  showResult = false;
  testdata = {};
  ifShowMenu = false;
  constructor(
    private http: Http,
    private data: DateserviceService,
    private cdRef: ChangeDetectorRef
  ) { }
  ngOnInit() {
    // this.data.status = { text: 'loading', loading: true }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  showRenderedMap() {
    this.showResult = !this.showResult;
  }

  readData() {

  }


  handleFiles(files) {
    // this.http.get(files[0]).subscribe(res => {
    //   console.log(res.text)
    // })
    const file = files[0];
    this.data.parseXML(file, (result) => {
      console.log(result);
    });
  }

  showMenu() {
    this.ifShowMenu = !this.ifShowMenu;
    //   $('#homeMenu')
    //     .sidebar('toggle')
    //     ;
    // }
  }
}

