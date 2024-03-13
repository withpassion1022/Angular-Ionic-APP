import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointRegisterPageRoutingModule } from './point-register-routing.module';

import { PointRegisterPage } from './point-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointRegisterPageRoutingModule
  ],
  declarations: [PointRegisterPage]
})
export class PointRegisterPageModule {}
