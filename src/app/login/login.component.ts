import {Component, OnDestroy} from '@angular/core';
import {FormCardComponent} from '../shared/ui/form-card/form-card.component';
import {TopbarComponent} from '../shared/ui/topbar/topbar.component';
import {FooterComponent} from '../shared/ui/footer/footer.component';
import {ButtonComponent} from '../shared/ui/button/button.component';
import {InputComponent} from '../shared/ui/input/input.component';
import {Router, RouterLink} from '@angular/router';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {ButtonOutlineComponent} from '../shared/ui/button-outline/button-outline.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {LoginService} from './login.service';
import {AuthStoreInterface} from '../shared/auth/types/auth-store.interface';
import {authActions} from "../shared/auth/store/auth.actions";

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
export class LoginComponent implements OnDestroy {
  form!: FormGroup;
  isLoading: boolean = false;
  subscription$: Subscription = new Subscription();

  constructor(private store: Store<AuthStoreInterface>, private formBuilder: FormBuilder,
              private router: Router, private toast: ToastrService,
              private loginService: LoginService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  showSuccess(): void {
    this.toast.success('Connexion réussie');
  }

  showError(error: string): void {
    this.toast.error(error);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      this.showError('Impossible de se connecter au serveur');
    } else {
      this.showError(error.error.message);
    }
    return throwError(() => new Error('Essayer à nouveau !'));
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      this.isLoading = true;
      this.subscription$ = this.loginService.login(this.form.value).subscribe({
        next: async (user) => {
          this.store.dispatch(authActions.authenticate({user}));
          this.showSuccess();
          await this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.store.dispatch(authActions.authenticationFailure(err.error.message));
          this.handleError(err);
        },
      });
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
