import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storageSpace: any;

  constructor() {}

  setNativeStorageValue(key, value) {
    Preferences.set({ key, value: JSON.stringify(value) }).then(
      () => {
        console.log('Stored item!');
        // //alert('Stored item!');
      },
      (error) => console.error('Error storing item', error),
    );
  }

  getNativeStorageValue(key) {
    return new Promise((resolve) => {
      Preferences.get({ key }).then(
        (ret) => {
          let data = JSON.parse(ret.value);
          console.log(data);
          console.log(JSON.stringify(data));
          // //alert(data);
          // //alert(JSON.stringify(data));
          // return data
          resolve(data);
        },
        (error) => {
          console.error(error);
          // //alert('data is not in native storage');
          // return 'error'
          resolve('error');
        },
      );
    });
  }
}
