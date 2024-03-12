import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  constructor() {}

  pushRegister() {
    console.log('Initializing HomePage');
    // alert('pushRegister()');

    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
        console.log('push通知の登録できました');
      } else {
        console.log('push通知の登録ができません');
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    // もしアプリが開いてる状態で通知を受け取ったら
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      // alert('プッシュ通知を受け取りました: ' + JSON.stringify(notification));
      console.log('プッシュ通知を受け取りました: ' + JSON.stringify(notification));
    });

    // 通知がタップされた時に発動する
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      // alert('実行されたプッシュアクション: ' + JSON.stringify(notification));
      console.log('実行されたプッシュアクション: ' + JSON.stringify(notification));
    });
  }
}
