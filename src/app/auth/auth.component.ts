import { Component } from '@angular/core';

@Component({
  selector: 'ngx-auth',
  template: `
    <ngx-auth-layout>
      <router-outlet></router-outlet>
    </ngx-auth-layout>
  `,
})
export class AuthComponent {
}
