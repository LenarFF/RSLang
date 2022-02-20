import {
  Filter, user, USER_DATA, USER_WORDS, words,
} from '../constants/api';
import { Difficulty } from '../constants/textbook';
import { IStorageData, IWord } from '../types/interface';
import { getStorageData, getStorageWords, updateStorageDifficult } from './localStorage';

const getWords = async (group = '0', page = '0'): Promise<IWord[]> => {
  const response = await fetch(
    `${words}?${new URLSearchParams({
      group,
      page,
    })}`,
  );
  return response.json();
};

const getAggregatedWords = async (filter: string, group = '', page = ''): Promise<[] | IWord[]> => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    const response = await fetch(
      `${user}/${storageData.userId}/aggregatedWords?${new URLSearchParams({
        group,
        page,
        wordsPerPage: '4000',
        filter,
      })}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storageData.token}`,
        },
      },
    );
    const data = await response.json();
    return data[0].paginatedResults;
  }
  return [];
};

const setDifficult = async (wordID: string, difficulty: Difficulty): Promise<void> => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    const response = await fetch(`${user}/${storageData.userId}/words/${wordID}`, {
      method: 'POST',
      body: JSON.stringify({ difficulty }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
    if (response.status === 417) updateDifficult(wordID, difficulty);
    // updateStorageDifficult(wordID, difficulty);
  } else {
    throw new Error('no token');
  }
};

const updateDifficult = (wordID: string, difficulty: Difficulty): void => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    fetch(`${user}/${storageData.userId}/words/${wordID}`, {
      method: 'PUT',
      body: JSON.stringify({ difficulty }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
    updateStorageDifficult(wordID, difficulty);
  } else {
    throw new Error('no token');
  }
};

export {
  getWords, setDifficult, getAggregatedWords, updateDifficult,
};
