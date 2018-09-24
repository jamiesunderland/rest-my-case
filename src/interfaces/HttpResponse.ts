export default interface HttpResponse {
  json():  Promise<any>;
  status?: number;
  statusText?: string;
  ok?: boolean;
  bodyUsed?: boolean
}
