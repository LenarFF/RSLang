import { IWord } from './types/interface';

interface IState {
  group: number | null;
  page: number | null;
  words: IWord[] | null
}

const state: IState = {
  group: null,
  page: null,
  words: null,
};

export { state };
