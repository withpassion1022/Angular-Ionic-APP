import { Injectable } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { PushModalPage } from '../pages/push-modal/push-modal.page';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  title: string;
  text: string;
  option: string;
  image: string;

  constructor(public platform: Platform, public modalCtrl: ModalController, public alertController: AlertController,) {}

  setModalParams(message) {
    console.log('setModalParams()');
    try {
      this.title = message.aps.alert.title;
    } catch {
      this.title = '';
    }
    try {
      this.text = message.aps.alert.body;
    } catch {
      this.text = '';
    }
    try {
      this.option = message['google.c.a.c_l'];
    } catch {
      this.option = '';
    }
    try {
      this.image = message.fcm_options.image;
    } catch {
      this.image = '';
    }
  }

  async openPushModal() {
    console.log('openPushModal()');
    const modal = await this.modalCtrl.create({
      component: PushModalPage,
      cssClass: 'push-modal',
    });
    modal.present();
  }
}

