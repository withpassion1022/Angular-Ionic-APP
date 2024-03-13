import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { CommonService } from 'src/app/services/common.service';
import * as licensesJson from 'src/assets/licenses/licenses.json';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.page.html',
  styleUrls: ['./licenses.page.scss'],
})
export class LicensesPage implements OnInit {
  licenses: any;
  constructor(public commonService: CommonService) {}

  ngOnInit() {
    // console.log(licensesJson);
    // console.log(JSON.stringify(licensesJson));
    this.licenses = licensesJson;
  }

  onLicenseClick(license) {
    Browser.open({ url: license.repository, windowName: '_system' });
  }

  toBackPage(pageName) {
    this.commonService.toBackPage(pageName);
  }
}
