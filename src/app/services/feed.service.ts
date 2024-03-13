import { Injectable } from '@angular/core';

// declare let Parser: any;
interface Feed {
  title: string;
  link: string;
  date: string;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor() {}

  getFeed(): Array<any> {
    console.log('getFeed()!');

    const URL = 'https://gaudi-bakery.com/feed';
    const feedList = [];

    fetch(URL, { cache: 'no-cache' })
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => {
        const items = data.querySelectorAll('item');

        items.forEach((item) => {
          const itemDic = {} as Feed;
          itemDic.title = item.querySelector('title').innerHTML;
          itemDic.link = item.querySelector('link').innerHTML;
          itemDic.date = this.dateFormat(item.querySelector('pubDate').innerHTML);
          // const strContent = item.querySelector('encoded').textContent;
          // itemDic.img = new window.DOMParser().parseFromString(strContent, 'text/xml').querySelector('img').getAttribute('src');
          itemDic.img = item.querySelector('thumb').innerHTML;

          feedList.push(itemDic);
        });
        console.log(feedList);

        // feedList.push(dataList);
      });
    return feedList;
  }

  dateFormat(date) {
    const month = String(new Date(date).getMonth());
    const year = String(new Date(date).getFullYear());
    const day = String(new Date(date).getDay());
    return year + '年' + month + '月' + day + '日';
  }
}
