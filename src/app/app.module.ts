import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RenderedMapComponent } from './rendered-map/rendered-map.component';
import { GenSLDComponent } from './gen-sld/gen-sld.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { DateserviceService } from './dateservice.service';
import { GpxComponent } from './gpx/gpx.component';
import { ProjectsModule } from './projects/projects.module';
import { NetworkComponent } from './projects/network/network.component';

@NgModule({
  declarations: [
    AppComponent,
    RenderedMapComponent,
    GenSLDComponent,
    UploadfileComponent,
    GpxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProjectsModule,
    RouterModule.forRoot([
      { path: 'sld', component: GenSLDComponent },
      { path: 'renderedmap', component: RenderedMapComponent },
      { path: 'uploadfile', component: UploadfileComponent },
      { path: 'gpx', component: GpxComponent },
      // { path: 'projects', component: ProjectsModule }.
      // { path: 'projects', redirectTo: '/projects', pathMatch: 'full' },

    ],
    )
  ],
  providers: [DateserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
