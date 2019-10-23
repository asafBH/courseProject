import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './views/login/login.component';
import { ProfilesComponent } from './views/profiles/profiles.component';
import { TweetComponent } from './views/tweet/tweet.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDataService } from './services/core-data.service';
import { TweetsStateService } from './services/tweets-state.service';
import { UserStateService } from './services/user-state.service';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
let CoreModule = class CoreModule {
};
CoreModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LoginComponent,
            ProfilesComponent,
            TweetComponent,
            RegisterComponent,
            HomeComponent,
            TweetCardComponent,
        ],
        imports: [
            CommonModule,
            CoreRoutingModule,
            SharedModule,
            ReactiveFormsModule
        ],
        providers: [
            CoreDataService,
            TweetsStateService,
            UserStateService
        ]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map