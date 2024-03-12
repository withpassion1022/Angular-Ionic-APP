import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  // @ViewChild('back_btn') el: ElementRef;
  animals: string[] = ['Tiger', 'Lion', 'Elephant', 'Fox', 'Wolf'];
  // public gender: string;
  public birthdate: string;
  // public birthdate;
  public frequency: string;
  public postalCode: string;
  // customActionSheetOptions: any = {
  //   header: 'Colors',
  //   subHeader: 'Select your favorite color',
  // };

  constructor(public commonService: CommonService, public apiService: ApiService, public pickerController: PickerController) {}

  ngOnInit() {}

  toNextPage(pageName) {
    // if (!this.gender) {
    //   this.gender = '';
    // }
    if (!this.birthdate) {
      this.birthdate = '';
    }
    if (!this.frequency) {
      this.frequency = '';
    }
    if (!this.postalCode) {
      this.postalCode = '';
    }
    this.commonService.toNextPage(pageName);
    // this.apiService.setInfoPageVar(this.gender, this.birthdate, this.frequency, this.postalCode);
    this.apiService.setInfoPageVar(this.birthdate, this.frequency, this.postalCode);
    console.log(this.birthdate.slice(0, 7));
    console.log(this.birthdate);
  }

  skipPage(pageName) {
    // this.gender = '';
    this.birthdate = '';
    this.frequency = '';
    this.postalCode = '';
    this.commonService.toNextPage(pageName);
    // this.apiService.setInfoPageVar(this.gender, this.birthdate, this.frequency, this.postalCode);
    this.apiService.setInfoPageVar(this.birthdate, this.frequency, this.postalCode);
  }

  toBackPage(pageName) {
    this.commonService.toBackPage(pageName);
  }

  async showPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value);
          },
        },
      ],
      columns: [
        {
          name: 'Animals',
          options: this.getColumnOptions(),
        },
      ],
    };

    const picker = await this.pickerController.create(options);
    picker.present();
  }

  getColumnOptions() {
    const options = [];
    this.animals.forEach((x) => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  customActionSheet(ss) {
    return { header: ss };
  }
}
