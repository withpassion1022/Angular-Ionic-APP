import { Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: 'confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}