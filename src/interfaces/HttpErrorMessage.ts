import HttpPayload from './HttpPayload';

export default interface HttpErrorMessage<T> extends HttpPayload<T> {
  message: string;
}
