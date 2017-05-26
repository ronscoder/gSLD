import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DateserviceService } from '../dateservice.service';

declare var result_json: any;
declare var xlxsMain: any;
declare var handleFileInput: any;
@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit, OnChanges {
  confirmed = false;
  msg: string;
  xlsxdata: any;
  constructor(
    private router: Router,
    private dataservice: DateserviceService
  ) { }

  ngOnInit() {
    xlxsMain();
  }

  ngOnChanges() {

  }

  confirm() {
    if (!result_json) {
      this.msg = 'Error: Input data. Verify again';
      return;
    }
    this.confirmed = true;
    this.reviewData();
    /// Navigate
    this.router.navigate([this.dataservice.nextComponent]);
  }

  reviewData() {
    if (!result_json) {
      this.msg = 'Data not imported!';
      return;
    }

    this.prepareMapdate(result_json);
  }

  prepareMapdate(sldData) {
    for (let key in sldData) {
      if (sldData[key]) {
        const data = sldData[key];
        console.log(key);
        const header = data[0];
        let nodes = [];
        for (let i = 1; i < data.length; i++) {
          let node = {
            latlng: { lat: +data[i][0], lng: +data[i][1] },
            objtype: data[i][2],
            spec: data[i][3],
            symboltag: data[i][4],
            label: data[i][5],
            node: data[i][6],
            sbranches: data[i].slice(7)
          }
          nodes.push(node);
        }
        this.xlsxdata = { nodes: nodes };
        /// Determine center auto... choose the middle value
        console.log('finding center node')
        const center = data[Math.round((data.length) / 2)];
        this.xlsxdata['center'] = {
          lat: +center[0], lng: +center[1]
        };
        console.log(this.xlsxdata);
        this.dataservice.xlsxdata = this.xlsxdata;
        this.saveDateLocal(this.dataservice.xlsxdata);
      }
    }
  }

  saveDateLocal(data) {
    localStorage.setItem('xlsxdata', JSON.stringify(data));
  }
  toMap() {
    // this.router.navigate(['renderedmap']);
    // return 0;
  }
}
