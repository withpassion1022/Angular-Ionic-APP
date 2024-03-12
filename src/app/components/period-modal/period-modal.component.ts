import { Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: 'period-modal.component.html',
})
export class PeriodModalComponent {

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}