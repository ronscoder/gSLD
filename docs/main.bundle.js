webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectsComponent = (function () {
    function ProjectsComponent() {
        this.ps = ['P001A', 'P001B'];
    }
    ProjectsComponent.prototype.ngOnInit = function () {
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-projects',
        template: __webpack_require__(174),
        styles: [__webpack_require__(164)]
    }),
    __metadata("design:paramtypes", [])
], ProjectsComponent);

//# sourceMappingURL=projects.component.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dateservice_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderedMapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var xlsxdata = {
    lat: -25.363, lng: 131.044
};
var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
};
var poleMarkerSVG = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
};
var RenderedMapComponent = (function () {
    function RenderedMapComponent(http, dataservice) {
        this.http = http;
        this.dataservice = dataservice;
        this.markers = [];
        this.title = 'SLD for';
        this.paper = 'a4';
        this.ifPrint = false;
    }
    RenderedMapComponent.prototype.ngOnInit = function () {
        // this.importxlsxdata().subscribe((data) => {
        //   const fieldata = data.json();
        //   if (!fieldata) {
        //     this.msg = 'Error: No data';
        //     return;
        //   }
        //   this.prepareMap(fieldata);
        //   // this.prepareMap1();
        // });
        this.xlsxdata = this.dataservice.xlsxdata;
        if (!this.xlsxdata) {
            /// Try loading from local storage
            this.xlsxdata = JSON.parse(localStorage.getItem('xlsxdata'));
            if (!this.xlsxdata) {
                this.msg = 'Error: No data';
                return;
            }
        }
        this.prepareMap(this.xlsxdata);
        google.maps.event.trigger(this.map, 'resize');
        this.map.setCenter(this.map.getCenter());
    };
    RenderedMapComponent.prototype.setPaper = function () {
        console.log('setting paper size');
        switch (this.paper) {
            case 'a4':
                this.printWidth = 210 - 20 + "mm";
                this.printHeight = 297 - 20 + "mm";
                break;
            case 'legal':
                this.printWidth = 216 - 20 + "mm";
                this.printHeight = 356 - 20 + "mm";
                break;
            default:
                this.printWidth = 210 - 20 + "mm";
                this.printHeight = 297 - 20 + "mm";
                break;
        }
    };
    RenderedMapComponent.prototype.importxlsxdata = function () {
        return this.http.get('src/app/data.json');
    };
    /// INIT MAP
    RenderedMapComponent.prototype.prepareMap = function (fieldata) {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: fieldata['center'],
            mapTypeId: 'terrain'
        });
        /// PREPARE MARKERS ///
        var dtrPng = {
            url: './assets/symbols/dtr_b_w.png',
            // This marker is 20 pixels wide by 32 pixels high.
            // size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(32 / 2, 24 / 2)
        };
        var polePng = {
            url: './assets/symbols/pole_b_t.png',
            // This marker is 20 pixels wide by 32 pixels high.
            // size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(42, 32)
        };
        var poleSymb = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3
        };
        var branches = [];
        for (var i = 0; i < fieldata.nodes.length; i++) {
            var node = fieldata.nodes[i];
            var marker = new google.maps.Marker({
                position: node['latlng'],
                title: this.nodeTitle(node),
                draggable: true
            });
            if (node['objtype'] === 'DTR') {
                marker.setLabel(node['label']); // TODO: Add default label, Pi for Poles, DTRi for DTR
                marker.setIcon(dtrPng);
            }
            else {
                marker.setLabel(node['label']); // TODO: Add default label, Pi for Poles, DTRi for DTR
                // marker.setIcon(polePng);
                marker.setIcon(poleSymb);
            }
            // console.log(marker);
            marker.setMap(this.map);
            branches.push(node.sbranches);
        }
        // console.log(branches);
        this.constructBranches(fieldata, branches);
    };
    RenderedMapComponent.prototype.constructBranches = function (fieldata, matrix) {
        // const branches = [];
        var nodes = fieldata.nodes;
        /// Last node will not have any source branch -> Deadend
        for (var i = 0; i < matrix.length - 1; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 0) {
                    continue;
                }
                // console.log(nodes[i]['latlng']);
                // console.log(nodes[j]['latlng']);
                var branch = [
                    nodes[i]['latlng'], nodes[j]['latlng']
                ];
                var path = new google.maps.Polyline({
                    path: branch,
                    geodesic: true,
                    strokeColor: this.getColor(matrix[i][j]),
                    strokeOpacity: 1.0,
                    strokeWeight: matrix[i][j] * 1.5
                });
                path.setMap(this.map);
            }
        }
    };
    RenderedMapComponent.prototype.getColor = function (size) {
        // #FF00FF
        //  1,2,3
        var color = '';
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
    };
    RenderedMapComponent.prototype.nodeTitle = function (node) {
        return node['spec'] + " | " + node['symboltag'] + " | " + node['objtype'] + " | " + JSON.stringify(node['latlng']);
    };
    RenderedMapComponent.prototype.svgRect = function (l, b) {
        return 'm1 1 ';
    };
    RenderedMapComponent.prototype.prepareMap1 = function () {
        var latLng = xlsxdata;
        // Load map
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: latLng,
            mapTypeId: 'terrain'
        });
        // Add marker
        var marker = new google.maps.Marker({
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
        var dtrPng = {
            url: './assets/symbols/dtr_b_w.png',
            // This marker is 20 pixels wide by 32 pixels high.
            // size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(32 / 2, 24 / 2)
        };
        var polePng = {
            url: './assets/symbols/pole_b_t.png',
            // This marker is 20 pixels wide by 32 pixels high.
            // size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(42, 32)
        };
        var poleSymb = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3
        };
        var marker_t1 = new google.maps.Marker({
            position: { lat: -36.963, lng: 131.044 },
            title: 'SLD Sample 1',
            label: '100KVA',
            icon: dtrPng,
            // scale: 2,
            draggable: true
        });
        marker_t1.setMap(this.map);
        var marker_star = new google.maps.Marker({
            position: this.map.getCenter(),
            icon: goldStar,
            map: this.map
        });
    };
    RenderedMapComponent.prototype.removeMarkers = function (marker) {
        // marker.setMap(null);
        // mapsetMapOnAll()
    };
    RenderedMapComponent.prototype.addMarker = function (marker) {
        marker.setMap(this.map);
    };
    RenderedMapComponent.prototype.print = function () {
        var _this = this;
        window.addEventListener('beforeprint', function () {
            console.log('beforeprint handling...');
            google.maps.event.trigger(_this.map, 'resize');
            _this.map.setCenter(_this.map.getCenter());
        });
        window.print();
    };
    return RenderedMapComponent;
}());
RenderedMapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-rendered-map',
        template: __webpack_require__(175),
        styles: [__webpack_require__(165)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */]) === "function" && _b || Object])
], RenderedMapComponent);

