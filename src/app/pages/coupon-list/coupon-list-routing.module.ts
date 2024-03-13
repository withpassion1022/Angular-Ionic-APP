import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponList } from './coupon-list.page';

const routes: Routes = [
  {
    path: '',
    component: CouponList
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponListRoutingModule {}
