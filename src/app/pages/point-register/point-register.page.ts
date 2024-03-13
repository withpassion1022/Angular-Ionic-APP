import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-point-register',
  templateUrl: './point-register.page.html',
  styleUrls: ['./point-register.page.scss'],
})
export class PointRegisterPage implements OnInit {
  public requestKeys: any;

  constructor(
    public platform: Platform,
    public commonService: CommonService,
    public apiService: ApiService,
    public storageService: StorageService,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.commonService.showTestHTML('register-test');
  }

  toNextPage(pageName) {
    this.commonService.toNextPage(pageName);
  }

  toBackPage(pageName) {
    this.commonService.toBackPage(pageName);
  }

  setRequestKeys() {
    this.requestKeys = {
      barcode_id: this.apiService.barcodeId === undefined ? '' : String(this.apiService.barcodeId),
      // birthdate: this.apiService.birthdate === '' ? '' : this.apiService.birthdate.split('T')[0],
      birthdate: this.apiService.birthdate === '' ? '' : this.apiService.birthdate.slice(0, 7),
      frequency: this.apiService.frequency,
      // "term_id": String(this.apiService.uuid),
      // gender: this.apiService.gender,
      postal_code: this.apiService.postalCode,
    };
  }

  async inputPopup() {
    const alertPopup = await this.alertController.create({
      cssClass: 'my-custom-alert',
      // header: 'バーコード番号とPIN番号を大切に保管してください',
      // subHeader: '無くされた場合、ポイント復旧ができなくなります',
      message: 'カード番号を入力してください',
      inputs: [
        {
          name: 'numInput',
          placeholder: 'カード番号',
          // type: 'checkbox',
          // label: 'この画面を今後表示しない',
          // value: 'value1',
        },
      ],
      buttons: [
        {
          text: '会員登録',
          cssClass: 'primary',
          handler: async (alertData) => {
            console.log('Confirm Ok');
            console.log(alertData);
            console.log(alertData.numInput);
            // console.log(typeof alertData.numInput);
            // console.log(alertData[0]);
            if (alertData.numInput) {
              const barcodeId = alertData.numInput;
              if (barcodeId === '') {
                //alert('バーコード番号を入力してください。');
                return;
              }
              if (barcodeId.length !== 13) {
                //alert('13桁のバーコード番号を入力してください。');
                return;
              }
              const checkDigitNum = this.checkdigit(barcodeId);
              if (Number(barcodeId.substr(-1)) !== checkDigitNum) {
                //alert('再度バーコード番号を確認し、正しく入力してください。');
                return;
              }
              const existJson = {
                barcode_id: barcodeId,
              };
              const alreadyExist = await this.apiService.requestAPI('ALREADY_EXIST', existJson);
              console.log('alreadyExist:' + JSON.stringify(alreadyExist));
              if (alreadyExist) {
                //alert('こちらのバーコード番号は既に登録されています。');
                console.log('this barcode_id is already registered');
                return;
              }
              this.apiService.setBarcodeId(barcodeId);
              this.registerRequest();

              // this.storageService.setNativeStorageValue('stop_alert', true);
            }
          },
        },
      ],
    });
    await alertPopup.present();
  }

  checkdigit(code) {
    console.log('checkdigit() started');
    const s = String(code).slice(0, 12);
    let a = 0;
    let b = 0;

    for (let i = 0; i < s.length; i = i + 2) {
      a += Number(s.substr(i, 1));
    }

    for (let i = 1; i < s.length; i = i + 2) {
      b += Number(s.substr(i, 1));
    }

    let d = (a + b * 3) % 10;
    d = 10 - d;

    const onesPlaceString = String(d).substr(-1);
    const onesPlaceNum = Number(onesPlaceString);
    console.log(d);
    return onesPlaceNum;
  }

  async registerRequest() {
    this.setRequestKeys();
    const returnValue: any = await this.apiService.requestAPI('REGISTER', this.requestKeys);
    if (returnValue !== 'error') {
      console.log('returnValue:' + JSON.stringify(returnValue));
      this.storageService.setNativeStorageValue('my_info', returnValue);
      // this.storageService.setNativeStorageValue('my_info', this.requestKeys);
      this.commonService.toNextPage('footer-tab/card');
    }
  }
}
