type HttpPayload<T> = {
  payload?: T | {};
  status: number;
  unwrap: () => T | {};
};

export default HttpPayload;
