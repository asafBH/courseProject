import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let InterceptorServiceService = class InterceptorServiceService {
    constructor() { }
    handleError(error) {
        console.log('error occured!');
        return throwError(error);
    }
    intercept(res, next) {
        console.log(res);
        return next.handle(res).pipe(catchError(this.handleError));
    }
};
InterceptorServiceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], InterceptorServiceService);
export { InterceptorServiceService };
//# sourceMappingURL=interceptor-service.service.js.map