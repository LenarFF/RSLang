import { user, USER_DATA } from '../constants/api';
import { Statistics } from '../core/statistics';
import { IStat } from '../types/statistics';
import { getStorageData } from './localStorage';

const getStatistics = async (): Promise<IStat | void> => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    const response = await fetch(`${user}/${storageData.userId}/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
    if (response.status === 404) setStatistic(Statistics.data);

    if (response.status === 200) return response.json();
  }
};

const setStatistic = async (statistics: IStat) => {
  const storageData = getStorageData(USER_DATA);
  if (storageData) {
    const response = await fetch(`${user}/${storageData.userId}/statistics`, {
      method: 'PUT',
      body: JSON.stringify(statistics),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storageData.token}`,
      },
    });
  }
};

export { getStatistics, setStatistic };
