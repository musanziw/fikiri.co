import {Component, OnDestroy} from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormCardComponent} from '../shared/components/form-card/form-card.component';
import {ButtonComponent} from '../shared/ui/button/button.component';
import {ButtonOutlineComponent} from '../shared/ui/button-outline/button-outline.component';
import {InputComponent} from '../shared/ui/input/input.component';
import {select, Store} from "@ngrx/store";
import {authActions} from "../shared/auth/store/auth.actions";
import {selectAuthState} from "../shared/auth/store/auth.reducers";
import {Observable} from "rxjs";
import {AuthStoreInterface} from "../shared/auth/types/auth-store.interface";
import {ApiValiationsErrorsInterface} from "../shared/auth/types/api-valiations-errors.interface";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormCardComponent,
    ButtonComponent,
    ButtonOutlineComponent,
    InputComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnDestroy {
  form: FormGroup;
  state$: Observable<AuthStoreInterface>;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.state$ = this.store.pipe(select(selectAuthState))
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      email: ['', Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.store.dispatch(authActions.register({payload: this.form.value}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(authActions.deleteError());
  }

  getError(errors: ApiValiationsErrorsInterface[], field: string): string {
    const error = errors.find((error: ApiValiationsErrorsInterface) => error.property === field);
    if (!error) return "";
    return error.message;
  }
}
