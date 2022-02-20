import { user, USER_DATA } from '../constants/api';
import { IStat } from '../types/statistics';
import { getStorageData } from './localStorage';

const setStatistic = (statistics: IStat): void => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    fetch(`${user}/${storageData.userId}/statistics`, {
      method: 'PUT',
      body: JSON.stringify(statistics),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
  }
};

const getStatistics = async (statisticData: IStat): Promise<IStat | void> => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    const response = await fetch(`${user}/${storageData.userId}/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
    if (response.status === 404) setStatistic(statisticData);

    if (response.status === 200) return response.json();
  }
  return undefined;
};

export { getStatistics, setStatistic };
