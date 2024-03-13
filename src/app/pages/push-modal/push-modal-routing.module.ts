import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushModalPage } from './push-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PushModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushModalPageRoutingModule {}
