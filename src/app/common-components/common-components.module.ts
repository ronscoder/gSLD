import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToPairsPipe } from '../to-pairs.pipe'
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
// import { SemanticMenuComponent } from 'ng-semantic';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToPairsPipe],
  exports: [ToPairsPipe]
})
export class CommonComponentsModule { }
