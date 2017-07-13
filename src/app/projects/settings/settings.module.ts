import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity/activity.component';
import { SetartComponent } from './setart/setart.component';
import { FormsModule } from '@angular/forms';
import { ProjectSettingsService } from '../settings/project-settings.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToPairsPipe } from '../../to-pairs.pipe'
import { CommonComponentsModule } from '../../common-components/common-components.module'
@NgModule({
  imports: [
    CommonModule, FormsModule, CommonComponentsModule
  ],
  declarations: [ActivityComponent, SetartComponent],
  exports: [SetartComponent],
  providers: [ProjectSettingsService, AngularFireDatabase]
})
export class SettingsModule { }
