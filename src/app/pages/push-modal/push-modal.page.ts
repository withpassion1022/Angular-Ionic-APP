import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-push-modal',
  templateUrl: './push-modal.page.html',
  styleUrls: ['./push-modal.page.scss'],
})
export class PushModalPage implements OnInit {
  text: string;
  title: string;
  option: string;
  image: string;

  constructor(public firebaseService: FirebaseService, public modalCtrl: ModalController) {}

  ngOnInit() {
    this.setPushParams();
  }

  setPushParams() {
    this.text = this.firebaseService.text;
    this.title = this.firebaseService.title;
    this.option = this.firebaseService.option;
    this.image = this.firebaseService.image;
    // if (!this.title) {
    //   this.setTestParams();
    // }
  }

  setTestParams() {
    this.text = 'テスト。この本文はテスト環境のみ使用。文字の大きさ等調整する。';
    this.title = 'テストタイトル';
    this.option = 'テストオプション';
    this.image = 'https://gaudi-bakery.com/wp/wp-content/uploads/2021/03/spring2021_panmaturi.jpg';
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
