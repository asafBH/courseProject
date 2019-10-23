import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
let UserLogService = class UserLogService {
    constructor(http) {
        this.http = http;
        this.isAuthenticated = false;
        this.users$ = new BehaviorSubject({ Users: [] });
        this.http.get('/assets/users.json').toPromise().then((res) => {
            // Success
            this.users$.next(res);
        });
    }
    logIn(user, password) {
        return this.users$.pipe(map((userObj => {
            if (userObj.Users.filter(u => u.name === user && u.password === password).length > 0) {
                this.isAuthenticated = true;
                this.userLoggedIn = user;
                return user;
            }
            throwError('User Not Found');
        })));
    }
    logOut() {
        this.isAuthenticated = false;
        this.userLoggedIn = '';
    }
};
UserLogService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], UserLogService);
export { UserLogService };
//# sourceMappingURL=user-log.service.js.map