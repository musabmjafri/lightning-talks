import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { apiDeserializer } from '../../utility/jsonApiParser';
import { IRequestOptions } from '../../interfaces/http-client';

@Injectable({
  providedIn: 'root',
})
export class CogsHttpClient {

  private api = environment.cogsApiUrl;

  public constructor(
    private http: HttpClient,
  ) {}

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(`${this.api}/${endPoint}`, options).pipe(
      mergeMap((response) => from(apiDeserializer(response))),
    );
  }

  public post<T>(endPoint: string, body: Object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(`${this.api}/${endPoint}`, body, options).pipe(
      mergeMap((response) => from(apiDeserializer(response))),
    );
  }

  public put<T>(endPoint: string, body: Object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(`${this.api}/${endPoint}`, body, options).pipe(
      mergeMap((response) => from(apiDeserializer(response))),
    );
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(`${this.api}/${endPoint}`, options).pipe(
      mergeMap((response) => from(apiDeserializer(response))),
    );
  }
}

export function cogsHttpClientCreator(http: HttpClient) {
  return new CogsHttpClient(http);
}
