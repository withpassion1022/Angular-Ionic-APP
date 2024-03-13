import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberInfoPage } from './member-info.page';

const routes: Routes = [
  {
    path: '',
    component: MemberInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberInfoPageRoutingModule {}
