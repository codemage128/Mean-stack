import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EqualPasswordsValidator, EmailValidator } from '../../@theme/validators';
import { UserService } from '../../pages/my-work/service';
import { ToastService } from '../../pages/my-work/service/toast.service';

@Component({
  selector: 'ngx-auth-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private toastService: ToastService, private userService: UserService) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public doRegister(values: Object): void {
    if (this.form.valid) {
      this.userService.registerUser({
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      }).then(o => {
        if (o.success) {
          this.toastService.showSuccessToast('Your information has been successfully registered.');
          this.router.navigateByUrl("login");
        } else {
          this.toastService.showErrorToast(o.message);
        }
      }, (error) => {
        this.toastService.showErrorToast(error.message);
      });
    }
  }
}
