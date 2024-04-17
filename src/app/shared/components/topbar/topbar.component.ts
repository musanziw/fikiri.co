import {Component, HostListener,} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {authActions} from "../../auth/data-access/auth.actions";
import {selectUser as selectAuthUser} from "../../auth/data-access/auth.reducers";
import {User} from "../../types/models-interfaces";
import {LinkInterface} from "./types/link.interface";
import {FormsModule} from "@angular/forms";
import {AppStoreInterface} from "../../types/app-store.interface";
import {TopbarStoreInterface} from "./types/topbar-store.interface";
import {topbarActions} from "./store/topbar.actions";

@Component({
  selector: 'component-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  topbarState$: Observable<TopbarStoreInterface>
  user$: Observable<User | null>
  vm$: Observable<[User | null, TopbarStoreInterface]>
  isFixed: boolean = false

  constructor(private store: Store<AppStoreInterface>) {
    this.user$ = this.store.pipe(select(selectAuthUser));
    this.topbarState$ = this.store.pipe(select(state => state.topbar));
    this.vm$ = combineLatest([this.user$, this.topbarState$])
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


  toogleNavbar(): void {
    this.store.dispatch(topbarActions.toogleNavbar())
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isFixed = scrollY > 0
  }
}
