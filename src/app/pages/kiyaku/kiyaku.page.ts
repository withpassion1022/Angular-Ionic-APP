import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
// import * as kiyakuText from 'src/assets/kiyaku/kiyaku.txt';

@Component({
  selector: 'app-kiyaku',
  templateUrl: './kiyaku.page.html',
  styleUrls: ['./kiyaku.page.scss'],
})
export class KiyakuPage implements OnInit {
  kiyakuText: any;

  constructor(public commonService: CommonService) {}

  ngOnInit() {
    fetch('../../assets/kiyaku/kiyaku.txt')
      .then((response) => response.text())
      .then((data) => {
        // Do something with your data
        console.log(data);
        this.kiyakuText = data;
      });
  }

  toNextPage(pageName) {
    this.commonService.toNextPage(pageName);
  }

  toBackPage(pageName) {
    this.commonService.toBackPage(pageName);
  }
}
