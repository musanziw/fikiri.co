import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectAuthState} from "../store/auth.reducers";
import {AuthStoreInterface} from "../types/auth-store.interface";
import {AsyncPipe, DatePipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Solution, User} from "../../shared/types/models-interfaces";
import {InputComponent} from "../../shared/ui/input/input.component";
import {ButtonComponent} from "../../shared/ui/button/button.component";
import {HttpClient} from "@angular/common/http";
import {CapitalizeFirstLetterPipe} from "../../shared/pipes/capitalizeFirstLetter.pipe";
import {ImagesService} from "../../shared/services/images.service";
import {authActions} from "../store/auth.actions";

@Component({
  selector: 'fk-profile',
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
    CapitalizeFirstLetterPipe
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  authState$: Observable<AuthStoreInterface>
  activeTab: WritableSignal<string> = signal('profil')
  @Input() requiredFileType: string = 'image/png';
  fileName: string = '';

  constructor(private store: Store, private formBuilder: FormBuilder, private http: HttpClient, private imagesService: ImagesService) {
    this.authState$ = this.store.pipe(select(selectAuthState))
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      oldPassword: [''],
      password: [''],
      passwordConfirm: [''],
    });
  }

  ngOnInit(): void {
    this.authState$
      .subscribe((state) => {
        this.form.patchValue({
          name: state.user?.name,
          address: state.user?.address,
          phoneNumber: state.user?.phoneNumber,
        })
      }).unsubscribe()
  }

  username(user: User | null): string {
    if (!user) return ''
    return user.name.slice(0, 2).toUpperCase()
  }

  displayProfile(user: User | null): string {
    if (user?.profile) return 'https://api.fikiri.co/uploads/' + user.profile
    if (user?.googleImage && !user?.profile) return user.googleImage
    return ''
  }

  onSubmit(): void {
    this.store.dispatch(authActions.updateProfile({payload: this.form.value}))
  }

  onTabChange(tab: string): void {
    this.activeTab.set(tab)
  }

  onFileSelected(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0]
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumb", file);
      this.store.dispatch(authActions.updateImage({payload: formData}))
    }
  }

  displayImage(solution: Solution): string {
    return this.imagesService.diplayImage(solution);
  }
}
