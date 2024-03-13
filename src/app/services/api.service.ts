import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

const header = {
  'x-api-key': environment.apiToken,
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public uuid: any;
  public serialNum: any;
  public birthdate: string;
  public frequency: string;
  public postalCode: string;
  public barcodeId: string;

  constructor() {}

  setInfoPageVar(birthdate, frequency, postalCode) {
    this.birthdate = birthdate;
    this.frequency = frequency;
    this.postalCode = postalCode;
  }

  setBarcodeId(barcodeId) {
    this.barcodeId = barcodeId;
  }

  requestAPI(type, keys) {
    return new Promise((resolve) => {
      if (environment.production === true) {
        console.log('apiRequest for prod');
      } else {
        console.log('apiRequest for dev');
      }
      const requestJSON = {
        OperationType: type,
        Keys: keys,
      };

      const options = {
        url: environment.apiUrl,
        headers: header,
        data: requestJSON,
      };
    
      CapacitorHttp.post(options).then(
        (data) => {
          console.log('received!!');
          console.log(JSON.stringify(data));
          console.log(JSON.stringify(data.data));
          if (data.data) {
            console.log(JSON.stringify(data.data.Items));
            console.log(data.data.Items);
            console.log(typeof JSON.stringify(data.data));
            console.log(requestJSON);
            console.log(this.uuid);
  
            if (type === 'LOGIN' || type === 'ALREADY_EXIST') {
              resolve(data.data.Items[0]);
            } else {
              resolve(data.data);
            }
          } else {
            resolve('error');
          }
        },
        (error) => {
          console.log('error');
          console.log(error);
          resolve('error');
        },
      );
    });
  }
}
