import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router'
declare var result_json: any;
declare var xlxsMain: any;

@Component({
  selector: 'app-gen-sld',
  templateUrl: './gen-sld.component.html',
  styleUrls: ['./gen-sld.component.css']
})
export class GenSLDComponent implements OnInit {
  steps = [
    'Download the data format (xlsx',
    'Prepare the data',
    'Upload the file',
    'Review & Validate the data',
    'Click on <kbd>Render Map</kbd> to generate SLD overlayed Map',
    'Adjust zoom level, Map feature type',
    'If satisfied, print'
  ];

  ifShowDrop = false;
  stephead = -1;
  sldData: any;
  dataReviewed = false;
  msg: string;
  mapData: any;
  showResult = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.sldData = result_json;
  }

  showDrop() {
    this.ifShowDrop = true;
    xlxsMain();
  }

  reviewData() {
    if (!result_json) {
      this.msg = 'Data not imported!';
      return;
    }
    this.dataReviewed = true;
    this.sldData = result_json;
    console.log(this.sldData);
    this.prepareMapdate(this.sldData);
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
        this.mapData = { nodes: nodes };
        /// Determine center auto... choose the middle value
        console.log('finding center node')
        const center = data[Math.round((data.length) / 2)];
        this.mapData['center'] = {
          lat: +center[0], lng: +center[1]
        };
        console.log(this.mapData);

      }
    }
  }
  showRenderedMap() {
    this.showResult = true;
    // this.router.navigate(['renderedmap']);
  }

}
