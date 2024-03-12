import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponListRoutingModule } from './coupon-list-routing.module';

import { CouponList } from './coupon-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponListRoutingModule
  ],
  declarations: [CouponList]
})
export class CouponListPageModule {}
