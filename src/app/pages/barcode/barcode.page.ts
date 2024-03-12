import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as JsBarcode from 'jsbarcode';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Coupon, CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit, AfterViewInit {
  public itemId: string;
  public thisCoupon: Coupon;
  public title: string;
  

  constructor(private route: ActivatedRoute,public storageService: StorageService, public couponService: CouponService, public apiService: ApiService, public platform: Platform, public commonService: CommonService,) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = String(params.get('id')); // 'id' should match the parameter name in the route
    });
    const returnValue: any = await this.apiService.requestAPI('SCAN_COUPON', {});
    if (returnValue === 'error') {
      console.log('returnValue === error');
    } else if (returnValue) {
      console.log(returnValue)
      if (returnValue.Items.filter(r => r.id === this.itemId).length > 0) {
        this.thisCoupon = returnValue.Items.filter(r => r.id === this.itemId)[0]
        JsBarcode('#barcodeCoupon')
        .options({ font: 'EAN-13' })
        .CODE128(this.thisCoupon.barcode, { fontSize: 10, textMargin: 0, height: 100, background: '#FFFAF0' })
        .render();
      }
    }
  }

  async ngAfterViewInit() {
  }

  ionViewWillEnter() {
  }

  goToCouponList() {
    this.commonService.toNextPage('footer-tab/coupons');
  }
  goToCoupon() {
    this.commonService.toNextPage('footer-tab/coupon/' + this.itemId);
  }
}
