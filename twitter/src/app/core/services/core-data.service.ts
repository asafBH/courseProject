import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreDataService {

  constructor(private http: HttpClient) { }

  //tweet calls
  getAllTweets(): Observable<any> {
    return this.http.get<any>('/api/tweets').pipe(
      map(({ tweets }) => tweets),
      catchError(this.handleError('getAllTweets'))
    );
  }
  postTweet(message: string): Observable<any> {
    return this.http.post<any>('/api/tweets', {message: message}).pipe(
      // map(({ tweets }) => tweets),
      catchError(this.handleError('postTweet'))
    );
  }
  deleteTweet(id: string): Observable<any> {
    return this.http.delete<any>(`/api/tweets/${id}`).pipe(
      map(({ tweets }) => tweets),
      catchError(this.handleError('deleteTweet'))
    );
  }

  starToggle(tweetId: string) {
    return this.http.post(`/api/tweets/${tweetId}/star-toggle`, {}).pipe(
      catchError(this.handleError('starToggle'))
    );
  }

  replyTweet(message: string, tweetId: string) {
    return this.http.post(`/api/tweets/${tweetId}/reply`, {message}).pipe(
      catchError(this.handleError('replyTweet'))
    );
  }

  getTweet(tweetId) {
    return this.http.get(`/api/tweets/${tweetId}`).pipe(
      catchError(this.handleError('getTweet'))
    );
  }
  
  // tweetStar(): Observable<any> {
  //   return this.http.post<any>('/api/tweets/:id/star-toggle').pipe(
  //     map(({ tweets }) => tweets),
  //     catchError(this.handleError('tweetStar'))
  //   );
  // }

  //login loguot and register calls

  registerUser(registrationDetails: {email: string, user: string, password: string}): Observable<any> {
    return this.http.post('/api/auth/register', registrationDetails).pipe(
      catchError(this.handleError('registerUser'))
    );
  }

  login(loginDetails: {email: string, password: string}): Observable<any> {
    return this.http.post('api/auth/login', loginDetails).pipe(
      catchError(this.handleError('login'))
    )
  }

  logout(): Observable<any> {
    return this.http.get('api/auth/logout').pipe(
      catchError(this.handleError('logout'))
    )
  }

  //Members calls
  getMemberTweets(id: string): Observable<any> {
    return this.http.get<any>(`/api/members/${id}/tweets`).pipe(
      map(({ tweets }) => tweets),
      catchError(this.handleError('getMemberTweets'))
    );
  }
  getMember(id: string): Observable<any> {
    return this.http.get<any>(`/api/members/${id}`).pipe(
      catchError(this.handleError('getMember'))
    );
  }



  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
