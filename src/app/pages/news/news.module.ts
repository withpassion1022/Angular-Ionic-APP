import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
// import { FooterComponent } from '../../components/footer/footer.component';
// import { FooterTabPageModule } from '../footer-tab/footer-tab.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    // FooterTabPageModule
  ],
  exports: [NewsPage],
  declarations: [NewsPage]
})
export class NewsPageModule {}
