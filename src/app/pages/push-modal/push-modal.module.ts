import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushModalPageRoutingModule } from './push-modal-routing.module';

import { PushModalPage } from './push-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushModalPageRoutingModule
  ],
  declarations: [PushModalPage]
})
export class PushModalPageModule {}
