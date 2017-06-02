import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network/network.component';
import { ActivityComponent } from './network/activity/activity.component';
import { TaskComponent } from './network/activity/task/task.component';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: NetworkComponent }
    ]),
  ],
  // exports: [RouterModule],
  declarations: [NetworkComponent, ActivityComponent, TaskComponent, ProjectsComponent]
})
export class ProjectsModule { }
