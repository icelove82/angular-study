import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { BoeService } from './../boe.service';
import { SearchParam } from './../model/searchParam';
import { Student } from './../model/student';
import { AdultRadio } from './../model/adultRadio';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // 学生数据
  students: Student[];
  studentsBackup: Student[];

  // 过滤条件
  filterCondition: AdultRadio;

  constructor(private boeService: BoeService) {}

  ngOnInit(): void {
    // 订阅搜索事件
    this.boeService.searchObservable.subscribe((param) => {
      console.log(`${param.name} + ' / ' ${param.gender}`);
      this.getStudentsByNameGender(param);
    });

    // 订阅过滤事件
    this.boeService.filterObservable.subscribe((param) => {
      console.log(`${param.name} + ' / ' ${param.code}`);
      this.filterCondition = param;
      this.filterStudents();
    });
  }

  filterStudents() {
    if (this.filterCondition === undefined || this.filterCondition.code === 1) {
      this.students = this.studentsBackup;
    } else if (this.filterCondition.code === 2) {
      this.students = this.studentsBackup.filter((item) => item.age > 18);
    } else if (this.filterCondition.code === 3) {
      this.students = this.studentsBackup.filter((item) => item.age <= 18);
    }
  }

  getStudentsByNameGender(param: SearchParam) {
    this.boeService
      .getStudentsByNameGender(param)
      // .pipe(
      //   // Filter
      //   map((data) => data.filter((item) => item.age > 18))
      // )
      .subscribe(
        (data) => {
          this.students = data;
          this.studentsBackup = data;
          this.filterStudents();
          console.log(data);
        },
        (error) => {
          console.log('ERROR: ' + JSON.stringify(error));
        }
      );
  }

  getAllStudents(param: SearchParam) {
    this.boeService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
        console.log(data);
      },
      (error) => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }
}
