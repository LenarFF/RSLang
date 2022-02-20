import { USER_DATA, USER_STATISTICS, USER_WORDS } from '../constants/api';
import { Difficulty } from '../constants/textbook';
import { IStorageData, IWord } from '../types/interface';
import { IStat } from '../types/statistics';

const getStorageData = (key: string): IStorageData | void=> {
  const storageData = localStorage.getItem(key);
  if (storageData) return { ...JSON.parse(storageData) };
};

const getStorageStat = (key: string): IStat| void => {
  const storageData = localStorage.getItem(key);
  if (storageData) return { ...JSON.parse(storageData) };
};

const getStorageWords = (): IWord[] | void => {
  const storageStat = localStorage.getItem(USER_WORDS);
  if (storageStat) return JSON.parse(storageStat);
};

const updateStorageDifficult = (wordID: string, difficult: Difficulty) => {
  const userWords = getStorageWords();
  if (userWords) {
    console.log(userWords, wordID);
    const userWord = userWords.filter((word) => word._id === wordID)[0];
    console.log(userWord);
    if (userWord.userWord) {
      userWord.userWord.difficulty = difficult;
      localStorage.setItem(USER_WORDS, JSON.stringify(userWords));
    } else {
    }
  }
};

export { getStorageData, getStorageWords, updateStorageDifficult, getStorageStat };
