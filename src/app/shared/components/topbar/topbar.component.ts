import {Component,} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {authActions} from "../../auth/data-access/auth.actions";
import {selectUser as selectAuthUser} from "../../auth/data-access/auth.reducers";
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
  isOpen: boolean = false
  user$: Observable<User | null>
  activePath: string = ''

  constructor(private store: Store) {
    this.user$ = this.store.pipe(select(selectAuthUser));
    // this.activePath = this.route.snapshot.url[0].path
    // console.log(this.route.snapshot.url[0].path)
  }

  commonLinks: LinkInterface[] = [
    {
      name: 'Accueil',
      path: '/',
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

  unAuthenticatedUserLinks(): LinkInterface[] {
    return [
      ...this.commonLinks,
      ...this.authLinks
    ];
  }

  authenticatedUserLinks(username: string): LinkInterface[] {
    return [
      ...this.commonLinks,
      {
        name: this.trimName(username),
        path: '/profile',
      },
    ];
  }

  logOut(): void {
    return this.store.dispatch(authActions.logout());
  }

  private trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  toggleMenu(): boolean {
    return this.isOpen = !this.isOpen
  }
}
