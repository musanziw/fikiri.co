import {Component, OnDestroy, signal, WritableSignal} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../types/models-interfaces';
import {select, Store} from '@ngrx/store';
import {AppStoreInterface} from '../../types/app-store.interface';
import {userSelector} from '../../auth/store/auth.selectors';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from "../../auth/auth.service";
import * as authActions from "../../auth/store/auth.actions";

@Component({
  selector: 'ui-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnDestroy {
  isOpen: WritableSignal<boolean> = signal(false);
  user$: Observable<User | null>;
  userSubscription$: Subscription;

  constructor(private store: Store<AppStoreInterface>, private router: Router, private authService: AuthService) {
    this.user$ = this.store.pipe(select(userSelector));
    this.userSubscription$ = this.user$.subscribe(user => {
      this.userLinks[0].name = this.trimName(user?.name || '');
    })
  }

  commonLinks: { name: string; path: string }[] = [
    {
      name: 'Appels',
      path: '/calls',
    },
    {
      name: 'Solutions',
      path: '/solutions',
    },
  ]

  authLinks: { name: string; path: string }[] = [
    {
      name: 'Se connecter',
      path: '/login',
    },
    {
      name: "S'inscrire",
      path: '/register',
    },
  ];

  userLinks: { name: string; path: string }[] = [
    {
      name: '',
      path: '/profile',
    },
  ];


  async logOut() {
    await this.router.navigate(['/']);
    this.store.dispatch(authActions.authenticationLogout())
    this.authService.logout().subscribe()
  }

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name
  }

  toggleMenu(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }
}
