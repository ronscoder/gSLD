import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network/network.component';
import { ActivityComponent } from './network/activity/activity.component';
import { TaskComponent } from './network/activity/task/task.component';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:pid', component: ProjectComponent }
    ]),
  ],
  // exports: [RouterModule],
  declarations: [NetworkComponent, ActivityComponent, TaskComponent, ProjectsComponent, ProjectComponent]
})
export class ProjectsModule { }
