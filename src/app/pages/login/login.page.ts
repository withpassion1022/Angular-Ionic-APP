import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  barcodeId: string;
  pinNumber: string;

  constructor(public apiService: ApiService, public commonService: CommonService, public storageService: StorageService) {}

  ngOnInit() {}

  toBackPage(pageName) {
    this.commonService.toBackPage(pageName);
  }

  async logIn() {
    if (!this.barcodeId) {
      //alert('バーコード番号が入力されていません');
      return;
    } else if (!this.pinNumber) {
      //alert('PIN番号が入力されていません');
      return;
    }
    const keys = {
      barcode_id: this.barcodeId,
      pin_number: this.pinNumber,
    };
    const returnValue: any = await this.apiService.requestAPI('LOGIN', keys);
    if (returnValue === 'error') {
      console.log('returnValue === error');
    } else if (returnValue) {
      console.log('login 成功');
      console.log(returnValue);
      this.storageService.setNativeStorageValue('my_info', returnValue);
      this.commonService.toNextPage('footer-tab/card');
    } else {
      //alert('バーコード番号またはPIN番号が正しく入力されていません');
    }
  }
}
