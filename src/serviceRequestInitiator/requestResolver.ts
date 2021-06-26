import * as nodeFetch from 'node-fetch';

export abstract class RequestResolver<T> {
  protected serviceJsonResolver(
    uri: string,
    method: string,
    contentType?: string,
    data?: T,
  ) {
    return nodeFetch(uri, {
      method: method,
      body: data,
      headers: { 'Content-Type': contentType },
    });
  }
  protected serviceFormDataResolver(uri: string, method: string, data?: any) {
    return nodeFetch(uri, {
      method: method,
      body: data,
    });
  }
}
