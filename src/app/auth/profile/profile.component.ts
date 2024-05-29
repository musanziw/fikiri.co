import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/types/models-interfaces';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ProfileStore } from './data-access/profile.store';
import { ProfileStoreInterface } from './types/profile-store.interface';
import { environment } from '../../../environments/environment';
import { MessageComponent } from '../../shared/components/message/message.component';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileStore],
  templateUrl: './profile.component.html',
  imports: [
    AsyncPipe,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    NgOptimizedImage,
    DatePipe,
    InputComponent,
    ButtonComponent,
    FormsModule,
    NgClass,
    MessageComponent,
    SpinnerComponent
  ]
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  updatePasswordForm: FormGroup;
  vm$: Observable<{ profileState: ProfileStoreInterface; user: User | null }>;

  constructor(private store: ProfileStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
    this.updatePasswordForm = this.formBuilder.nonNullable.group({
      old_password: [''],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.vm$.pipe(takeUntil(this.store.destroy$)).subscribe((state) => {
      this.form.patchValue({
        name: state.user?.name,
        address: state.user?.address,
        phone_number: state.user?.phone_number
      });
    });
  }

  closeInfoUpdateMessage(): void {
    this.store.setInfoUpdateMessage({ type: null, message: null });
  }

  closePasswordUpdateMessage(): void {
    this.store.setPasswordUpdateMessage({ type: null, message: null });
  }

  splitUsername(user: User): string {
    const name = user.name.split(' ');
    return name[0][0].toUpperCase() + ' ' + (name[1] ? name[1][0].toUpperCase() : '');
  }

  displayProfile(user: User): string {
    if (user.profile) return environment.apiUrl + 'uploads/profiles/' + user.profile;
    return user.google_image;
  }

  onSubmit(): void {
    this.store.upatedProfile(this.form.value);
  }

  uploadImage(event: Event): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('thumb', file);
      this.store.updateImage(formData);
    }
  }

  submitPasswordForm(): void {
    this.store.updatePassword(this.updatePasswordForm.value);
  }

  closeImageUpdateMessage(): void {
    this.store.setUpdateImageMessage({ type: null, message: null });
  }
}
