import { Component, OnInit } from '@angular/core';

import { BoeService } from '../boe.service';
import { searchParam } from './../model/searchParam';

// interface Sex {
//   name: string;
//   code: string;
// }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  // 性别选项
  genderList = [
    { name: '全部', code: '' },
    { name: '男', code: 'M' },
    { name: '女', code: 'F' }
  ];

  // 组件主数据
  name = '';
  gender = this.genderList[0];

  // 组件非主数据
  namePlaceholder = '请输入名字';

  constructor(private boeService: BoeService) {
  }

  ngOnInit(): void {
  }

  onClickSearch() {

    // Search key word
    let param = new searchParam();
    param.name = this.name;
    param.gender = this.gender.code;

    this.boeService.doSearch(param);
  }
}
