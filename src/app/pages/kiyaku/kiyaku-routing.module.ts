import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KiyakuPage } from './kiyaku.page';

const routes: Routes = [
  {
    path: '',
    component: KiyakuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KiyakuPageRoutingModule {}
