import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  feedList: any[];
  constructor(public feedService: FeedService) {}

  ngOnInit() {
    this.feedList = this.feedService.getFeed();
  }

  toArticleBrowser(url) {
    Browser.open({ url, windowName: '_system' });
  }
}