var _a, _b;
//# sourceMappingURL=rendered-map.component.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dateservice_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadfileComponent = (function () {
    function UploadfileComponent(router, dataservice) {
        this.router = router;
        this.dataservice = dataservice;
        this.confirmed = false;
    }
    UploadfileComponent.prototype.ngOnInit = function () {
        xlxsMain();
    };
    UploadfileComponent.prototype.ngOnChanges = function () {
    };
    UploadfileComponent.prototype.confirm = function () {
        if (!result_json) {
            this.msg = 'Error: Input data. Verify again';
            return;
        }
        this.confirmed = true;
        this.reviewData();
        /// Navigate
        this.router.navigate([this.dataservice.nextComponent]);
    };
    UploadfileComponent.prototype.reviewData = function () {
        if (!result_json) {
            this.msg = 'Data not imported!';
            return;
        }
        this.prepareMapdate(result_json);
    };
    UploadfileComponent.prototype.prepareMapdate = function (sldData) {
        for (var key in sldData) {
            if (sldData[key]) {
                var data = sldData[key];
                console.log(key);
                var header = data[0];
                var nodes = [];
                for (var i = 1; i < data.length; i++) {
                    var node = {
                        latlng: { lat: +data[i][0], lng: +data[i][1] },
                        objtype: data[i][2],
                        spec: data[i][3],
                        symboltag: data[i][4],
                        label: data[i][5],
                        node: data[i][6],
                        sbranches: data[i].slice(7)
                    };
                    nodes.push(node);
                }
                this.xlsxdata = { nodes: nodes };
                /// Determine center auto... choose the middle value
                console.log('finding center node');
                var center = data[Math.round((data.length) / 2)];
                this.xlsxdata['center'] = {
                    lat: +center[0], lng: +center[1]
                };
                console.log(this.xlsxdata);
                this.dataservice.xlsxdata = this.xlsxdata;
                this.saveDateLocal(this.dataservice.xlsxdata);
            }
        }
    };
    UploadfileComponent.prototype.saveDateLocal = function (data) {
        localStorage.setItem('xlsxdata', JSON.stringify(data));
    };
    UploadfileComponent.prototype.toMap = function () {
        // this.router.navigate(['renderedmap']);
        // return 0;
    };
    return UploadfileComponent;
}());
UploadfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-uploadfile',
        template: __webpack_require__(176),
        styles: [__webpack_require__(166)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */]) === "function" && _b || Object])
], UploadfileComponent);

