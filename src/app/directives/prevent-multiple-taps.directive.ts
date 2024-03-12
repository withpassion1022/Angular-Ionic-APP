import { Directive, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventMultipleTaps]',
})
export class PreventMultipleTapsDirective implements OnInit {
  @Input('appPreventMultipleTaps') public isLoading: boolean;
  // @Input() public appPreventMultipleTaps: boolean;

  constructor() {
    console.log('prevent-multiple-taps directive set!!');
  }

  @HostListener('click') public onClick() {
    console.log('hostListener!!');
  }

  ngOnInit() {
    console.log('ngOnInit prevent-multiple-taps directive set!!');
  }
}
