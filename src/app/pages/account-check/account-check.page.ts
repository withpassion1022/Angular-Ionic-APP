import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController, Platform, IonRouterOutlet } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-check',
  templateUrl: './account-check.page.html',
  styleUrls: ['./account-check.page.scss'],
})
export class AccountCheckPage implements OnInit {
  public requestJson: any;
  barcodeId: any;
  pinNumber: any;
  deviceID: any;
  public subscription: any;
  previousUrl: any;
  //code for exit app
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    public commonService: CommonService,
    public platform: Platform,
    public apiService: ApiService,
    public storageService: StorageService,
    public alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.router.url === '/footer-tab/card' || this.router.url === '/home') {
        navigator['app'].exitApp();
      } else if (this.router.url.includes('/footer-tab/coupon/')) {
        // this.commonService.toNextPage('/footer-tab/coupons');
      } else {
        this.commonService.toNextPage('/footer-tab/card');
      }
    });
  }

  ionViewDidEnter() {
    this.testGet();
  }

  // listStorageValue(){
  //   this.storageService.listStorageValue();
  // }

  // setStorageValue(){
  //   this.storageService.createStorageSpace('myInfo')
  //   const testAccount = {
  //     "barcode_id": "2222222222222",
  //     "birthdate": "1998-01-01",
  //     "pin_number": "",
  //     "created_date": "2020-01-01",
  //     "frequency": "週1回",
  //     "term_id": "111111111111111",
  //     "gender": "男性",
  //     "updated_date": ""
  //   }
  //   for (let key in testAccount){
  //     this.storageService.setStorageValue(key, testAccount[key])
  //   }
  // }

  // getStorageValue(){
  //   this.storageService.createStorageSpace('myInfo');
  //   this.storageService.getStorageValue('term_id');
  // }

  setRequestJson(deviceId) {
    this.requestJson = {
      // "term_id" : "22222222222"
      term_id: this.deviceID,
    };
  }

  toNextPage(pageName) {
    this.commonService.toNextPage(pageName);
  }

  testGet() {
    this.platform.ready().then(() => {

      Preferences.get({ key: 'my_info' }).then(
        (ret) => {
          let data = JSON.parse(ret.value);

          if (data == null) {
            this.toNextPage('home');
          } else {
            console.log(JSON.stringify(data));
  
            this.toNextPage('footer-tab/card');
            Preferences.get({ key: 'stop_alert' }).then(
              (alertData) => {
                console.log('stop_alert');
              },
              (error) => {
                this.barcodeId = data.barcode_id;
                this.pinNumber = data.pin_number;
                this.alertMemo();
              },
            );
          }
        },
        async (error) => {
          console.error(error);
          this.toNextPage('home');
        },
      );
    });
  }

  async alertMemo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert',
      // header: 'バーコード番号とPIN番号を大切に保管してください',
      // subHeader: '無くされた場合、ポイント復旧ができなくなります',
      message:
        '機種変更などの際にポイント・クーポンなどを復元するには、バーコード番号およびPIN番号が必要となります。<br><br>' +
        '<h1>' +
        'バーコード番号:' +
        '<br>' +
        this.barcodeId +
        '<br>' +
        'PIN番号:' +
        this.pinNumber +
        '</h1>',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'この画面を今後表示しない',
          value: 'value1',
        },
      ],
      buttons: [
        {
          text: 'メールで送る',
          cssClass: 'secondary',
          handler: (alertData) => {
            console.log('メールで送る');
            console.log(alertData[0]);
            if (alertData[0]) {
              this.storageService.setNativeStorageValue('stop_alert', true);
            }
            // this.commonService.toNextPage('member-info');
            this.commonService.openEmail(this.barcodeId, this.pinNumber);
          },
        },
        {
          text: 'OK',
          cssClass: 'primary',
          handler: (alertData) => {
            console.log('Confirm Ok');
            console.log(alertData);
            console.log(alertData[0]);
            if (alertData[0]) {
              this.storageService.setNativeStorageValue('stop_alert', true);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  stopAlert() {
    this.storageService.setNativeStorageValue('stop_alert', true);
  }

  testSet() {
    const testAccount = {
      barcode_id: 2222222222222,
      birthdate: '1998-01-01',
      pin_number: '',
      created_date: '2020-01-01',
      frequency: '週1回',
      term_id: 111111111111111,
      // gender: '男性',
      updated_date: '',
    };

    Preferences.set({ key: 'my_info', value: JSON.stringify(testAccount) }).then(
      () => {
        console.log('Stored item!');
        // alert('Stored item!');
      },
      (error) => console.error('Error storing item', error),
    );
  }
}
