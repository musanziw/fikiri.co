import {Component} from '@angular/core';
import {FormCardComponent} from '../shared/ui/form-card/form-card.component';
import {TopbarComponent} from '../shared/components/topbar/topbar.component';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {ButtonComponent} from '../shared/ui/button/button.component';
import {InputComponent} from '../shared/ui/input/input.component';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {ButtonOutlineComponent} from '../shared/ui/button-outline/button-outline.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ToastContainerDirective} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {AuthStoreInterface} from '../shared/auth/types/auth-store.interface';
import {loginActions} from "./store/login.actions";

@Component({
  selector: 'fk-login',
  standalone: true,
  imports: [
    FormCardComponent,
    TopbarComponent,
    FooterComponent,
    ButtonComponent,
    InputComponent,
    RouterLink,
    NgOptimizedImage,
    ButtonOutlineComponent,
    ReactiveFormsModule,
    ToastContainerDirective,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(private store: Store<AuthStoreInterface>, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      this.store.dispatch(loginActions.authentication({payload: this.form.value}));
    }
  }
}
