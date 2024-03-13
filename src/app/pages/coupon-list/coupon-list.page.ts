import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as JsBarcode from 'jsbarcode';
import { StorageService } from 'src/app/services/storage.service';
import { Coupon, CouponService } from 'src/app/services/coupon.service';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.page.html',
  styleUrls: ['./coupon-list.page.scss'],
})
export class CouponList implements OnInit, AfterViewInit {
  public coupons: Coupon[] | null;
  public imgHost: string = environment.imgUrl
  public myId: string;
  isUsedValues: { [couponId: string]: boolean } = {};

  constructor(public storageService: StorageService, public couponService: CouponService, public platform: Platform, public commonService: CommonService, public apiService: ApiService) {}

  async ngOnInit() {
    const user: any = await this.storageService.getNativeStorageValue('my_info');
    if (user !== 'error') {
      this.myId = user.barcode_id
    }
  }

  async ngAfterViewInit() {
  }

  async ionViewWillEnter() {
    this.coupons = null;
    const returnValue: any = await this.apiService.requestAPI('SCAN_COUPON', {});
    if (returnValue === 'error') {
      console.log('returnValue === error');
      this.coupons = [];
    } else if (returnValue) {
      console.log(returnValue)
      this.coupons = returnValue.Items
      this.coupons.forEach((coupon) => this.isUsed(coupon));
    }
  }

  ionViewDidLoad() {
    // JsBarcode("#barcode")
    // .options({font:"EAN-13"})
    // .CODE128("1111111111111",{fontSize:10,textMargin:0,height:50})
    // .render();
  }
  goToCoupon(id:string) {
    this.commonService.toNextPage('footer-tab/coupon/' + id);
  }

  goToHome() {
    this.commonService.toNextPage('footer-tab/card');
  }

  calculateOpacity(coupon: Coupon): number {
    const couponDate = new Date(
      Number(coupon.enddate.slice(0, 4)),
      Number(coupon.enddate.slice(4, 6)) - 1,
      Number(coupon.enddate.slice(6, 8))
    ).getTime();
  
    if (couponDate > new Date().getTime()) {
      return 1
    } else {
      return 0.5;
    }
  }
  
  async isUsed(coupon: Coupon): Promise<void> {
    let isUsed: boolean;
    const returnValue: any = await this.apiService.requestAPI('QUERY_COUPON', {
      "coupon_id": coupon.id,
      "barcode": this.myId
    });

    if (returnValue === 'error') {
      isUsed = true;
    } else {
      isUsed = returnValue.Items.length > 0 ? true : false;
    }
    this.isUsedValues[coupon.id] = isUsed;
  }

}
