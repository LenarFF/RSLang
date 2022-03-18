export const loginInputs = [
  {
    span: 'Aдрес почты',
    type: 'email',
    name: 'email',
    placeholder: 'введите адрес почты',
    path: `M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 
      80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 
      480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 
      83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 
      31 0 01432 480z`,
  },
  {
    span: 'Пароль',
    type: 'password',
    name: 'password',
    placeholder: 'введите пароль',
    path: `M368 192h-16v-80a96 96 0 10-192 0v80h-16a64.07 64.07 0 00-64 64v176a64.07 64.07 0 0064 64h224a64.07 
      64.07 0 0064-64V256a64.07 64.07 0 00-64-64zm-48 0H192v-80a64 64 0 11128 0z`,
  },
];

export const SubmitInputs = [
  {
    value: 'вход',
  },
  {
    value: 'регистрация',
  },
  {
    value: 'выход',
  },
];

export const enum InputErrors {
  empty = 'не заполнено поле',
  minLength = 'минимальная длина пароля 8 символов',
  loginSuccess = 'регистрация успешна',
  login = 'регистрация',
  signOut = 'необходимо сперва разлогиниться',
  mailNotValid = 'пожалуйста, введите корректный адрес',
}
