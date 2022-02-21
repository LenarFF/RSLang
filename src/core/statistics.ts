import { getStorageStat } from '../api/localStorage';
import { getStatistics, setStatistic } from '../api/statistics';
import { getAggregatedWords } from '../api/textbook';
import { Filter, USER_STATISTICS } from '../constants/api';
import { IWord } from '../types/interface';
import { IStat } from '../types/statistics';

class Statistics {
  static data: IStat;

  static userWords: [] | IWord[] = [];

  static date = new Date().toISOString().slice(0, 10);

  static defaultStat = {
    games: {
      sprint: {
        newWord: 0,
        answers: 0,
        right: 0,
        series: 0,
        maxSeries: 0,
      },
      audio: {
        newWord: 0,
        answers: 0,
        right: 0,
        series: 0,
        maxSeries: 0,
      },
    },
    learnedWords: 0,
  };

  constructor() {
    Statistics.data = {
      learnedWords: 0,
      optional: {
        [Statistics.date]: Statistics.defaultStat,
      },
    };
    const stat = getStorageStat(USER_STATISTICS);
    if (stat) Statistics.data = stat;
  }

  setStat = async (): Promise<void> => {
    const statResp = await getStatistics(Statistics.data);    
    Statistics.userWords = await getAggregatedWords(Filter.all);
    if (statResp) {
      const stat = { learnedWords: statResp.learnedWords, optional: statResp.optional };
      Statistics.data = stat;
      localStorage.setItem(USER_STATISTICS, JSON.stringify(stat));
    }
  };

  static addLearned(): void {
    if (Statistics.data.optional[Statistics.date]) {
      Statistics.data.optional[Statistics.date].learnedWords++;
      setStatistic(Statistics.data);
    } else {
      Statistics.addTodaysStat();
      Statistics.addLearned();
    }
  }

  static removeLearned(): void {
    if (Statistics.data.optional[Statistics.date].learnedWords > 0) {
      Statistics.data.optional[Statistics.date].learnedWords--;
      setStatistic(Statistics.data);
    }
  }

  static addTodaysStat = (): void => {
    Statistics.data.optional[Statistics.date] = Statistics.defaultStat;
  };

  static addNewWord = (wordID: string, game: string): void => {
    const userWordData = Statistics.userWords.filter((userWord) => userWord._id === wordID)[0];
    if (!userWordData || !userWordData.userWord || !userWordData.userWord.optional) {
      Statistics.data.optional[Statistics.date].games[game].newWord++;
      setStatistic(Statistics.data);
    }
  };

  static handleAnswer = (wordID: string, game: string, correctness: boolean): void => {
    if (Statistics.data.optional[Statistics.date]) {
      Statistics.data.optional[Statistics.date].games[game].answers++;
      if (correctness) {
        Statistics.data.optional[Statistics.date].games[game].right++;
        Statistics.data.optional[Statistics.date].games[game].series++;
        Statistics.data.optional[Statistics.date].games[game].maxSeries = Math.max(
          Statistics.data.optional[Statistics.date].games[game].series,
          Statistics.data.optional[Statistics.date].games[game].maxSeries,
        );
        localStorage.setItem(USER_STATISTICS, JSON.stringify(Statistics.data));
      } else {
        Statistics.data.optional[Statistics.date].games[game].series = 0;
      }
      Statistics.addNewWord(wordID, game);
    } else {
      Statistics.addTodaysStat();
      Statistics.handleAnswer(wordID, game, correctness);
    }
  };
}

export { Statistics };
