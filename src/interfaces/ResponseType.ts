import HttpPayload from './HttpPayload';

type ResponseType<T> = Promise<HttpPayload<T>|T|{}>; 
export default ResponseType;
