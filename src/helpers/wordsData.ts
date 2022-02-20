import { Difficulty } from '../constants/textbook';
import { Statistics } from '../core/statistics';

const setEasyDifficulty = (difficulty: Difficulty, series: number, wordID: string): Difficulty => {
  if (
    (series > 1 && difficulty === Difficulty.normal)
    || (series > 3 && difficulty === Difficulty.hard)
  ) {
    Statistics.addLearned();
    return Difficulty.easy;
  }
  return difficulty;
};

const setNormalDifficulty = (difficulty: Difficulty, wordID: string): Difficulty => {
  if (difficulty === Difficulty.easy) {
    Statistics.removeLearned();
    return Difficulty.normal;
  }
  return difficulty;
};

export { setEasyDifficulty, setNormalDifficulty };
