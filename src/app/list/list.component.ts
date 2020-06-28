import { Component, OnInit } from "@angular/core";

import { BoeService } from './../boe.service';
import { searchParam } from './../model/searchParam';
import { student } from './../model/student';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {

  // 学生数据
  students: student[];

  constructor(private boeService: BoeService) {

  }

  ngOnInit(): void {

    this.boeService.searchObservable.subscribe(param => {
      console.log(`${param.name} + ' / ' ${param.gender}`);
      this.getStudentsByNameGender(param);
    });
  }

  getStudentsByNameGender(param: searchParam) {
    this.boeService.getStudentsByNameGender(param)
    .subscribe(
      data => {
        this.students = data;
        console.log(data);
      },
      error => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }

  getAllStudents(param: searchParam) {
    this.boeService.getAllStudents()
    .subscribe(
      data => {
        this.students = data;
        console.log(data);
      },
      error => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }

}
