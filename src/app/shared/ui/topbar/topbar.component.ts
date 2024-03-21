import { Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../types/models-interfaces';
import { select, Store } from '@ngrx/store';
import { AppStoreInterface } from '../../types/app-store.interface';
import { userSelector } from '../../auth/store/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'ui-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  isOpen = signal(false);
  user$: Observable<User | null>;

  constructor(private store: Store<AppStoreInterface>, private router: Router) {
    this.user$ = this.store.pipe(select(userSelector));
  }

  links: { name: string; path: string; isShown: boolean }[] = [
    {
      name: 'Solutions',
      path: '/solutions',
      isShown: true,
    },
    {
      name: 'Se connecter',
      path: '/login',
      isShown: true,
    },
    {
      name: "S'inscrire",
      path: '/register',
      isShown: true,
    },
    {
      name: 'Profil',
      path: '/profile',
      isShown: false,
    },
  ];

  async logOut() {
    await this.router.navigate(['/']);
    // this.userService.setUser(null);
    // Assuming a logout API call
    // this.authService.logout().subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }

  trimName(name: string): string {
    if (name.length > 15) {
      return name.substring(0, 15) + '...';
    }
    return name;
  }

  toggleMenu(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
