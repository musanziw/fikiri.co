import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringsService {
  sliceWord(word: string, length: number, limit: number): string {
    console.log(word.length, length, limit);
    return word.length > length ? word.slice(0, limit) + '...' : word;
  }

  capitalizeFirsteLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  }
}
