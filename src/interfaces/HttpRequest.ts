import HttpPayload from './HttpPayload';
import HttpErrorMessage from './HttpErrorMessage';

type HttpRequest<T> = Promise<HttpPayload<T>>;
export default HttpRequest;
