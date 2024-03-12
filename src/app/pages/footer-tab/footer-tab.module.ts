import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterTabPageRoutingModule } from './footer-tab-routing.module';

import { FooterTabPage } from './footer-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterTabPageRoutingModule
  ],
  exports: [FooterTabPage],
  declarations: [FooterTabPage]
})
export class FooterTabPageModule {}
