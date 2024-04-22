import {Component} from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'component-partners',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './partners.component.html',
})
export class PartnersComponent {
  partainers = [
    {
      id: 1,
      name: "ingenious city",
      src: "/assets/images/partainers/1.png",
    },
    {
      id: 2,
      name: "Un jour nouveau",
      src: "/assets/images/partainers/2.png",
    },
    {
      id: 3,
      name: "waza",
      src: "/assets/images/partainers/3.png",
    },
    {
      id: 4,
      name: "ukamili",
      src: "/assets/images/partainers/4.png",
    },
    {
      id: 5,
      name: "kadea",
      src: "/assets/images/partainers/5.png",
    },
    {
      id: 6,
      name: "ikiotahub",
      src: "/assets/images/partainers/6.png",
    },
    {
      id: 7,
      name: "work space",
      src: "/assets/images/partainers/7.png",
    },
    {
      id: 8,
      name: "kivuTech",
      src: "/assets/images/partainers/8.png",
    },
    {
      id: 9,
      name: "akili",
      src: "/assets/images/partainers/9.png",
    },
    {
      id: 10,
      name: "innovation hub",
      src: "/assets/images/partainers/10.png",
    },
    {
      id: 11,
      name: "habariRDC",
      src: "/assets/images/partainers/11.png",
    },
    {
      id: 12,
      name: "creationHub",
      src: "/assets/images/partainers/12.png",
    },
    {
      id: 13,
      name: "sadek",
      src: "/assets/images/partainers/13.png",
    },
    {
      id: 14,
      name: "base",
      src: "/assets/images/partainers/14.png",
    },
    {
      id: 15,
      name: "luba hub",
      src: "/assets/images/partainers/15.png",
    },
    {
      id: 16,
      name: "yPardRDC",
      src: "/assets/images/partainers/16.png",
    },
  ];
}
