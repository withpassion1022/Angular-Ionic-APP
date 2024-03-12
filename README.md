### docker
```
# dockerコンテナを起動する
$ docker-compose up -d
# dockerコンテナに入る
$ docker-compose exec web sh
# ionicアプリをスタート
<!-- > ionic serve --address=0.0.0.0 -->
> ionic serve --address=0.0.0.0 --port=8200
```

### ios 実機テスト

1. dockerコンテナに入る
```
$ docker-compose exec web sh
```

2. config.xml で GoogleService-Info.plist の行を削除

3. プラットフォームの作成
```
$ ionic cordova platform add ios
```
4. config.xml で GoogleService-Info.plist の行を追加
```
<resource-file src="GoogleService-Info.plist" target="Resources/GoogleService-Info.plist" />
```
5. ビルド
```
$ ionic cordova build ios --prod
```
**dockerコンテナ内にはXcodeが存在しないためエラーとなるが無視してよい**
6. Xcodeで起動する  
ファインダーで下記のファイルを開く  
/path/to/gaudi-app/platforms/ios/MyApp.xcodeproj
7. Teamを変更  
MyApp.xcodeprojの Signing & Capabilities でDebugのTeamを変更、反映する
8. スキーマを選択する  
Product > Scheme > Choose Scheme をクリックし、「MyApp」から起動したいデバイスを選択する
9. アプリを起動する  
Product > Run をクリックする
---


```
# buildとcordova pluginのインストールを以下のコマンドで実行
> ionic cordova prepare ios --device

- xcodeでplatforms/iosのフォルダを開く
- 上部タブメニューで「Signing & Capabilities」を選択
- teamを Shogo Murakamiに変更
- 変更を反映させる

#　実機をpcにつないで以下を実行
> ionic cordova run ios --device

# 参考記事
https://qiita.com/kgsi/items/5cc4ee1d645598ba0cb6
```

## 配信準備
1. 必要に応じて実行する  
git pull  
npm install
2. prepare  
   ionic cordova prepare ios  
   ionic cordova prepare android
3. build  
   ionic cordova build ios  
   ionic cordova build android

## iOS XcodeでAd Hoc配信
platforms/ios/MyApp.xcworkspace を Xcodeで開く  
MyApp > Any iOS Device (arm64) を選択する  
Product -> Build  
Product -> Archive  
1. Select archive  
   [Distribute App]
2. Select a method of distribution:  
   Select **Ad Hoc**  
   Next
3. Ad Hoc distribution options:  
   App Thinning: **All compatible device variants**  
   Additional Options: **checked.**  
   Next  
4. Distribution manifest information:  
   Name: **MyApp**  
   <!-- App URL: **https://gaudi-bakery.com/app/ios/Apps/MyApp.ipa**  
   Display Image URL: **https://gaudi-bakery.com/app/ios/icon.png**  
   Full Size Image URL: **https://gaudi-bakery.com/app/ios/icon@2x.png**   -->
   App URL: **https://as2.jp/app/ios/Apps/MyApp.ipa**  
   Display Image URL: **https://as2.jp/app/ios/icon.png**  
   Full Size Image URL: **https://as2.jp/app/ios/icon@2x.png**  
   Next  
5. Select certificate and iOS Ad Hoc profiles:  
   Distribution certificate: **Default**  
   MyApp.app: **gaudiAppDev for Ad Hoc**  
   Next (Wait a few seconds.)  
6. Review...  
   Export  
7. Upload files  
   manifest.plist  
   ~.ipa files  
   ~.png files  
   index.html  

> 参考  
> https://qiita.com/j-kimu/items/384dff238b62045e9ea9

## Android テスト配信
```ionic cordova build android``` で作成された.apkファイルを任意の場所にアップロードしURLを共有する。  
platforms/android/app/build/outputs/apk/debug/app-debug.apk

## FTPアップロード方法
Host: daisencoffee.sakura.ne.jp
User: daisencoffee
Pass: a27avxvuy2
/home/daisencoffee/www/gaudi-bakery.com/app/ios
に manifest.plist をアップロード
/home/daisencoffee/www/gaudi-bakery.com/app/ios/Apps
にある~.ipaを一度削除し 作成したApps以下の~.ipaファイルを全てアップロードする

> 参考  
> https://aulta.co.jp/archives/8708
> https://qiita.com/mfks17/items/c38d3713cb5b2c5536ff
> https://fuzzy31u.hatenadiary.org/entry/20110606/1307324152



## VSCode settings.json 
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

