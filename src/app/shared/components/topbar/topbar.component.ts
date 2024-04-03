import {Component,} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {authActions} from "../../../auth/store/auth.actions";
import {selectUser as selectAuthUser} from "../../../auth/store/auth.reducers";
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

  constructor(private store: Store) {
    this.user$ = this.store.pipe(select(selectAuthUser));
  }

  commonLinks: LinkInterface[] = [
    {
      name: 'Appels',
      path: '/call/1',
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

  protected toggleMenu(): boolean {
    return this.isOpen = !this.isOpen
  }

}
