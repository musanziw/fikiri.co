import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormCardComponent} from '../shared/ui/form-card/form-card.component';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {TopbarComponent} from '../shared/components/topbar/topbar.component';
import {ButtonComponent} from '../shared/ui/button/button.component';
import {ButtonOutlineComponent} from '../shared/ui/button-outline/button-outline.component';
import {InputComponent} from '../shared/ui/input/input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormCardComponent,
    FooterComponent,
    TopbarComponent,
    ButtonComponent,
    ButtonOutlineComponent,
    InputComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.form = this.formBuilder.nonNullable.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      passwordConfirm: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return console.log('Form is invalid');
    }
    console.log(this.form.value);
  }
}
