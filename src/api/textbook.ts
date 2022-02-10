import { user, words } from '../constants/api';
import { IWord } from '../types/interface';

const getWords = async (group = 0, page = 0): Promise<IWord[]> => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  return response.json();
};

const setDifficult = (userID: string, wordID: string, difficulty: string): void => {
  fetch(`${user}/${userID}/words/${wordID}`, {
    method: 'POST',
    body: difficulty,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getWords, setDifficult };
