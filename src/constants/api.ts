const baseURL = 'https://react-learnwords-example.herokuapp.com';

const words = `${baseURL}/words`;
const user = `${baseURL}/users`;
const DIFFICULT_FILTER = '%7B%22%24and%22%3A%5B%7B%22userWord.difficulty%22%3A%22hard%22%7D%5D%7D';
const MAX_PAGES = 30;
const MAX_GROUP = 6;
const USER_DATA = 'RSLangMK-user-data';
const WORDS_ON_PAGE = 20;

export { baseURL, words, user, DIFFICULT_FILTER, MAX_PAGES, MAX_GROUP, WORDS_ON_PAGE, USER_DATA };
