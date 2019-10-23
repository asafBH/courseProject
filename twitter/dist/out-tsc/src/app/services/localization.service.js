import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let LocalizationService = class LocalizationService {
    constructor(http) {
        this.http = http;
        this.currentLang = 'en';
        this.availableLang = ['en', 'es', 'fr'];
        this.menuItem$ = new BehaviorSubject({});
        this.http.get('/assets/localization.json').toPromise().then((res) => {
            // Success
            this.menuItem$.next(res);
        });
    }
    changeLang(event) {
        this.currentLang = event.value;
    }
};
LocalizationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LocalizationService);
export { LocalizationService };
//# sourceMappingURL=localization.service.js.map