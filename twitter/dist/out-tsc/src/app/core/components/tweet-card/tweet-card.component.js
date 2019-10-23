import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let TweetCardComponent = class TweetCardComponent {
    constructor(coreData) {
        this.coreData = coreData;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input()
], TweetCardComponent.prototype, "tweetDetails", void 0);
tslib_1.__decorate([
    Input()
], TweetCardComponent.prototype, "loggedin", void 0);
TweetCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tweet-card',
        templateUrl: './tweet-card.component.html',
        styleUrls: ['./tweet-card.component.scss']
    })
], TweetCardComponent);
export { TweetCardComponent };
//# sourceMappingURL=tweet-card.component.js.map