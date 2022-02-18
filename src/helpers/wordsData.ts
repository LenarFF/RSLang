import { Difficulty } from "../constants/textbook";

const setEasyDifficulty = (difficulty: Difficulty, series: number): Difficulty => {
  if (
    (series > 1 && difficulty === Difficulty.normal) ||
    (series > 3 && difficulty === Difficulty.hard)
  ) {
    return Difficulty.easy;
  }
  return difficulty;
};

const setNormalDifficulty = (difficulty: Difficulty): Difficulty => {
  if(difficulty === Difficulty.easy) return Difficulty.normal
  return difficulty
}

export { setEasyDifficulty, setNormalDifficulty };