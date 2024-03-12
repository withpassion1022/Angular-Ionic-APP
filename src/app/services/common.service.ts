import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  // @ViewChild('back_btn') el: ElementRef;
  constructor(public router: Router, public navCtrl: NavController, public emailComposer: EmailComposer) {}

  toNextPage(pageName) {
    this.router.navigateByUrl(pageName);
  }

  toBackPage(pageName) {
    this.navCtrl.navigateBack(pageName);
  }

  openEmail(barcode, pin) {
    const mailMessage =
      '--------------------<br>機種変更などの際に会員証を再度表示するために必要となります。<br>本メールは大切に保管してください。<br>--------------------<br>';
    const email = {
      subject: 'ASASアプリ会員情報',
      body: mailMessage + 'バーコード番号: ' + barcode + '<br>PIN番号: ' + pin,
      isHtml: true,
    };
    this.emailComposer.open(email);
  }

  showTestHTML(id) {
    console.log('showTestHTML1');
    if (environment.production === false) {
      console.log('showTestHTML2');
      document.getElementById(id).removeAttribute('hidden');
    }
  }

  preventMultipleTaps(clickedId) {
    // (document.getElementsByClassName(clicked) as any).disabled = true;
    (document.getElementById(clickedId) as any).disabled = true;
    // const elements = document.querySelectorAll('ion-back-button');
    // const elements = document.getElementsByTagName('ion-back-button');
    // console.log('elements:' + elements);
    // console.log('elements:' + elements.item);
    // console.log('elements:' + String(elements));
    // console.log('elements:' + JSON.stringify(elements));
    // elements.map((item) => {
    //   console.log(item);
    // });
    // console.log(elements.item(0));
    // console.log(elements.item(1));
    // console.log(elements.item(2));
    // elements.item(0).disabled = true;

    // for (const i of Object.keys(elements)) {
    //   console.log(i);
    //   console.log(elements[i]);
    //   elements[i].disabled = true;
    // }
    // this.el.nativeElement.disabled = true;
    // console.log(clickElement);
    // console.log(clickElement.nativeElement);
    console.log('preventMultipleTaps() called ');
  }
}
