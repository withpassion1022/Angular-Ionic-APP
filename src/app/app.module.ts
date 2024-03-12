import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Platform } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { PreventMultipleTapsDirective } from './directives/prevent-multiple-taps.directive';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component'
import { PeriodModalComponent } from './components/period-modal/period-modal.component'
@NgModule({
    declarations: [AppComponent, PreventMultipleTapsDirective, ModalComponent, ConfirmModalComponent, PeriodModalComponent],
    exports: [PreventMultipleTapsDirective],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        Platform,
        EmailComposer,
        CallNumber,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
