import {Injectable} from '@angular/core';
import {Solution, SolutionImages} from "../types/models-interfaces";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  isValideImage(image: string) {
    return image.endsWith('.jpeg') || image.endsWith('.jpg') || image.endsWith('.png')
  }

  valideImage(images: SolutionImages[]) {
    return images.find(image => this.isValideImage(image.imageLink))
  }

  diplayImage(solution: Solution) {
    if (solution.imageLink && this.isValideImage(solution.imageLink)) {
      return 'https://api.fikiri.co/uploads/' + solution.imageLink
    }
    if (solution.images && this.valideImage(solution.images)) {
      return 'https://api.fikiri.co/uploads/' + solution.images[0].imageLink
    }
    return '/assets/images/about.jpeg'
  }
}
