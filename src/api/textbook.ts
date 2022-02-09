
import { words } from '../constants/api';
import { IWord } from '../types/interface';

const getWords = async (group = '0', page = '0'): Promise<IWord[]> => {
  const response = await fetch(`${words}?_group=${group}&_page=${page}`);
  return await response.json();
};
export { getWords };
