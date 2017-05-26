import { Component, OnInit } from '@angular/core';
import { DateserviceService } from '../dateservice.service';

@Component({
  selector: 'app-gpx',
  templateUrl: './gpx.component.html',
  styleUrls: ['./gpx.component.css']
})
export class GpxComponent implements OnInit {

  constructor(
    private data: DateserviceService

  ) { }

  ngOnInit() {
  }
  handleFiles(files) {
    // this.http.get(files[0]).subscribe(res => {
    //   console.log(res.text)
    // })
    const file = files[0];
    this.data.parseXML(file, (result) => {
      console.log(result);
    })
  }
}
