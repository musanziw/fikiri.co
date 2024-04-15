import {Injectable} from '@angular/core';
import {Solution, Image} from "../types/models-interfaces";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  isValideImage(image: string): boolean {
    return image.endsWith('.jpeg') || image.endsWith('.jpg') || image.endsWith('.png')
  }

  valideImage(images: Image[]) {
    return images.find(image => this.isValideImage(image.image_link))
  }

  diplayImage(solution: Solution): string {
    if (solution.image_link && this.isValideImage(solution.image_link)) {
      return 'https://api.fikiri.co/uploads/' + solution.image_link
    }
    if (solution.images && this.valideImage(solution.images)) {
      return 'https://api.fikiri.co/uploads/' + solution.images[0].image_link
    }
    return ''
  }
}
