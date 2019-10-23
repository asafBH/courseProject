import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(router, userState) {
        this.router = router;
        this.userState = userState;
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
        this.error = '';
    }
    ngOnInit() {
    }
    submit() {
        this.userState.login(this.form.value).subscribe(() => this.router.navigate(['home']));
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map