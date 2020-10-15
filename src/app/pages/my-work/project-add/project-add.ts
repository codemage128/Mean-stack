import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, ProjectService, ToastService } from '../service';

@Component({
    selector: 'project-add',
    templateUrl: './project-add.html',
})
export class ProjectAddComponent {

    public form: FormGroup;
    public title: AbstractControl;
    public expiration: AbstractControl;
    public attendent: AbstractControl;
    public submitted: boolean = false;
    public userList: any[];

    constructor(fb: FormBuilder, private router: Router, private userService: UserService, private projectService: ProjectService, private toastService: ToastService) {
        this.form = fb.group({
            'title': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'expiration': ['', Validators.compose([Validators.required])],
            'attendent': ['', Validators.compose([Validators.required])],
        });

        this.title = this.form.controls['title'];
        this.expiration = this.form.controls['expiration'];
        this.attendent = this.form.controls['attendent'];

        this.userService.getAllUsers().then(o => {
            this.userService.setUserList(o);
        }, (error) => {
            this.toastService.showErrorToast(error.message);
        });

        this.userService.userList.subscribe((userList) => {
            this.userList = userList;
        })

    }

    saveProject(o) {
        this.projectService.addProject(o).then(o => {
            if (o.success) {
                this.toastService.showSuccessToast('This project is successfully registered.');
                this.router.navigateByUrl("/pages/my-work/project");
            } else {
                alert(o.message);
            }
        }, (error) => {
            alert(error.message);
        })
    }

    cancel() {
        this.router.navigateByUrl("/pages/my-work/project");
    }

}
