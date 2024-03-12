import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointRegisterPage } from './point-register.page';

const routes: Routes = [
  {
    path: '',
    component: PointRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointRegisterPageRoutingModule {}
