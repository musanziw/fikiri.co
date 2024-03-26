import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'component-about',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
