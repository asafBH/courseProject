import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
let CoreDataService = class CoreDataService {
    constructor(http) {
        this.http = http;
    }
    //tweet calls
    getAllTweets() {
        return this.http.get('/api/tweets').pipe(map(({ tweets }) => tweets), catchError(this.handleError('getAllTweets')));
    }
    postTweet(message) {
        return this.http.post('/api/tweets', message).pipe(
        // map(({ tweets }) => tweets),
        catchError(this.handleError('postTweet')));
    }
    deleteTweet(id) {
        return this.http.delete('/api/tweets/:id').pipe(
        //map(({ tweets }) => tweets),
        catchError(this.handleError('deleteTweet')));
    }
    // tweetStar(): Observable<any> {
    //   return this.http.post<any>('/api/tweets/:id/star-toggle').pipe(
    //     map(({ tweets }) => tweets),
    //     catchError(this.handleError('tweetStar'))
    //   );
    // }
    //login loguot and register calls
    registerUser(registrationDetails) {
        return this.http.post('/api/auth/register', registrationDetails).pipe(catchError(this.handleError('registerUser')));
    }
    login(loginDetails) {
        return this.http.post('api/auth/login', loginDetails).pipe(catchError(this.handleError('login')));
    }
    // logout(logoutDetails: {email: string, password: string}): Observable<any> {
    //   return this.http.post('api/auth/logout', logoutDetails).pipe(
    //     catchError(this.handleError('login'))
    //   )
    // }
    //Members calls
    getMemberTweets(MemberDetails) {
        return this.http.get('/api/members/:' + MemberDetails.id + '/tweets').pipe(map(({ tweets }) => tweets), catchError(this.handleError('getMemberTweets')));
    }
    getMember() {
        return this.http.get('/api/members/:id').pipe(map(({ tweets }) => tweets), catchError(this.handleError('getMember')));
    }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
};
CoreDataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CoreDataService);
export { CoreDataService };
//# sourceMappingURL=core-data.service.js.map