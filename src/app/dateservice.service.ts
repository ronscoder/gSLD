import { Injectable } from '@angular/core';

@Injectable()
export class DateserviceService {
  xlsxdata: any;
  nextComponent: any;
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
    const gpsdata = [];
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

  preparexlsxdata(sldData) {
    const xlsxdata: { node: any, center: any } = { node: {}, center: {} };
    for (let key in sldData) {
      if (sldData[key]) {
        const data = sldData[key];
        console.log(key);
        const header = data[0];
        const nodes = [];
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
        xlsxdata.node = nodes;
        /// Determine center auto... choose the middle value
        console.log('finding center node')
        const center = data[Math.round((data.length) / 2)];
        xlsxdata.center = {
          lat: +center[0], lng: +center[1]
        };
        // console.log(this.xlsxdata);
        return xlsxdata;

      }
    }
  }
}
