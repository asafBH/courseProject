import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store } from './store';
import { tap } from 'rxjs/operators';
let UserStateService = class UserStateService extends Store {
    constructor(data) {
        super(null);
        this.data = data;
        console.log("init");
    }
    register(registrationDetails) {
        return this.data.registerUser(registrationDetails).pipe(tap(res => this.setState(res.userDetails)));
    }
    login(loginDetails) {
        return this.data.login(loginDetails).pipe(tap(res => this.setState(res.userDetails)));
    }
};
UserStateService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], UserStateService);
export { UserStateService };
//# sourceMappingURL=user-state.service.js.map