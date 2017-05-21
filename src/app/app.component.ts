import { Component, OnInit } from '@angular/core';
import data from './data.json';

// declare var XLSX: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  showResult = false;
  ngOnInit() {
    // console.log(data);
    // console.log(result_json);
  }
  showRenderedMap() {
    this.showResult = !this.showResult;
  }

  readData() {

  }


}
