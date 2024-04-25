import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/types/models-interfaces';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ProfileStore } from './data-access/profile.store';
import { ProfileStoreInterface } from './types/profile-store.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
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
  ],
  providers: [ProfileStore],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  fileName: string = '';
  vm$: Observable<{ profileState: ProfileStoreInterface; user: User | null }>;

  constructor(
    private store: ProfileStore,
    private formBuilder: FormBuilder,
  ) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vm$
      .subscribe((state) => {
        this.form.patchValue({
          name: state.user?.name,
          address: state.user?.address,
          phone_number: state.user?.phone_number,
        });
      })
      .unsubscribe();
  }

  username(user: User | null): string {
    if (!user) return '';
    return user.name.slice(0, 2).toUpperCase();
  }

  displayProfile(user: User | null): string {
    if (user?.profile) return 'https://api.fikiri.co/uploads/' + user.profile;
    if (user?.googleImage && !user?.profile) return user.googleImage;
    return '';
  }

  onSubmit(): void {
    this.store.upatedProfile(this.form.value);
  }

  uploadFIle(event: Event): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      this.fileName = file.name;
      const formData: FormData = new FormData();
      formData.append('thumb', file);
      this.store.updateImage(formData);
    }
  }
}
