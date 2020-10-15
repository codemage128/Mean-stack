import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { UserService } from '../pages/my-work/service';

import { ToastService } from '../pages/my-work/service/toast.service';

@NgModule({
    imports: [
        AuthRoutingModule,
        ToasterModule,
        ThemeModule
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        UserService,
        ToastService
    ]
})
export class AuthModule { }
