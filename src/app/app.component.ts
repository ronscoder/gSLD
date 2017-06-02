import { Component, OnInit } from '@angular/core';
import data from './data.json';
import { Http } from '@angular/http';
import { DateserviceService } from './dateservice.service';
// declare var XLSX: any;

// declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  showResult = false;

  constructor(
    private http: Http,
    private data: DateserviceService
  ) { }
  ngOnInit() {
    // console.log(data);
    // console.log(result_json);
    // this.testlocation();
  }
  showRenderedMap() {
    this.showResult = !this.showResult;
  }

  readData() {

  }

  // testlocation() {
  //   navigator.geolocation.watchPosition((position) => {
  //     console.log(position);
  //     new google.maps.Map(document.getElementById('map2'), {
  //       center: { lat: position.coords.latitude, lng: position.coords.longitude },
  //       zoom: 18,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     });
  //   }, error => {
  //     console.log(error.message)
  //   })
  // }
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
