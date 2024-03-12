import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor() {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    (document.getElementById('menu-iframe') as any).src = 'https://gaudi-bakery.com/menu';
  }
}
