import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserStateService } from './core/services/user-state.service';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            SharedModule,
            CoreModule,
            AppRoutingModule,
        ],
        providers: [
            // { provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true },
            UserStateService
        ],
        // providers:[UserStateService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map