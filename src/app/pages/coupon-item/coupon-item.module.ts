import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponItemPageRoutingModule } from './coupon-item-routing.module';

import { CouponItemPage } from './coupon-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponItemPageRoutingModule
  ],
  declarations: [CouponItemPage]
})
export class CouponItemPageModule {}
