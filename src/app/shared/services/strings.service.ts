import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringsService {
  sliceWord(word: string, length: number, limit: number) {
    return word.length > length ? word.slice(0, limit) + " ..." : word;
  };

  capitalizeFirsteLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  }
}
