import { Component, Input, OutputEmitterRef, output } from '@angular/core';
import { User } from '../../../../shared/types/models-interfaces';
import { AsyncPipe, CommonModule, DatePipe, NgIf, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { UserInfoStore } from './data-access/user-info.store';
import { Observable } from 'rxjs';
import { UserInfoStoreInterface } from './types/user-info-store.interface';
import { MessageComponent } from '../../../../shared/components/message/message.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  providers: [UserInfoStore],
  templateUrl: './user-info.component.html',
  imports: [NgOptimizedImage, CommonModule, MessageComponent]
})
export class UserInfoComponent {
  vm$: Observable<{ userInfoState: UserInfoStoreInterface; user: User | null }>;

  constructor(private userInfoStore: UserInfoStore) {
    this.vm$ = this.userInfoStore.vm$;
  }

  displayProfile(user: User): string {
    if (user.profile) return environment.apiUrl + 'uploads/profiles/' + user.profile;
    return user.google_image;
  }

  splitUsername(user: User): string {
    const name = user.name.split(' ');
    return name[0][0].toUpperCase() + ' ' + (name[1] ? name[1][0].toUpperCase() : '');
  }

  onImageChange(event: Event, userId: number): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      console.log('formData :', formData, 'userId :', userId);
      // this.store.updateImage({ file: formData, userId });
    }
  }

  closeUserInfoMessage(): void {
    this.userInfoStore.resetUpdateImageMessage();
  }
}
