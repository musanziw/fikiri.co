import {Component, OnDestroy} from '@angular/core';
import {FormCardComponent} from '../shared/components/form-card/form-card.component';
import {ButtonComponent} from '../shared/ui/button/button.component';
import {InputComponent} from '../shared/ui/input/input.component';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {ButtonOutlineComponent} from '../shared/ui/button-outline/button-outline.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ToastContainerDirective} from 'ngx-toastr';
import {select, Store} from '@ngrx/store';
import {AuthStoreInterface} from '../shared/auth/types/auth-store.interface';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {authActions} from "../shared/auth/store/auth.actions";
import {selectAuthState} from "../shared/auth/store/auth.reducers";

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
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  apiUrl: string = environment.apiUrl
  state$: Observable<AuthStoreInterface>

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')],
      password: ['', Validators.required],
    });
    this.state$ = this.store.pipe(select(selectAuthState))
  }

  onSubmit(): void {
    this.store.dispatch(authActions.login({payload: this.form.value}))
  }

  loginWithGoogle(): void {
    return window.location.replace(`${this.apiUrl}auth/google/redirect`);
  }

  ngOnDestroy(): void {
    this.store.dispatch(authActions.deleteError());
  }
}
