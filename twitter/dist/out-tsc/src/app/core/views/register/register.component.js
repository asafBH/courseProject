import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let RegisterComponent = class RegisterComponent {
    constructor(router, userState) {
        this.router = router;
        this.userState = userState;
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
        });
        this.error = '';
    }
    ngOnInit() {
    }
    submit() {
        // this.userLogService.logIn(this.form.value.username, this.form.value.password).subscribe(user => {
        //   this.router.navigate(['home']);
        // },
        //   err => { this.error = err });
        // return false;
        this.userState.register(this.form.value).subscribe(() => this.router.navigate(['home']));
    }
};
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map