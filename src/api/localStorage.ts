import { USER_DATA } from "../constants/api";
import { IStorageData } from "../types/interface";

const getStorageData = (): IStorageData | void => {
  const storageData = localStorage.getItem(USER_DATA);
  if (storageData) return { ...JSON.parse(storageData) };
};

export { getStorageData };