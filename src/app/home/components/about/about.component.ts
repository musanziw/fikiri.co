import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage, YouTubePlayer],
  templateUrl: './about.component.html'
})
export class AboutComponent {}
