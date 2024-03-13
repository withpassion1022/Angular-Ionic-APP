import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Browser } from '@capacitor/browser';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {
  versionNumber: string;
  barcodeId: any;
  pinNumber: any;

  constructor(
    public commonService: CommonService,
    public platform: Platform,
    public storageService: StorageService,
    public emailComposer: EmailComposer,
  ) {}

  async ngOnInit() {
    this.platform.ready().then(() => {
      App.getInfo().then(
        (res) => {
          console.log(res);
          console.log(JSON.stringify(res));
          this.versionNumber = res.version;
        },
        (err) => {
          console.log(err);
        },
      );
    });
    const returnValue: any = await this.storageService.getNativeStorageValue('my_info');
    if (returnValue !== 'error') {
      // this.barcodeId = returnValue[0].barcode_id
      this.barcodeId = returnValue.barcode_id;
      this.pinNumber = returnValue.pin_number;
    }
  }

  openEmail() {
    const mailMessage =
      '--------------------<br>機種変更などの際に会員証を再度表示するために必要となります。<br>本メールは大切に保管してください。<br>--------------------<br>';
    const email = {
      subject: 'ASASアプリ会員情報',
      body: mailMessage + 'バーコード番号: ' + this.barcodeId + '<br>PIN番号: ' + this.pinNumber,
      isHtml: true,
    };
    this.emailComposer.open(email);
  }

  toNextPage(pageName) {
    this.commonService.toNextPage(pageName);
  }

  toGoogleForm() {
    Browser.open({
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSfhtTO1d7snSVJ97TveLF2vXYfYrx7xsuIs3TQ-BX_8e8BVHg/viewform?embedded=true',
      windowName: '_system',
    });
  }

  toContact() {
    Browser.open({ url:'https://docs.google.com/forms/d/e/1FAIpQLSdNPMTzGExKVUhOeyESjeVv0H4gwx_iIkcY3XWreyOTxzEqJQ/viewform', windowName: '_system' });
  }

  toShop() {
    Browser.open({ url:'https://gaudi-bakery.com/shop', windowName: '_system' });
  }

  toMenu() {
    Browser.open({ url:'https://gaudi-bakery.com/menu', windowName: '_system' });
  }

  toPrivacyPolicy() {
    Browser.open({ url:'https://nikkokikaku.com/terms/', windowName: '_system' });
  }

  toKiyaku() {
    Browser.open({ url:'https://nikkokikaku.com/app-terms/', windowName: '_system' });
  }
}
