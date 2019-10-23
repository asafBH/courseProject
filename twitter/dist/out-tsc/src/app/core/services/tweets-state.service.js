import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Store } from './store';
let TweetsStateService = class TweetsStateService extends Store {
    constructor(data) {
        super([]);
        this.data = data;
    }
    getAllTweets() {
        this.data.getAllTweets().subscribe(tweets => {
            this.setState(tweets);
        });
    }
    postTweet(message) {
        this.data.postTweet(message).subscribe(tweet => {
            this.setState([...this.state, tweet]);
        });
    }
    deleteTweet(id) {
        console.log(id);
        this.data.deleteTweet(id);
        const idx = this.state.findIndex(t => t._id === id);
        this.state.splice(idx, 1);
        this.setState(this.state);
    }
    getTweetsById(id) {
        this.data.getMemberTweets({ id });
    }
};
TweetsStateService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], TweetsStateService);
export { TweetsStateService };
//# sourceMappingURL=tweets-state.service.js.map