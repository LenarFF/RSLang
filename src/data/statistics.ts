interface IGameStat {
  learnedWords: number;
  rightAnswers: number;
  series: number | null;
}

interface IDate {
  [key: string]: IGameStat;
}

interface IStat {
  [key: string]: IDate;
}

const statistics: IStat = {
  '14.02.2022': {
    Спринт: {
      learnedWords: 20,
      rightAnswers: 17,
      series: 5,
    },
    Аудиовызов: {
      learnedWords: 15,
      rightAnswers: 12,
      series: 3,
    },
  },
  '15.02.2022': {
    Спринт: {
      learnedWords: 8,
      rightAnswers: 2,
      series: 1,
    },
    Аудиовызов  : {
      learnedWords: 23,
      rightAnswers: 12,
      series: 2,
    },
  },
};

export { statistics, IGameStat, IDate };
