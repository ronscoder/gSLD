import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RenderedMapComponent } from './rendered-map/rendered-map.component';
import { GenSLDComponent } from './gen-sld/gen-sld.component';

@NgModule({
  declarations: [
    AppComponent,
    RenderedMapComponent,
    GenSLDComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'sld', component: GenSLDComponent },
      { path: 'renderedmap', component: RenderedMapComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
