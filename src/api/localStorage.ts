import { USER_WORDS } from '../constants/api';
import { Difficulty } from '../constants/textbook';
import { IStorageData, IWord } from '../types/interface';
import { IStat } from '../types/statistics';

const getStorageData = (key: string): IStorageData | void => {
  const storageData = localStorage.getItem(key);
  if (storageData) return { ...JSON.parse(storageData) };
  return undefined;
};

const getStorageStat = (key: string): IStat | void => {
  const storageData = localStorage.getItem(key);
  if (storageData) return { ...JSON.parse(storageData) };
  return undefined;
};

const getStorageWords = (): IWord[] | void => {
  const storageStat = localStorage.getItem(USER_WORDS);
  if (storageStat) return JSON.parse(storageStat);
  return undefined;
};

const updateStorageDifficult = (wordID: string, difficult: Difficulty): void => {
  const userWords = getStorageWords();
  if (userWords) {
    const userWord = userWords.filter((word) => word._id === wordID)[0];
    if (userWord.userWord) {
      userWord.userWord.difficulty = difficult;
      localStorage.setItem(USER_WORDS, JSON.stringify(userWords));
    }
  }
};

export {
  getStorageData, getStorageWords, updateStorageDifficult, getStorageStat,
};
