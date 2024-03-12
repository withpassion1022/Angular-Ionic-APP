import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCheckPage } from './account-check.page';

const routes: Routes = [
  {
    path: '',
    component: AccountCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountCheckPageRoutingModule {}
