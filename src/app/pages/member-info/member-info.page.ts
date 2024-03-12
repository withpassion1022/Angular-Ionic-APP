import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.page.html',
  styleUrls: ['./member-info.page.scss'],
})
export class MemberInfoPage implements OnInit {
  barcodeId: any;
  pinNumber: any;
  constructor(public storageService: StorageService, public commonService: CommonService, public emailComposer: EmailComposer) {}

  async ngOnInit() {
    const returnValue: any = await this.storageService.getNativeStorageValue('my_info');
    if (returnValue !== 'error') {
      // this.barcodeId = returnValue[0].barcode_id
      this.barcodeId = returnValue.barcode_id;
      this.pinNumber = returnValue.pin_number;
    }
  }

  // toBackPage(pageName) {
  //   this.commonService.toNextPage(pageName);
  // }
  toBackPage(pageName) {
    this.commonService.toBackPage(pageName);
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
}
