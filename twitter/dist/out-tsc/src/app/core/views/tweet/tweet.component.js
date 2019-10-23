import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let TweetComponent = class TweetComponent {
    // public textControl = new FormControl('');
    // public descriptionLength = new BehaviorSubject(0); 
    constructor() {
        // this.textControl.valueChanges.subscribe((v)=> this.descriptionLength.next(v.length));
    }
    ngOnInit() {
    }
};
TweetComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tweet',
        templateUrl: './tweet.component.html',
        styleUrls: ['./tweet.component.scss']
    })
], TweetComponent);
export { TweetComponent };
//# sourceMappingURL=tweet.component.js.map