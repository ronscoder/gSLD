import { Injectable } from '@angular/core';

@Injectable()
export class DateserviceService {
  mapData: any;
  constructor() { }

  parseXML(file, cb) {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      const xmldata = reader.result;
      cb(this.getGPS(xmldata));
    });
    reader.readAsText(file);
  }

  getGPS(xmltext: string): any[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmltext, 'text/xml');
    const gpx = doc.getElementsByTagName('gpx')[0];
    const wpts = gpx.getElementsByTagName('wpt');
    let gpsdata = [];
    for (let i = 0; i < wpts.length; i++) {
      const wpt = wpts[i];
      gpsdata.push(
        {
          latlng: { lat: wpt.getAttribute('lat'), lng: wpt.getAttribute('lon') },
          name: wpt.getElementsByTagName('name')[0].childNodes[0].nodeValue,
          time: wpt.getElementsByTagName('time')[0].childNodes[0].nodeValue
        }
      )
    }
    return gpsdata;
  }
}
