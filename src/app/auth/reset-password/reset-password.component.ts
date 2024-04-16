import {Component} from '@angular/core';
import {FormCardComponent} from '../../shared/components/form-card/form-card.component';
import {ButtonComponent} from '../../shared/ui/button/button.component';
import {InputComponent} from '../../shared/ui/input/input.component';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {ButtonOutlineComponent} from '../../shared/ui/button-outline/button-outline.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ToastContainerDirective} from 'ngx-toastr';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResetPasswordStore} from "./data-access/reset-password.store";
import {ResetPasswordStoreInterface} from "./types/reset-password-store.interface";

@Component({
  selector: 'fk-login',
  standalone: true,
  imports: [
    FormCardComponent,
    ButtonComponent,
    InputComponent,
    RouterLink,
    NgOptimizedImage,
    ButtonOutlineComponent,
    ReactiveFormsModule,
    ToastContainerDirective,
    AsyncPipe,
    NgIf,
  ],
  providers: [ResetPasswordStore],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  form: FormGroup;
  apiUrl: string = environment.apiUrl
  vm$: Observable<ResetPasswordStoreInterface>

  constructor(private store: ResetPasswordStore, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      token: ['', Validators.minLength(6)],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
    this.vm$ = this.store.vm$
  }

  onSubmit(): void {
    this.store.resetPassword(this.form.value);
  }

  loginWithGoogle(): void {
    return window.location.replace(`${this.apiUrl}auth/google/redirect`);
  }
}
