import { Injectable } from '@angular/core';

// declare let Parser: any;
export interface Coupon {
  id: string;
  setdate: string;
  startdate: string;
  enddate: string;
  title: string;
  note: string;
  order: number;
  barcode: string;
  url: string;
  deldate: string;
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor() {}

  getCoupon(): Array<Coupon> {
    console.log('getCoupon()!');

    // const URL = '';
    let CouponList :Coupon[] = [
    ];

    // fetch(URL, { cache: 'no-cache' })
    //   .then((response) =>  {
    //     console.log(response)
    //     CouponList = [...response]
    //   });
    return CouponList;
  }

  dateFormat(date) {
    const month = String(new Date(date).getMonth());
    const year = String(new Date(date).getFullYear());
    const day = String(new Date(date).getDay());
    return year + '年' + month + '月' + day + '日';
  }
}
