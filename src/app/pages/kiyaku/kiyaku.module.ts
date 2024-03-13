import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KiyakuPageRoutingModule } from './kiyaku-routing.module';

import { KiyakuPage } from './kiyaku.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, KiyakuPageRoutingModule],
  declarations: [KiyakuPage],
})
export class KiyakuPageModule {}
