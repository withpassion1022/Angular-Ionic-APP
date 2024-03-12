import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as JsBarcode from 'jsbarcode';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { Coupon, CouponService } from 'src/app/services/coupon.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';
import { PeriodModalComponent } from 'src/app/components/period-modal/period-modal.component';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.page.html',
  styleUrls: ['./coupon-item.page.scss'],
})
export class CouponItemPage implements OnInit, AfterViewInit {

  public coupons: Coupon[];
  itemId: string;
  thisCoupon: Coupon;
  history: any;
  public imgHost: string = (environment as any).imgUrl;
  getCouponDisabled: boolean = false

  constructor(private modalCtrl: ModalController, private route: ActivatedRoute, public storageService: StorageService, public apiService: ApiService, public platform: Platform, public couponService: CouponService, public commonService: CommonService) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = String(params.get('id'));
    });
    const returnValue: any = await this.apiService.requestAPI('SCAN_COUPON', {});
    if (returnValue) {
      this.coupons = returnValue.Items
      if (this.coupons.filter(r => r.id === this.itemId).length > 0) {
        this.thisCoupon = this.coupons.filter(r => r.id === this.itemId)[0]
      }
    }
  }

  async ngAfterViewInit() {

  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {

  }

  goToCouponList() {
    this.commonService.toNextPage('footer-tab/coupons');
  }

  async getCoupon () {
    this.getCouponDisabled = true;
    const user: any = await this.storageService.getNativeStorageValue('my_info');
    if (user !== 'error') {
      const returnValue: any = await this.apiService.requestAPI('QUERY_COUPON', {
        "coupon_id": this.thisCoupon.id,
        "barcode": user.barcode_id
      });
      if (returnValue === 'error') {
        console.log('returnValue === error');
        this.getCouponDisabled = false;
      } else if (returnValue) {
        if (returnValue.Items.length > 0){
          const backendTime = returnValue.Items[0].date.replace(' ', 'T') + '+09:00';
          const jstDateTime = new Date(backendTime);
          const currentTime = new Date();
          const timeDifference = currentTime.getTime() - jstDateTime.getTime();
          if ((timeDifference / (1000 * 60) ) < 30) {
            this.getCouponDisabled = false;
            this.commonService.toNextPage('footer-tab/coupon/barcode/'+ this.thisCoupon.id);
          } else {
            this.history = returnValue.Items[0]
            this.openModal()
          }
        } else {
          const couponDate = new Date(
            Number(this.thisCoupon.enddate.slice(0, 4)),
            Number(this.thisCoupon.enddate.slice(4, 6)) - 1,
            Number(this.thisCoupon.enddate.slice(6, 8))
          ).getTime();
        
          if (couponDate > new Date().getTime()) {
            this.openConfirmModal()
          } else {
            this.openPeriodModal()
          }
        }
      }
    } else {
      this.getCouponDisabled = false;
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        date: this.history.date,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getCouponDisabled = false;
    } else {
      this.getCouponDisabled = false;
    }
  }

  async openPeriodModal() {
    const modal = await this.modalCtrl.create({
      component: PeriodModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getCouponDisabled = false;
    } else {
      this.getCouponDisabled = false;
    }
  }

  async openConfirmModal() {
    const modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const user: any = await this.storageService.getNativeStorageValue('my_info');

      const returnValue: any = await this.apiService.requestAPI('ADD_COUPON_USE', {
        "coupon_id": this.thisCoupon.id,
        "barcode": user.barcode_id
      });
      if (returnValue === 'error') {
        console.log('returnValue === error');
      } else if (returnValue) {
        this.commonService.toNextPage('footer-tab/coupon/barcode/'+ this.itemId);
      }
      this.getCouponDisabled = false;
    } else {
      this.getCouponDisabled = false;
    }
  }
  
}
