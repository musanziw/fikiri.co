import {Component, signal, WritableSignal,} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppStoreInterface} from '../../types/app-store.interface';
import {Observable, tap} from 'rxjs';
import {authActions} from "../../auth/store/auth.actions";
import {selectUser} from "../../auth/store/auth.reducers";
import {User} from "../../types/models-interfaces";
import {LinkInterface} from "./types/link.interface";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'component-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  isOpen: WritableSignal<boolean> = signal(false);
  user$: Observable<User | null>

  constructor(private store: Store<AppStoreInterface>, private router: Router) {
    this.user$ = this.store.pipe(select(selectUser))
  }

  setUsername(): Observable<User | null> {
    return this.user$.pipe(tap((user) => {
      if (!user) return ''
      return this.userLinks[0].name = this.trimName(user.name);
    }))
  }

  commonLinks: LinkInterface[] = [
    {
      name: 'Appels',
      path: '/calls',
    },
    {
      name: 'Solutions',
      path: '/solutions',
    },
  ];

  authLinks: LinkInterface[] = [
    {
      name: 'Se connecter',
      path: '/login',
    },
    {
      name: "S'inscrire",
      path: '/register',
    },
  ];

  userLinks: LinkInterface[] = [
    {
      name: '',
      path: '/profile',
    },
  ];

  logOut(): Promise<boolean> {
    this.store.dispatch(authActions.logout());
    return this.router.navigate(['/'])
  }

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toggleMenu(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

}
