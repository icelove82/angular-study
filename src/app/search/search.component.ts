import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { SelectItem } from 'primeng/api';

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
  name;
  gender: Sex;

  // 组件非主数据
  namePlaceholder = '请输入名字';
  genderList: Sex[];

  constructor() {
    this.genderList = [
      { name: '男', code: 'M' },
      { name: '女', code: 'F' }
    ];

    this.gender = this.genderList[0];
  }

  ngOnInit(): void {}

  onBlur() {
    alert('The value :' + this.name + ' / Gender : ' + this.gender.name);
  }
}