var _a, _b;
//# sourceMappingURL=uploadfile.component.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "#modules {\r\n    margin: auto;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    /*flex-direction: column;\r\n    -webkit-flex-direction: column;*/\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateserviceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DateserviceService = (function () {
    function DateserviceService() {
    }
    DateserviceService.prototype.parseXML = function (file, cb) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('loadend', function () {
            var xmldata = reader.result;
            cb(_this.getGPS(xmldata));
        });
        reader.readAsText(file);
    };
    DateserviceService.prototype.getGPS = function (xmltext) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xmltext, 'text/xml');
        var gpx = doc.getElementsByTagName('gpx')[0];
        var wpts = gpx.getElementsByTagName('wpt');
        var gpsdata = [];
        for (var i = 0; i < wpts.length; i++) {
            var wpt = wpts[i];
            gpsdata.push({
                latlng: { lat: wpt.getAttribute('lat'), lng: wpt.getAttribute('lon') },
                name: wpt.getElementsByTagName('name')[0].childNodes[0].nodeValue,
                time: wpt.getElementsByTagName('time')[0].childNodes[0].nodeValue
            });
        }
        return gpsdata;
    };
    DateserviceService.prototype.preparexlsxdata = function (sldData) {
        var xlsxdata = { node: {}, center: {} };
        for (var key in sldData) {
            if (sldData[key]) {
                var data = sldData[key];
                console.log(key);
                var header = data[0];
                var nodes = [];
                for (var i = 1; i < data.length; i++) {
                    var node = {
                        latlng: { lat: +data[i][0], lng: +data[i][1] },
                        objtype: data[i][2],
                        spec: data[i][3],
                        symboltag: data[i][4],
                        label: data[i][5],
                        node: data[i][6],
                        sbranches: data[i].slice(7)
                    };
                    nodes.push(node);
                }
                xlsxdata.node = nodes;
                /// Determine center auto... choose the middle value
                console.log('finding center node');
                var center = data[Math.round((data.length) / 2)];
                xlsxdata.center = {
                    lat: +center[0], lng: +center[1]
                };
                // console.log(this.xlsxdata);
                return xlsxdata;
            }
        }
    };
    return DateserviceService;
}());
DateserviceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DateserviceService);

//# sourceMappingURL=dateservice.service.js.map

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

module.exports = "<div class=\"nonprint\">\r\n  <h2 style=\"box-shadow: 1px 1px 1px\">GSLD</h2>\r\n  <div id=\"modules\">\r\n    <button routerLink='/sld'>Prepare SLD (Distribution)</button>\r\n    <button routerLink='/gpx'>Parse GPX Waypoints</button>\r\n    <button routerLink='/projects'>Projects</button>\r\n  </div>\r\n</div>\r\n<br>\r\n<router-outlet></router-outlet>\r\n\r\n<!--<div id=\"map2\" style=\"width: 90%; height: 400px;\"></div>\r\n\r\n<input type=\"file\" id=\"file\" (change)=\"handleFiles($event.target.files)\" accept=\".gpx\">-->"

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

