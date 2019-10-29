import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'kwselector',
  templateUrl: './kwselector.component.html',
  styleUrls: ['./kwselector.component.scss'],
})
export class KWSelectorComponent implements OnInit {

  @Input() public limitStartKW = -1;
  @Input() public limitEndeKW = -1;
  @Input() public limitStartYear = -1;
  @Input() public limitEndeYear = -1;

  @Input() public selectedKW = -1;
  @Output() public selectedKWChange = new EventEmitter<number>();
  @Input() public selectedYear = -1;
  @Output() public selectedYearChange = new EventEmitter<number>();

  public value = '';
  constructor() {
    const now = moment();
    this.value = `${ now.format('YYYY') }-W${ now.format('w') }`;
  }

  ngOnInit() {}

}
