import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { InterceptorServiceService } from './services/interceptor-service.service';
import { UserStateService } from './core/services/user-state.service';
import { DialogComponent } from './core/views/dialog/dialog.component';
import { ReplyDialogComponent } from './core/views/reply-dialog/reply-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,

    
  ],
  providers: [
    UserStateService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, ReplyDialogComponent]
})
export class AppModule { }
