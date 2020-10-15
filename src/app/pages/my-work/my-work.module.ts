import { NgModule } from '@angular/core';

import { MyWorkRoutingModule, routedComponents } from './my-work-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../@theme/theme.module';

import { UserService, ProjectService, ToastService } from './service';

@NgModule({
    imports: [
        ThemeModule,
        MyWorkRoutingModule,
        ToasterModule,
        Ng2SmartTableModule
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        UserService,
        ProjectService,
        ToastService
    ]
})
export class MyWorkModule { }
