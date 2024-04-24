import {Component, Input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Solution, User} from '../../types/models-interfaces';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-solution-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, DatePipe],
  templateUrl: './solution-card.component.html',
})
export class SolutionCardComponent {
  @Input() solution!: Solution;

  displayImage(solution: Solution): string {
    if (!solution.images.length) return ''
    return `${environment.apiUrl}/uploads/${solution.images.at(-1)?.image_link}`
  }

  username(user: User | null): string {
    if (!user) return ''
    return user.name.slice(0, 2).toUpperCase()
  }

  displayProfileImage(user: User | null): string {
    if (!user) return ''
    return `${environment.apiUrl}/uploads/${user.profile}`
  }
}
