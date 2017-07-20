import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network/network.component';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueComponent } from './issue/issue.component';
import { ProjectserviceService } from './projectservice.service';
import { SiteComponent } from './site/site.component';
import { FormCreateTaskComponent } from './form-create-task/form-create-task.component';
import { SettingsModule } from './settings/settings.module';
import { ToPairsPipe } from '../to-pairs.pipe'
import { CommonComponentsModule } from '../common-components/common-components.module';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { NewActivityComponent } from './new-activity/new-activity.component';


@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild([
      {
        path: 'projects', component: ProjectsComponent,
        children: [
          { path: 'project', component: ProjectComponent },
          { path: 'toSite', component: SiteComponent },
        ]
      }
    ]),
    FormsModule, ReactiveFormsModule,
    SettingsModule, NgSemanticModule
  ],
  // exports: [RouterModule],
  providers: [ProjectserviceService],
  declarations: [NetworkComponent, ActivityComponent, TaskComponent,
    ProjectsComponent, ProjectComponent, IssueComponent, SiteComponent, FormCreateTaskComponent, NewActivityComponent],
  exports: [RouterModule]
})
export class ProjectsModule { }
