import { GeneralEnglish, WordsEnglish } from './english';
import { GeneralHindi, WordsHindi } from './hindi';

export const messages = {
    English: {
      ...GeneralEnglish,
      ...WordsEnglish
    },
    Hindi: {
      ...GeneralHindi,
      ...WordsHindi
    }
}
