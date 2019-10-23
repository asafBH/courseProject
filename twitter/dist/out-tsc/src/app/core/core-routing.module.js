import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfilesComponent } from './views/profiles/profiles.component';
import { HomeComponent } from './views/home/home.component';
import { TweetComponent } from './views/tweet/tweet.component';
const routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile/:user',
        component: ProfilesComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'tweet/:id',
        component: TweetComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
let CoreRoutingModule = class CoreRoutingModule {
};
CoreRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CoreRoutingModule);
export { CoreRoutingModule };
//# sourceMappingURL=core-routing.module.js.map