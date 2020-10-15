import { Component } from '@angular/core';
import { UserService } from '../service';
import { ToastService } from '../service/toast.service';

import * as _ from 'lodash';

@Component({
    selector: 'ngx-my-work-user',
    styleUrls: ['./user.component.scss'],
    templateUrl: './user.component.html',
})
export class UserComponent {
    public user: any = {
        name: '',
        email: '',
        sex: 'm',
        birth: ''
    };
    
    public userList: any[];

    constructor(private userService: UserService, private toastService: ToastService) {
        this.userService.getAllUsers().then(o => {
            this.userService.setUserList(o);
        }, (error) => {
            alert(error.message);
        });

        this.userService.userList.subscribe((userList) => {
            this.userList = userList;
        })
    }

    editUser(u) {
        this.user = _.clone(u);
    }


    saveUser() {
        let u = this.user;
        this.userService.saveUser(u).then((o) => {
            if (o.success) {
                this.userService.getAllUsers().then(o => {
                    this.toastService.showSuccessToast("This user has been successfully changed.");
                    this.userService.setUserList(o);
                }, (error) => {
                    this.toastService.showErrorToast(error.message);
                });
            }
        }, (error) => {
            this.toastService.showErrorToast(error.message);
        });
    }


    deleteUser(u) {
        this.userService.deleteUser(u).then(o => {
            this.userService.getAllUsers().then(data => {
                this.userService.setUserList(data);
            })
        })
    }
}
