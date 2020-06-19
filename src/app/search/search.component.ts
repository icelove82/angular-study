import { Component, OnInit } from '@angular/core';

import { BoeService } from '../boe.service';

interface Sex {
  name: string;
  code: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  // 组件主数据
  name: string;
  gender: Sex;

  // 组件非主数据
  namePlaceholder = '请输入名字';
  genderList: Sex[];

  constructor(private boeService: BoeService) {
    this.genderList = [
      { name: '男', code: 'M' },
      { name: '女', code: 'F' }
    ];

    this.gender = this.genderList[0];
  }

  ngOnInit(): void {}

  onBlur() {
    // alert('The value :' + this.name + ' / Gender : ' + this.gender.name);
  }

  onClickSearch() {

    console.log('Yes, u click search.');
  }
}
