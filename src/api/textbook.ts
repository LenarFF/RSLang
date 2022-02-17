import { DIFFICULT_FILTER, user, USER_DATA, words } from '../constants/api';
import { IStorageData, IWord } from '../types/interface';

const getStorageData = (): IStorageData | void => {
  const storageData = localStorage.getItem(USER_DATA);
  if (storageData) return { ...JSON.parse(storageData) };
};

const getWords = async (group = 0, page = 0): Promise<IWord[]> => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  return response.json();
};

const getAggregatedWords = async (filter: string): Promise<void | IWord[]> => {
  const storageData = getStorageData();
  if (storageData) {
    const response = await fetch(`${user}/${storageData.userId}/aggregatedWords?filter=${filter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
    const data = await response.json();
    return data[0].paginatedResults;
  }
};

const setDifficult = (wordID: string, difficulty: string): void => {
  const storageData = getStorageData();
  if (storageData) {
    fetch(`${user}/${storageData.userId}/words/${wordID}`, {
      method: 'POST',
      body: JSON.stringify({ difficulty }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
  } else {
    throw new Error('no token');
  }
};

const updateDifficult = (wordID: string, difficulty: string): void => {
  const storageData = getStorageData();
  if (storageData) {
    fetch(`${user}/${storageData.userId}/words/${wordID}`, {
      method: 'PUT',
      body: JSON.stringify({ difficulty }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
  } else {
    throw new Error('no token');
  }
};

export { getWords, setDifficult, getAggregatedWords, updateDifficult };
