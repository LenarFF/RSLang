import { user, USER_DATA } from '../constants/api';
import { Difficulty } from '../constants/textbook';
import { setEasyDifficulty, setNormalDifficulty } from '../helpers/wordsData';
import { IOptional, IWord } from '../types/interface';
import { getStorageData } from './localStorage';
import { setDifficult } from './textbook';

const setUserAnswer = async (wordID: string, correctness: boolean): Promise<IWord | void> => {
  const storageData = getStorageData(USER_DATA);
  try {
    if (storageData) {
      const response = await fetch(`${user}/${storageData.userId}/words/${wordID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storageData.token}`,
        },
      });
      if (response.status === 404) {
        postNewWord(wordID, correctness);
      } else if (response.status === 200) {
        const word = await response.json();

        if (word.optional !== undefined) {
          if (correctness) {
            const wordDifficult = setEasyDifficulty(word.difficulty, word.optional.series, wordID);
            updateGameWord(wordID, wordDifficult, {
              ...word.optional,
              right: +word.optional.right + 1,
              series: +word.optional.series + 1,
            });
          } else {
            const wordDifficult = setNormalDifficulty(word.difficulty, wordID);
            updateGameWord(wordID, wordDifficult, {
              ...word.optional,
              wrong: +word.optional.wrong + 1,
              series: 0,
            });
          }
        } else {
          updateGameWord(wordID, word.difficulty, {
            right: correctness ? 1 : 0,
            wrong: correctness ? 0 : 1,
            series: correctness ? 1 : 0,
          });
        }
      }
    }
  } catch (e) {
    console.log('error', e);
  }
};

const postNewWord = async (wordID: string, correctness: boolean): Promise<void> => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    fetch(`${user}/${storageData.userId}/words/${wordID}`, {
      method: 'POST',
      body: JSON.stringify({
        difficulty: Difficulty.normal,
        optional: {
          right: correctness ? 1 : 0,
          wrong: correctness ? 0 : 1,
          series: correctness ? 1 : 0,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
  }
};

const updateGameWord = async (
  wordID: string,
  difficulty: Difficulty,
  optional: {},
): Promise<void> => {
  const storageData = getStorageData(USER_DATA);

  if (storageData) {
    const response = await fetch(`${user}/${storageData.userId}/words/${wordID}`, {
      method: 'PUT',
      body: JSON.stringify({
        difficulty,
        optional,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
    return response.json();
  }
};

export { setUserAnswer, postNewWord, updateGameWord };
