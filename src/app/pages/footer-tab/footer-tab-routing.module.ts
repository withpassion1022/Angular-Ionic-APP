import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterTabPage } from './footer-tab.page';

const routes: Routes = [
  {
    path: '',
    component: FooterTabPage,
    children: [
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then((m) => m.NewsPageModule),
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: 'card',
        loadChildren: () => import('../card/card.module').then((m) => m.CardPageModule),
      },
      {
        path: 'coupons',
        loadChildren: () => import('../coupon-list/coupon-list.module').then((m) => m.CouponListPageModule),
      },
      {
        path: 'coupon',
        loadChildren: () => import('../coupon-item/coupon-item.module').then((m) => m.CouponItemPageModule),
      },
      {
        path: 'coupon/barcode',
        loadChildren: () => import('../barcode/barcode.module').then((m) => m.BarcodePageModule),
      },
      {
        path: 'shop',
        loadChildren: () => import('../shop/shop.module').then((m) => m.ShopPageModule),
      },
      {
        path: 'others',
        loadChildren: () => import('../others/others.module').then((m) => m.OthersPageModule),
      },
      {
        path: 'reservation',
        loadChildren: () => import('../reservation/reservation.module').then((m) => m.ReservationPageModule),
      },
      {
        path: 'question',
        loadChildren: () => import('../question/question.module').then((m) => m.QuestionPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterTabPageRoutingModule {}