module.exports = "<h2>Prepare SLD</h2>\r\n<div id=\"info\">\r\n  <em>Instructions</em>\r\n  <kbd>\r\n  <ol>\r\n    <li><p>Download the data format (xlsx)</p><a type=\"button\" href=\"assets/sample.xlsx\">Download form/template</a></li>\r\n    <li><p>Prepare the data file</p><a href=\"#\" (click)=\"ifGuide = true; false\">See guide</a></li>\r\n  </ol></kbd>\r\n</div>\r\n<div id=\"guide\" *ngIf=\"ifGuide\">\r\n  📞 <a href=\"tel:+917085098635\">+91 7085 098635</a>\r\n</div>\r\n<h4>Next</h4>\r\n<button  (click)=\"uploadFile()\">Upload data file</button>\r\n<!--\r\n  <li>Upload the file | <button (click)=\"showDrop()\" [disabled]=\"result_json\">Upload</button>\r\n  </li>\r\n\r\n  <li>Review & Validate the data | <button (click)=\"reviewData()\" [disabled]=\"!sldData\">Review Data</button></li>\r\n  <li>Generate SLD overlayed Map | <button (click)=\"showRenderedMap()\" [disabled]=\"!sldData\">Render Map</button></li>\r\n  <li>Adjust zoom level, Map feature type.</li>\r\n  <li>If satisfied, print</li>\r\n  </ol>\r\n  </kbd>\r\n  <div id=\"msg\" style=\"color:red\"><kbd>{{msg}}</kbd></div>\r\n  <div id=\"drop\" [hidden]=\"!ifShowDrop\"><span> Drop a file here</span></div>\r\n\r\n  <div id=\"right\">\r\n    <div id=\"hot\" style=\"overflow: scroll\" class=\"handsontable\"></div>\r\n  </div>\r\n</div>\r\n<app-rendered-map [mapData]=\"mapData\" *ngIf=\"showResult\"></app-rendered-map>\r\n-->"

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

module.exports = "<h4>Select waypoint gpx file</h4><input type=\"file\" id=\"file\" (change)=\"handleFiles($event.target.files)\" accept=\".gpx\">\r\n<br>\r\n<div *ngIf=\"parsedGpx\">\r\n    <button (click)=\"copytoclipboard(gpsdata)\" class=\"ui button\">Copy</button>\r\n    <p class=\"ui yellow label\" *ngIf=\"msg\">{{msg}}</p>\r\n    <div style=\"height:20em; overflow:scroll\">\r\n        <table id=\"gpsdata\" class=\"ui compact table\">\r\n            <thead>\r\n                <th>Ref#</th>\r\n                <th>Latitude</th>\r\n                <th>Longitude</th>\r\n                <th>Time</th>\r\n            </thead>\r\n            <tbody>\r\n                <tr *ngFor=\"let g of parsedGpx\">\r\n                    <td>{{g.name}}</td>\r\n                    <td>{{g.latlng?.lat}}</td>\r\n                    <td>{{g.latlng?.lng}}</td>\r\n                    <td>{{g.time | date: 'medium'}}</td>\r\n                </tr>\r\n            </tbody>\r\n\r\n        </table>\r\n    </div>\r\n    <button class=\"ui green button\">Show map</button>\r\n    <div id=\"map2\" style=\"width: 90%; height: 400px;\"></div>\r\n</div>"

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

module.exports = "<div class=\"activity\">\n  {{actid}} | {{actdata.name}}\n  <h4>Tasks</h4>\n  <app-task *ngFor=\"let t of actdata.tasks\" [tid]=\"t\"></app-task>\n</div>\n"

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = "<div class=\"task\">\n  <dl class=\"ui list\">\n    <dt>Total Quantity</dt>\n    <dd class=\"ui label\">{{task.maxqty}} {{task.unit}}</dd>\n  </dl>\n  <div class=\"ui card\">\n    <h4>Remarks</h4>\n    <p *ngFor=\"let rem of task.remarks\"><span class=\"ui label\">{{rem.date | date:'mediumDate'}}</span> {{rem.text}}</p>\n  </div>\n\n  <table class=\"ui table celled\">\n    <thead>\n      <h4>Issues</h4>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let issue of task.issues\">\n        <td><span class=\"ui label\">{{issue.date | date:'mediumDate'}}</span> {{issue.text}} </td>\n        <td><span>{{issue.status}}</span></td>\n        <td><button>Resolve</button></td>\n      </tr>\n    </tbody>\n  </table>\n  <table class=\"ui table compact celled\">\n    <thead>\n      <div><span class=\"ui header\">{{task.name}}</span><span class=\"ui label\">{{tid}}</span></div>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let c of task.completion; let first = first\">\n        <td>\n          <div [ngClass]=\"{'ui green ribbon label date': first}\">{{c.date | date:'mediumDate'}}</div>\n        </td>\n        <td>{{c.completed}}\n          <progress value=\"{{c.completed}}\" max=\"{{task.maxqty}}\"></progress>\n        </td>\n        <td>{{c.status}}</td>\n        <td>{{c.remark}}\n      </tr>\n    </tbody>\n  </table>\n</div>"

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

