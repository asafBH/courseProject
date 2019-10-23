import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProfilesComponent = class ProfilesComponent {
    constructor(state, userState) {
        this.state = state;
        this.userState = userState;
    }
    ngOnInit() {
    }
    getTweetsByMember() {
        this.state.getTweetsById(this.userState.state.id);
        console.log(this.state.state$);
    }
};
ProfilesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profiles',
        templateUrl: './profiles.component.html',
        styleUrls: ['./profiles.component.scss']
    })
], ProfilesComponent);
export { ProfilesComponent };
//# sourceMappingURL=profiles.component.js.map