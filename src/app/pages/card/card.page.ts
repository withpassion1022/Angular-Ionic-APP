import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as JsBarcode from 'jsbarcode';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, AfterViewInit {
  public barcodeId: string;
  // public pointAmount: BehaviorSubject<any>;
  public pointAmount: any;
  // public pointAmount:any = new BehaviorSubject();
  public requestKeys: any;

  constructor(public storageService: StorageService, public apiService: ApiService, public platform: Platform, public commonService: CommonService,) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    const returnValue: any = await this.storageService.getNativeStorageValue('my_info');
    if (returnValue && returnValue !== 'error') {
      console.log('this.barcodeId = returnValue.barcode_id;', returnValue)
      this.barcodeId = returnValue.barcode_id;
    }

    JsBarcode('#barcode')
      .options({ font: 'EAN-13' })
      .CODE128(this.barcodeId, { fontSize: 18, textMargin: 0, background: '#FFFAF0', width: 2, height: 100})
      .render();

    this.pointGetAPI();

    this.platform.pause.subscribe(async () => {
      console.log('Pause event detected');
      this.pointGetAPI();
      // document.getElementById('point-amount-text').innerHTML = this.pointAmount + ' P';
    });
    this.platform.resume.subscribe(async () => {
      console.log('resume event detected');
      this.pointGetAPI();
      // document.getElementById('point-amount-text').innerHTML = this.pointAmount + ' P';
      // window.location.reload();
      // this.ionViewWillEnter();
    });
  }

  ionViewWillEnter() {
    this.pointGetAPI();
  }

  setRequestKeys() {
    this.requestKeys = {
      barcode_id: this.barcodeId,
    };
  }

  async pointGetAPI() {
    this.setRequestKeys();
    // const pointAmountNumber = await this.apiService.requestAPI('POINT_AMOUNT', this.requestKeys);
    this.pointAmount = await this.apiService.requestAPI('POINT_AMOUNT', this.requestKeys);
    this.pointAmount = JSON.stringify(this.pointAmount);

    if (this.pointAmount === 'error' || typeof this.pointAmount != 'number') {
      // alert('保有ポイント読み込みに失敗しました');
      // this.pointAmount = new BehaviorSubject(0);
      this.pointAmount = '';
    } else if (this.pointAmount === null) {
      // this.pointAmount = new BehaviorSubject(0);
      this.pointAmount = 0;
      console.log('returned null');
    }
    // else {
    //   this.pointAmount = new BehaviorSubject(pointAmountNumber);
    // }

    console.log('this.pointAmount1:' + this.pointAmount);
    console.log('this.pointAmount2:' + JSON.stringify(this.pointAmount));
    document.getElementById('point-amount-text').innerHTML = this.pointAmount + ' P';
  }

  ionViewDidLoad() {
    // JsBarcode("#barcode")
    // .options({font:"EAN-13"})
    // .CODE128("1111111111111",{fontSize:10,textMargin:0,height:50})
    // .render();
  }

  goToCouponList() {
    this.commonService.toNextPage('footer-tab/coupons');
  }
}
