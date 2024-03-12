import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    (document.getElementById('shop-iframe') as any).src = 'https://as2.jp/app-page/shop/';
  }
}
