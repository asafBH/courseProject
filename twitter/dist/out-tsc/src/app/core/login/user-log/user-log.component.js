import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let UserLogComponent = class UserLogComponent {
    constructor(userLogService, router) {
        this.userLogService = userLogService;
        this.router = router;
        this.form = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
        this.error = '';
    }
    ngOnInit() {
    }
    submit() {
        this.userLogService.logIn(this.form.value.username, this.form.value.password).subscribe(user => {
            this.router.navigate(['home']);
        }, err => { this.error = err; });
        return false;
    }
};
UserLogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-log',
        templateUrl: './user-log.component.html',
        styleUrls: ['./user-log.component.scss']
    })
], UserLogComponent);
export { UserLogComponent };
//# sourceMappingURL=user-log.component.js.map