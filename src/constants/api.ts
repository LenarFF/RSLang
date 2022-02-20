const baseURL = 'https://react-learnwords-example.herokuapp.com';

const words = `${baseURL}/words`;
const user = `${baseURL}/users`;
const MAX_PAGES = 30;
const MAX_GROUP = 6;
const USER_DATA = 'RSLangMK-user-data';
const WORDS_ON_PAGE = 20;
const USER_WORDS = 'RSLangMK-user-words';
const USER_STATISTICS = 'RSLangMK-user-statistics';

const Filter = {
  difficult: JSON.stringify({ $and: [{ 'userWord.difficulty': 'hard' }] }),
  easy: JSON.stringify({ $and: [{ 'userWord.difficulty': 'easy' }] }),
  all: JSON.stringify({
    $or: [{ 'userWord.difficulty': 'hard' }, { 'userWord.difficulty': 'easy' }],
  }),
};

export {
  baseURL,
  words,
  user,
  Filter,
  MAX_PAGES,
  MAX_GROUP,
  WORDS_ON_PAGE,
  USER_DATA,
  USER_WORDS,
  USER_STATISTICS,
};