module.exports = "<div class=\"network\">\n  {{nid}} | {{nhead.name}} <small>{{nhead.label}}</small>\n  <div *ngFor=\"let sn of  nhead.subnets\">\n    {{sn}}\n  </div>\n\n<h3>Activities</h3>{{nhead.label}}\n<app-activity *ngFor=\"let act of activities\" [actid]=\"act\"></app-activity>\n</div>"

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

module.exports = "<h2>{{pid}}</h2>\n<h3>{{phead?.name}}</h3>\n<h4>{{phead?.status}}</h4>\n<div>{{phead?.startdate1}}</div>\n<div>{{phead?.enddate1}}</div>\n<h2>Networks</h2>\n<app-network *ngFor=\"let nid of networks\" [nid]='nid'></app-network>"

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let p of  ps\">\n  {{p}} <button [routerLink]=\"['/projects', p]\">Select</button>\n</div>"

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

module.exports = "<div class=\"nonprint\" *ngIf=\"!ifPrint\">\r\n    <h3>Result rendered</h3>\r\n    <em>Adjust map by dragging & zooming</em>\r\n    <p class=\"warning\" *ngIf=\"msg\">{{msg}}</p>\r\n    <br><br>\r\n    <label>Enter SLD title</label>\r\n    <input type=\"text\" placeholder=\"Enter SLD title here\" [(ngModel)]=\"title\" style=\"width:50ch\">\r\n    <br>\r\n    <b>Select print paper size</b>\r\n    <br>\r\n    <label>\r\n    <input type=\"radio\" value=\"legal\" [(ngModel)]=\"paper\">Legal</label>\r\n    <br>\r\n    <label>\r\n        <input type=\"radio\" value=\"a4\" [(ngModel)]=\"paper\">A4</label>\r\n    <br>\r\n    <button (click)=\"print()\">Print</button>\r\n</div>\r\n<br>\r\n<div id=\"print\" style=\"border:1px dashed black; padding:4px;\">\r\n    <h4>{{title}}</h4>\r\n    <div id=\"map\" [ngClass]=\"{'a4': paper==='a4', 'legal': paper==='legal'}\"></div>\r\n</div>"

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

module.exports = "<div id=\"drop\" style=\"margin: auto;margin-top:1em;\"><span>Drop your data file here</span></div>\r\n<br>\r\n<h4>Review data</h4>\r\n<div style=\"display:flex\">\r\n  <div id=\"tablexls\" style=\"margin:auto;padding:1em;\">\r\n    <div id=\"hot\" style=\"overflow:scroll;\" class=\"handsontable\"></div>\r\n  </div>\r\n  <div id=\"action\">\r\n    <p *ngIf=\"msg\">{{msg}}</p>\r\n    <button (click)=\"confirm()\">Confirm data</button>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),

