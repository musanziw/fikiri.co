import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authActions } from '../../auth/data-access/auth.actions';
import { selectUser as selectAuthUser } from '../../auth/data-access/auth.reducers';
import { User } from '../../types/models-interfaces';
import { LinkInterface } from './types/link.interface';
import { FormsModule } from '@angular/forms';
import { AppStoreInterface } from '../../types/app-store.interface';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  user$: Observable<User | null>;
  isOpen: boolean = false;

  constructor(
    private store: Store<AppStoreInterface>,
    private router: Router
  ) {
    this.user$ = this.store.pipe(select(selectAuthUser));
  }

  commonLinks: LinkInterface[] = [
    {
      name: 'Accueil',
      path: '/'
    },
    {
      name: 'Solutions',
      path: '/solutions'
    }
  ];

  authLinks: LinkInterface[] = [
    {
      name: 'Se connecter',
      path: '/login'
    },
    {
      name: "S'inscrire",
      path: '/register'
    }
  ];

  unAuthenticatedUserLinks(): LinkInterface[] {
    return [...this.commonLinks, ...this.authLinks];
  }

  authenticatedUserLinks(username: string): LinkInterface[] {
    return [
      ...this.commonLinks,
      {
        name: this.trimName(username),
        path: '/profile'
      }
    ];
  }

  logOut(): void {
    return this.store.dispatch(authActions.logout());
  }

  private trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  openNavbar(): void {
    this.isOpen = true;
  }

  closeNavbar(): void {
    this.isOpen = false;
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  linkClass(path: string) {
    const isActive = this.isActive(path);
    return isActive
      ? 'inline-block text-green-400 hover:text-green-400'
      : 'inline-block hover:text-green-300 transition-colors duration-300';
  }
}
