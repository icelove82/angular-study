import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { AdultRadio } from './../model/adultRadio';

@Component({
  selector: 'app-adult',
  templateUrl: './adult.component.html',
  styleUrls: ['./adult.component.css'],
})
export class AdultComponent implements OnInit {

  @Input() selectedValue = 1;
  @Output() adultSelected = new EventEmitter<AdultRadio>();

  // 组件主数据
  adultGroup = 'adult';

  adultRadioValues = [
    new AdultRadio(1, 'All'),
    new AdultRadio(2, 'Only Adult'),
    new AdultRadio(3, 'Only Not Adult'),
  ];

  constructor() {}

  ngOnInit(): void {}

  // onClick Event
  onClick(param: number) {

    // Emit my custom event
    this.adultSelected.emit(this.adultRadioValues[param]);
  }
}
