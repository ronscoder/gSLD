import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RenderedMapComponent } from './rendered-map/rendered-map.component';
import { GenSLDComponent } from './gen-sld/gen-sld.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { DateserviceService } from './dateservice.service';
import { GpxComponent } from './gpx/gpx.component';
import { ProjectsModule } from './projects/projects.module';
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabase } from 'angularfire2/database';
import { ToPairsPipe } from './to-pairs.pipe';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { CommonComponentsModule } from './common-components/common-components.module';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDveeoZp9Ua4vHGZW-c2cFFsV-lvNfniWk",
  authDomain: "pmuiii-e78f3.firebaseapp.com",
  databaseURL: "https://pmuiii-e78f3.firebaseio.com",
  projectId: "pmuiii-e78f3",
  storageBucket: "",
  messagingSenderId: "139902991213"
};

@NgModule({
  declarations: [
    AppComponent,
    RenderedMapComponent,
    GenSLDComponent,
    UploadfileComponent,
    GpxComponent,
    WrapperComponent,
    // ProjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ProjectsModule,
    AngularFireModule.initializeApp(config),
    // CommonComponentsModule,
    // AngularFireModule.initializeApp(config),
    RouterModule.forRoot([
      { path: 'sld', component: GenSLDComponent },
      { path: 'renderedmap', component: RenderedMapComponent },
      { path: 'uploadfile', component: UploadfileComponent },
      { path: 'gpx', component: GpxComponent },
      // { path: 'projects', component: ProjectsComponent }
      // { path: 'projects', component: ProjectsModule }.
      // { path: 'projects', redirectTo: '/projects', pathMatch: 'full' },

    ],
    )
  ],
  providers: [DateserviceService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