/***/ 85:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 85;


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(103);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dateservice_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// declare var XLSX: any;
// declare var google: any;
var AppComponent = (function () {
    function AppComponent(http, data) {
        this.http = http;
        this.data = data;
        this.title = 'app works!';
        this.showResult = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        // console.log(data);
        // console.log(result_json);
        // this.testlocation();
    };
    AppComponent.prototype.showRenderedMap = function () {
        this.showResult = !this.showResult;
    };
    AppComponent.prototype.readData = function () {
    };
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
    AppComponent.prototype.handleFiles = function (files) {
        // this.http.get(files[0]).subscribe(res => {
        //   console.log(res.text)
        // })
        var file = files[0];
        this.data.parseXML(file, function (result) {
            console.log(result);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(167),
        styles: [__webpack_require__(157)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rendered_map_rendered_map_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gen_sld_gen_sld_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__uploadfile_uploadfile_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dateservice_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gpx_gpx_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__projects_projects_module__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__rendered_map_rendered_map_component__["a" /* RenderedMapComponent */],
            __WEBPACK_IMPORTED_MODULE_7__gen_sld_gen_sld_component__["a" /* GenSLDComponent */],
            __WEBPACK_IMPORTED_MODULE_8__uploadfile_uploadfile_component__["a" /* UploadfileComponent */],
            __WEBPACK_IMPORTED_MODULE_10__gpx_gpx_component__["a" /* GpxComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_11__projects_projects_module__["a" /* ProjectsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot([
                { path: 'sld', component: __WEBPACK_IMPORTED_MODULE_7__gen_sld_gen_sld_component__["a" /* GenSLDComponent */] },
                { path: 'renderedmap', component: __WEBPACK_IMPORTED_MODULE_6__rendered_map_rendered_map_component__["a" /* RenderedMapComponent */] },
                { path: 'uploadfile', component: __WEBPACK_IMPORTED_MODULE_8__uploadfile_uploadfile_component__["a" /* UploadfileComponent */] },
                { path: 'gpx', component: __WEBPACK_IMPORTED_MODULE_10__gpx_gpx_component__["a" /* GpxComponent */] },
            ])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__dateservice_service__["a" /* DateserviceService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dateservice_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenSLDComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GenSLDComponent = (function () {
    function GenSLDComponent(router, dataservice) {
        this.router = router;
        this.dataservice = dataservice;
        this.steps = [
            'Download the data format (xlsx',
            'Prepare the data',
            'Upload the file',
            'Review & Validate the data',
            'Click on <kbd>Render Map</kbd> to generate SLD overlayed Map',
            'Adjust zoom level, Map feature type',
            'If satisfied, print'
        ];
        this.ifShowDrop = false;
        this.stephead = -1;
        this.dataReviewed = false;
        this.showResult = false;
        this.ifGuide = false;
    }
    GenSLDComponent.prototype.ngOnInit = function () {
        this.sldData = result_json;
    };
    GenSLDComponent.prototype.showDrop = function () {
        this.ifShowDrop = true;
        xlxsMain();
    };
    GenSLDComponent.prototype.reviewData = function () {
        if (!result_json) {
            this.msg = 'Data not imported!';
            return;
        }
        this.dataReviewed = true;
        this.sldData = result_json;
        console.log(this.sldData);
        this.prepareMapdate(this.sldData);
    };
    GenSLDComponent.prototype.prepareMapdate = function (sldData) {
        for (var key in sldData) {
            if (sldData[key]) {
                var data = sldData[key];
                console.log(key);
                var header = data[0];
                var nodes = [];
                for (var i = 1; i < data.length; i++) {
                    var node = {
                        latlng: { lat: +data[i][0], lng: +data[i][1] },
                        objtype: data[i][2],
                        spec: data[i][3],
                        symboltag: data[i][4],
                        label: data[i][5],
                        node: data[i][6],
                        sbranches: data[i].slice(7)
                    };
                    nodes.push(node);
                }
                this.mapData = { nodes: nodes };
                /// Determine center auto... choose the middle value
                console.log('finding center node');
                var center = data[Math.round((data.length) / 2)];
                this.mapData['center'] = {
                    lat: +center[0], lng: +center[1]
                };
                console.log(this.mapData);
            }
        }
    };
    GenSLDComponent.prototype.showRenderedMap = function () {
        this.showResult = true;
        // this.router.navigate(['renderedmap']);
    };
    GenSLDComponent.prototype.uploadFile = function () {
        this.dataservice.nextComponent = 'renderedmap';
        this.router.navigate(['uploadfile']);
    };
    return GenSLDComponent;
}());
GenSLDComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-gen-sld',
        template: __webpack_require__(168),
        styles: [__webpack_require__(158)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dateservice_service__["a" /* DateserviceService */]) === "function" && _b || Object])
], GenSLDComponent);

var _a, _b;
//# sourceMappingURL=gen-sld.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dateservice_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GpxComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GpxComponent = (function () {
    function GpxComponent(http, data) {
        this.http = http;
        this.data = data;
    }
    GpxComponent.prototype.ngOnInit = function () {
    };
    GpxComponent.prototype.handleFiles = function (files) {
        var _this = this;
        // this.http.get(files[0]).subscribe(res => {
        //   console.log(res.text)
        // })
        var file = files[0];
        this.data.parseXML(file, function (result) {
            console.log(result);
            _this.parsedGpx = result;
        });
    };
    GpxComponent.prototype.copytoclipboard = function (el) {
        // let data = document.querySelector('#gpsdata');
        var data = document.getElementById('gpsdata');
        // console.log(data);
        var range = document.createRange();
        range.selectNode(data);
        window.getSelection().addRange(range);
        try {
            // Now that we've selected the anchor text, execute the copy command
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copied');
            this.msg = 'Data copied';
        }
        catch (err) {
            console.log('Oops, unable to copy');
            this.msg = 'Error copying data';
        }
        // window.getSelection().empty();
        window.getSelection().removeAllRanges();
    };
    GpxComponent.prototype.downloadcsv = function () {
    };
    return GpxComponent;
}());
GpxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-gpx',
        template: __webpack_require__(169),
        styles: [__webpack_require__(159)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__dateservice_service__["a" /* DateserviceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dateservice_service__["a" /* DateserviceService */]) === "function" && _b || Object])
], GpxComponent);

