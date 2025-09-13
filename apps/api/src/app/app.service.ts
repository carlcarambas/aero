import { Injectable } from '@nestjs/common';
import { toIPA } from 'arpabet-and-ipa-convertor-ts';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const word = 'hello';

    try {
      // Dynamic import for ESM module
      const cmc = await import('cmu-pronouncing-dictionary');
      console.log('### DICT ', cmc.default);

      // const arpa = cmc.default[word.toLowerCase()];
      // const returnedWord = toIPA(arpa);
      // return { message: returnedWord };
    } catch (error) {
      console.error('Error loading cmu-pronouncing-dictionary:', error);
    }

    return { message: word };
  }
}
