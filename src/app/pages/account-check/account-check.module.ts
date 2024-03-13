import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountCheckPageRoutingModule } from './account-check-routing.module';

import { AccountCheckPage } from './account-check.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountCheckPageRoutingModule],
  declarations: [AccountCheckPage],
})
export class AccountCheckPageModule {}
