import { Component, OnInit, ElementRef } from '@angular/core';
import { DateserviceService } from '../dateservice.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-gpx',
  templateUrl: './gpx.component.html',
  styleUrls: ['./gpx.component.css']
})
export class GpxComponent implements OnInit {
  parsedGpx: [{}];
  msg: string

  constructor(
    private http: Http,
    private data: DateserviceService

  ) { }

  ngOnInit() {
  }

  handleFiles(files) {
    // this.http.get(files[0]).subscribe(res => {
    //   console.log(res.text)
    // })
    const file = files[0];
    if(! file){
      return;
    }
    this.data.parseXML(file, (result) => {
      console.log(result);
      this.parsedGpx = result;
    });
  }
  copytoclipboard(el: ElementRef) {
    // let data = document.querySelector('#gpsdata');
    const data = document.getElementById('gpsdata');
    // console.log(data);
    const range = document.createRange();
    range.selectNode(data);
    window.getSelection().addRange(range);
    try {
      // Now that we've selected the anchor text, execute the copy command
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copied');
      this.msg = 'Data copied';
    } catch (err) {
      console.log('Oops, unable to copy');
      this.msg = 'Error copying data';
    }
    // window.getSelection().empty();
    window.getSelection().removeAllRanges();

  }
  downloadcsv() {

  }
}
