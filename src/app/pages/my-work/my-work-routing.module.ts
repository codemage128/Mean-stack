import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyWorkComponent } from './my-work.componet';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAddComponent } from './project-add/project-add';

const routes: Routes = [{
    path: '',
    component: MyWorkComponent,
    children: [
        {
            path: 'user',
            component: UserComponent
        },
        {
            path: 'project',
            component: ProjectComponent
        },
        {
            path: 'project-add',
            component: ProjectAddComponent
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyWorkRoutingModule { }

export const routedComponents = [
    MyWorkComponent,
    UserComponent,
    ProjectComponent,
    ProjectAddComponent
];
