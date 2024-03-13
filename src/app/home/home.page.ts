import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ModalController, Platform } from '@ionic/angular';
import { PushService } from '../services/push.service';
import { PushModalPage } from '../pages/push-modal/push-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public commonService: CommonService,
    public platform: Platform,
    public pushService: PushService,
    public modalCtrl: ModalController,
  ) {
    // const logger = new Logger('foo');
    // logger.info('info bar test');
    // logger.debug('debug bar test');
    // logger.warn('warn bar test');
    // logger.error('error bar test');
    // console.log('test!!!')
    // console.log('does it appear on AWS?')
    // window.addEventListener('load', () => {
    //   commonService.showTestHTML('modal-test');
    // });

    if (platform.is('ios')) {
      window.onload = () => {
        // document.getElementById('ios').removeAttribute('hidden');
        this.pushService.pushRegister();
      };
    }
    if (platform.is('cordova')) {
      window.onload = () => {
        // document.getElementById('cordova').removeAttribute('hidden');
        this.pushService.pushRegister();
      };
    }
  }

  ngOnInit() {
    this.commonService.showTestHTML('modal-test');
  }

  toNextPage(pageName) {
    this.commonService.toNextPage(pageName);
  }

  async testModal() {
    console.log('openPushModal()');
    const modal = await this.modalCtrl.create({
      component: PushModalPage,
      cssClass: 'push-modal',
    });
    modal.present();
  }
}
