import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberInfoPageRoutingModule } from './member-info-routing.module';

import { MemberInfoPage } from './member-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberInfoPageRoutingModule
  ],
  declarations: [MemberInfoPage]
})
export class MemberInfoPageModule {}
