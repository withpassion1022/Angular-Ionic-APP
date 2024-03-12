import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  shopList: any[];
  barcodeId: any;
  constructor(public storageService: StorageService, public callNumber: CallNumber) {}

  async ngOnInit() {
    const returnValue: any = await this.storageService.getNativeStorageValue('my_info');
    if (returnValue !== 'error') {
      this.barcodeId = returnValue.barcode_id;
      // this.pinNumber = returnValue.pin_number;
    }

    this.shopList = [
      {
        name: '長田店',
        img: 'https://as2.jp/wp/wp-content/themes/asas/images/shop/shop_list_nagata.jpg',
        address: '大阪府東大阪市長田東1-6-18',
        phone: '06-6618-6700',
      },
      {
        name: '瓜破店',
        img: 'https://as2.jp/wp/wp-content/themes/asas/images/shop/shop_list_uriwari.jpg?ver2016-05-16',
        address: '大阪市平野区瓜破西1丁目8番26号 ザクロコーポレーション平野ビル4階',
        phone: '06-6705-0666',
      },
      {
        name: '江坂店',
        img: 'https://as2.jp/wp/wp-content/themes/asas/images/shop/shop_list_esaka.jpg',
        address: '大阪府吹田市垂水町3-35-12',
        phone: '06-6190-0012',
      },
      {
        name: '和泉店',
        img: 'https://as2.jp/wp/wp-content/themes/asas/images/shop/shop_list_izumi.jpg',
        address: '大阪府和泉市富秋町2-7-9',
        phone: '0725-46-8070',
      },
      {
        name: '守口店',
        img: 'https://as2.jp/wp/wp-content/themes/asas/images/shop/shop_list_moriguchi.jpg',
        address: '大阪府守口市菊水通3-8-9',
        phone: '06-6996-0234',
      },
      {
        name: '奈良広陵店',
        img: 'https://as2.jp/wp/wp-content/themes/asas/images/shop/shop_list_kouryo.jpg',
        address: '奈良県北葛城郡広陵町笠308',
        phone: '0745-43-9723',
      },
    ];

    console.log(this.shopList)
  }

  callShop(phoneNumber) {
    this.callNumber
      .callNumber(phoneNumber, true)
      .then((res) => console.log('Launched dialer!', res))
      .catch((err) => console.log('Error launching dialer', err));
  }

  // ionViewWillEnter() {
  //   (document.getElementById('reservation-iframe') as any).src =
  //     'https://docs.google.com/forms/d/e/1FAIpQLSdJuUJsumlnovFhkPoVxzYwS0tQE3u95v98xf6YWAzcvpvIGA/viewform';
  //   // (document.getElementById('shop-iframe')[0] as any).contentDocument.location.reload();
  // }
}
