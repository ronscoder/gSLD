import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { DateserviceService } from '../dateservice.service';
declare var google: any;
declare var result_json: any;

const mapdata = {
  lat: -25.363, lng: 131.044
}
const goldStar = {
  path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  fillColor: 'yellow',
  fillOpacity: 0.8,
  scale: 1,
  strokeColor: 'gold',
  strokeWeight: 14
};

const poleMarkerSVG = {
  path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  fillColor: 'yellow',
  fillOpacity: 0.8,
  scale: 1,
  strokeColor: 'gold',
  strokeWeight: 14
}

const dtrPng = {
  url: '/assets/symbols/dtr_b_w.png',
  // This marker is 20 pixels wide by 32 pixels high.
  // size: new google.maps.Size(20, 32),
  // The origin for this image is (0, 0).
  origin: new google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new google.maps.Point(32 / 2, 24 / 2)
};
const polePng = {
  url: '/assets/symbols/pole_b_t.png',
  // This marker is 20 pixels wide by 32 pixels high.
  // size: new google.maps.Size(20, 32),
  // The origin for this image is (0, 0).
  origin: new google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: new google.maps.Point(42, 32)
};
const poleSymb = {
  path: google.maps.SymbolPath.CIRCLE,
  scale: 3
}

@Component({
  selector: 'app-rendered-map',
  templateUrl: './rendered-map.component.html',
  styleUrls: ['./rendered-map.component.css']
})
export class RenderedMapComponent implements OnInit {
  mapData: any;
  map: any;
  markers = []
  msg: string;
  title = 'SLD for';
  paper = 'a4';
  printWidth;
  printHeight;

  constructor(
    private http: Http,
    private dataservice: DateserviceService
  ) { }

  ngOnInit() {
    // this.importMapData().subscribe((data) => {
    //   const fieldata = data.json();
    //   if (!fieldata) {
    //     this.msg = 'Error: No data';
    //     return;
    //   }
    //   this.prepareMap(fieldata);
    //   // this.prepareMap1();
    // });
    this.mapData = this.dataservice.mapData;
    if (!this.mapData) {
      /// Try loading from local storage
      this.mapData = JSON.parse(localStorage.getItem('mapdata'));
      if (!this.mapData) {
        this.msg = 'Error: No data';
        return;
      }

    }
    this.prepareMap(this.mapData);
    google.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(this.map.getCenter());
  }

  setPaper() {
    console.log('setting paper size');
    switch (this.paper) {
      case 'a4':
        this.printWidth = `${210 - 20}mm`;
        this.printHeight = `${297 - 20}mm`;
        break;
      case 'legal':
        this.printWidth = `${216 - 20}mm`;
        this.printHeight = `${356 - 20}mm`;
        break;
      default:
        this.printWidth = `${210 - 20}mm`;
        this.printHeight = `${297 - 20}mm`;
        break;
    }

  }
  importMapData() {
    return this.http.get('src/app/data.json')
  }

  /// INIT MAP
  prepareMap(fieldata) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17, // 20 building,
      center: fieldata['center'],
      mapTypeId: 'terrain'

    });
    /// PREPARE MARKERS ///
    const branches = [];
    for (let i = 0; i < fieldata.nodes.length; i++) {
      const node = fieldata.nodes[i];
      const marker = new google.maps.Marker({
        position: node['latlng'],
        title: this.nodeTitle(node),  //node['symboltag'],  // TODO: Use a function to summarize all
        draggable: true
      });
      if (node['objtype'] === 'DTR') {
        marker.setLabel(node['label']);   // TODO: Add default label, Pi for Poles, DTRi for DTR
        marker.setIcon(dtrPng);
      } else {
        marker.setLabel(node['label']);   // TODO: Add default label, Pi for Poles, DTRi for DTR
        // marker.setIcon(polePng);
        marker.setIcon(poleSymb);
      }
      // console.log(marker);
      marker.setMap(this.map);
      branches.push(node.sbranches);
    }
    // console.log(branches);
    this.constructBranches(fieldata, branches);
  }

  constructBranches(fieldata: any, matrix: any[]) {
    // const branches = [];
    const nodes = fieldata.nodes;
    /// Last node will not have any source branch -> Deadend
    for (let i = 0; i < matrix.length - 1; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) { continue; }
        // console.log(nodes[i]['latlng']);
        // console.log(nodes[j]['latlng']);
        const branch = [
          nodes[i]['latlng'], nodes[j]['latlng']
        ]
        const path = new google.maps.Polyline({
          path: branch,
          geodesic: true,
          strokeColor: this.getColor(matrix[i][j]),
          strokeOpacity: 1.0,
          strokeWeight: matrix[i][j] * 1.5
        });
        path.setMap(this.map);
      }
    }
  }

  getColor(size) {
    // #FF00FF
    //  1,2,3
    let color = '';
    switch (size) {
      case '1':
        color = '#FF0000';
        break;
      case '2':
        color = '#00FF00';
        break;
      case '3':
        color = '#0000FF';
        break;

      default:
        color = '#0F0F0F';
        break;
    }
    return color;
  }
  nodeTitle(node: any) {
    return `${node['spec']} | ${node['symboltag']} | ${node['objtype']} | ${JSON.stringify(node['latlng'])}`;
  }

  svgRect(l: number, b: number) {
    return 'm1 1 ';
  }
  prepareMap1() {
    const latLng = mapdata;
    // Load map
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: latLng,
      mapTypeId: 'terrain'

    });

    // Add marker
    const marker = new google.maps.Marker({
      position: latLng,
      title: 'SLD Sample 1',
      label: 'P1',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
      },
      draggable: true
    });
    this.map.data.loadGeoJson('../assets/geoJSONSample.json');
    // add market to map
    this.addMarker(marker);

    const marker_t1 = new google.maps.Marker({
      position: { lat: -36.963, lng: 131.044 },
      title: 'SLD Sample 1',
      label: '100KVA',
      icon: dtrPng,
      // scale: 2,
      draggable: true
    });
    marker_t1.setMap(this.map);

    const marker_star = new google.maps.Marker({
      position: this.map.getCenter(),
      icon: goldStar,
      map: this.map
    });
  }
  removeMarkers(marker: any) {
    // marker.setMap(null);
    // mapsetMapOnAll()
  }

  addMarker(marker: any) {
    marker.setMap(this.map);
  }

  ifPrint = false;

  print() {
    window.addEventListener('beforeprint', () => {
      console.log('beforeprint handling...')
      google.maps.event.trigger(this.map, 'resize');
      this.map.setCenter(this.map.getCenter());
    });
    window.print();
  }
}
