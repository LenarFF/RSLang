interface IState {
  group: number | null;
  page: number | null;
}

const state: IState = {
  group: null,
  page: null,
};

export { state };
