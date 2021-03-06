import { Difficulty } from '../constants/textbook';

interface IWord {
  id?: 'string';
  _id?: 'string';
  group: 0;
  page: 0;
  word: 'string';
  image: 'string';
  audio: 'string';
  audioMeaning: 'string';
  audioExample: 'string';
  textMeaning: 'string';
  textExample: 'string';
  transcription: 'string';
  wordTranslate: 'string';
  textMeaningTranslate: 'string';
  textExampleTranslate: 'string';
  userWord?: { difficulty: Difficulty, optional?: IOptional };
}

interface IValue {
  email: string;
  password: string;
}

interface IStorageData {
  message: string;
  refreshToken: string;
  token: string;
  userId: string;
}

interface IOptional {
  right: number;
  wrong: number;
  series: number;
}

export {
  IWord, IValue, IStorageData, IOptional,
};
