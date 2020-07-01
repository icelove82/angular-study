import { Component, OnInit } from '@angular/core';

import { BoeService } from '../boe.service';
import { SearchParam } from './../model/searchParam';
import { AdultRadio } from './../model/adultRadio';

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
    { name: '女', code: 'F' },
  ];

  // 组件主数据
  name = '';
  gender = this.genderList[0];
  selectedAdultValue = 1;

  // 组件非主数据
  namePlaceholder = '请输入名字';

  constructor(private boeService: BoeService) {}

  ngOnInit(): void {}

  onClickSearch() {
    // Search key word
    const param = new SearchParam();
    param.name = this.name;
    param.gender = this.gender.code;

    this.boeService.doSearch(param);
  }

  onAdultSelected(param: AdultRadio) {
    // 通过 Service 触发过滤事件
    this.boeService.doFilter(param);
  }
}
