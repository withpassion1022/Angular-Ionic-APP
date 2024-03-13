import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    (document.getElementById('question-iframe') as any).src =
      'https://docs.google.com/forms/d/e/1FAIpQLSfjHwN8LNbyoCayNdJPp3Lo3SS5WwzYUaR3gp8gpUG7Wat2sQ/viewform';
    // (document.getElementById('shop-iframe')[0] as any).contentDocument.location.reload();
  }
}
