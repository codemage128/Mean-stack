import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../pages/my-work/service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  menuClick(u) {
    if(u.title = "Log out"){
      this.userService.signOut().then(o => {
        if (o.success) {
          this.userService.setUser(null);
          this.userService.setIsLogin(false);
          this.userService.setToken(null);
          this.router.navigateByUrl("login");
        } else {
          alert(o.message);
        }
      }, (error) => {
        alert(error.message);
      });
    }
  }
}