var _a, _b;
//# sourceMappingURL=gpx.component.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ActivityComponent = (function () {
    function ActivityComponent() {
        this.actdata = {
            name: 'act01 - act',
            tasks: ['t1']
        };
    }
    ActivityComponent.prototype.ngOnInit = function () {
        //TODO: get activity details
    };
    return ActivityComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], ActivityComponent.prototype, "actid", void 0);
ActivityComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-activity',
        template: __webpack_require__(170),
        styles: [__webpack_require__(160)]
    }),
    __metadata("design:paramtypes", [])
], ActivityComponent);

//# sourceMappingURL=activity.component.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskComponent = (function () {
    function TaskComponent(formb) {
        this.formb = formb;
    }
    TaskComponent.prototype.ngOnInit = function () {
        this.task = {
            name: 'Pole Erection',
            maxqty: 12,
            completion: [
                { completed: 10, date: (new Date()).getTime(), remark: 'Slow', status: 'ongoing' },
                { completed: 10, date: (new Date()).getTime(), remark: 'Slow', status: 'halt' }
            ],
            unit: 'EA',
            date: (new Date()).getTime(),
            remarks: [
                { date: new Date().getTime(), text: 'slow' },
                { date: new Date().getTime(), text: 'good' }
            ],
            issues: [
                { date: new Date().getTime(), text: 'issue1', status: 'open', resolution: '' },
                { date: new Date().getTime(), text: 'issue2', status: 'resolved', resolution: 'Reported to SD' }
            ]
        };
    };
    return TaskComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], TaskComponent.prototype, "tid", void 0);
TaskComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-task',
        template: __webpack_require__(171),
        styles: [__webpack_require__(161)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _a || Object])
], TaskComponent);

var _a;
//# sourceMappingURL=task.component.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NetworkComponent = (function () {
    function NetworkComponent() {
        this.nhead = {
            name: 'LAM',
            label: 'DIV',
            subnets: ['sn1']
        };
        this.activities = ['act1'];
    }
    NetworkComponent.prototype.ngOnInit = function () {
        //TODO: Fetch nhead for each network
        //TODO: Fetch activities
    };
    return NetworkComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], NetworkComponent.prototype, "nid", void 0);
NetworkComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-network',
        template: __webpack_require__(172),
        styles: [__webpack_require__(162)]
    }),
    __metadata("design:paramtypes", [])
], NetworkComponent);

//# sourceMappingURL=network.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectComponent = (function () {
    function ProjectComponent(router, route) {
        this.router = router;
        this.route = route;
        this.networks = ['P01N1'];
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.pid = this.route.params['pid'];
        // Get P details here
        this.phead = {
            name: 'Pname001',
            status: 'ONGOING',
            startdate1: '22-may-2017',
            enddate1: '13-april-2017'
        };
    };
    return ProjectComponent;
}());
ProjectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-project',
        template: __webpack_require__(173),
        styles: [__webpack_require__(163)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object])
], ProjectComponent);

var _a, _b;
//# sourceMappingURL=project.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__network_network_component__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__network_activity_activity_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__network_activity_task_task_component__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__projects_projects_component__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_project_component__ = __webpack_require__(98);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectsModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ProjectsModule = (function () {
    function ProjectsModule() {
    }
    return ProjectsModule;
}());
ProjectsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forChild([
                { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_6__projects_projects_component__["a" /* ProjectsComponent */] },
                { path: 'projects/:pid', component: __WEBPACK_IMPORTED_MODULE_7__project_project_component__["a" /* ProjectComponent */] }
            ]),
        ],
        // exports: [RouterModule],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__network_network_component__["a" /* NetworkComponent */], __WEBPACK_IMPORTED_MODULE_3__network_activity_activity_component__["a" /* ActivityComponent */], __WEBPACK_IMPORTED_MODULE_4__network_activity_task_task_component__["a" /* TaskComponent */], __WEBPACK_IMPORTED_MODULE_6__projects_projects_component__["a" /* ProjectsComponent */], __WEBPACK_IMPORTED_MODULE_7__project_project_component__["a" /* ProjectComponent */]]
    })
], ProjectsModule);

//# sourceMappingURL=projects.module.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.bundle.js.map