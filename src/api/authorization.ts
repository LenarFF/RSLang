import { IValue } from '../types/interface';
import { baseURL } from '../constants/api';

const createUser = async (user: IValue): Promise<void | string> => {
  try {
    const rawResponse = await fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse;
    if (content.status === 417) {
      return 'пользователь уже существует';
    }
    return await content.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginUser = async (user: IValue): Promise<JSON | string> => {
  try {
    const rawResponse = await fetch(`${baseURL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const content = await rawResponse;
    if (content.status === 403) {
      return 'неправильный пользователь или пароль';
    }
    if (content.status === 404) {
      return 'пожалуйста зарегистрируйтесь';
    }
    return await content.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export { createUser, loginUser };
