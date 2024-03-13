import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'account-check',
    pathMatch: 'full',
  },
  {
    path: 'kiyaku',
    loadChildren: () => import('./pages/kiyaku/kiyaku.module').then((m) => m.KiyakuPageModule),
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then((m) => m.InfoPageModule),
  },
  {
    path: 'point-register',
    loadChildren: () => import('./pages/point-register/point-register.module').then((m) => m.PointRegisterPageModule),
  },
  // {
  //   path: 'news',
  //   loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  // },
  // {
  //   path: 'card',
  //   loadChildren: () => import('./pages/card/card.module').then( m => m.CardPageModule)
  // },
  // {
  //   path: 'shop',
  //   loadChildren: () => import('./pages/shop/shop.module').then( m => m.ShopPageModule)
  // },
  // {
  //   path: 'menu',
  //   loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  // },
  // {
  //   path: 'others',
  //   loadChildren: () => import('./pages/others/others.module').then( m => m.OthersPageModule)
  // },
  {
    path: 'footer-tab',
    loadChildren: () => import('./pages/footer-tab/footer-tab.module').then((m) => m.FooterTabPageModule),
  },
  {
    path: 'account-check',
    loadChildren: () => import('./pages/account-check/account-check.module').then((m) => m.AccountCheckPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'member-info',
    loadChildren: () => import('./pages/member-info/member-info.module').then((m) => m.MemberInfoPageModule),
  },
  {
    path: 'push-modal',
    loadChildren: () => import('./pages/push-modal/push-modal.module').then((m) => m.PushModalPageModule),
  },
  {
    path: 'licenses',
    loadChildren: () => import('./pages/licenses/licenses.module').then((m) => m.LicensesPageModule),
  },
  {
    path: 'reservation',
    loadChildren: () => import('./pages/reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/question/question.module').then( m => m.QuestionPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
