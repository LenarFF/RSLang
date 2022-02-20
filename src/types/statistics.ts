interface IGameStat {
  newWord: number;
  answers: number;
  right: number;
  series: number;
  maxSeries: number;
}

enum Games {
  sprint = 'sprint',
  audio = 'audio',
}

interface IGeneralStat {
  games: {
    [game: string]: IGameStat;
  };
  learnedWords: number;
}

interface IStat {
  learnedWords: number;
  optional: {
    [date: string]: IGeneralStat;
  };
}

interface IDate {
  [key: string]: IGameStat;
}

export {
  IGameStat, IDate, IGeneralStat, IStat, Games,
};
