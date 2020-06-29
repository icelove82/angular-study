import { Component, OnInit } from '@angular/core';

import { BoeService } from './../boe.service';
import { SearchParam } from './../model/searchParam';
import { Student } from './../model/student';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // 学生数据
  students: Student[];

  constructor(private boeService: BoeService) {}

  ngOnInit(): void {
    this.boeService.searchObservable.subscribe((param) => {
      console.log(`${param.name} + ' / ' ${param.gender}`);
      this.getStudentsByNameGender(param);
    });
  }

  getStudentsByNameGender(param: SearchParam) {
    this.boeService.getStudentsByNameGender(param).subscribe(
      (data) => {
        this.students = data;
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
