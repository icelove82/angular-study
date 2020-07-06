import { Component, OnInit } from '@angular/core';

import { map, filter } from 'rxjs/operators';
import { BoeService } from './../boe.service';
import { SearchParam } from './../model/searchParam';
import { Student } from './../model/student';
import { AdultRadio } from './../model/adultRadio';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  // 学生数据
  students: Student[];
  studentsBackup: Student[];

  // 搜索条件
  searchKey: SearchParam;

  // 过滤条件
  filterCondition: AdultRadio;

  // 右键菜单
  items: MenuItem[];
  selectedStudent: Student;

  // 弹窗
  genderList = [
    { name: '男', code: 'M' },
    { name: '女', code: 'F' },
  ];

  displayDialog = false;
  title = '新建';
  mode = 1;
  targetStudent: Student = new Student();
  targetGender = this.genderList[0];

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

    // 初始化右键菜单
    this.items = [
      {
        label: '新建',
        icon: 'pi pi-search-plus',
        command: (event) => {
          this.openPopupWindow(1, null);
        },
      },
      {
        label: '修改',
        icon: 'pi pi-pencil',
        command: (event) => {
          this.openPopupWindow(2, this.selectedStudent);
        },
      },
      {
        label: '删除',
        icon: 'pi pi-trash',
        command: (event) => {
          this.deleteStudent(this.selectedStudent);
        },
      },
    ];
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

  openPopupWindow(mode: number, target: Student) {
    this.mode = mode;
    if (mode === 1) {
      this.title = '新建';
      this.targetStudent = new Student();
    } else {
      this.title = '修改';
      this.targetStudent = Object.assign({}, target);
      this.targetGender =
        this.targetStudent.gender === 'M'
          ? this.genderList[0]
          : this.genderList[1];
    }

    this.displayDialog = true;
  }

  onClickSave() {
    this.targetStudent.gender = this.targetGender.code;
    this.boeService.saveStudents([this.targetStudent]).subscribe(
      (data) => {
        alert(`成功保存${data}条数据！`);
        this.displayDialog = false;
        this.getStudentsByNameGender(this.searchKey);
      },
      (error) => {
        alert(`保存失败${error}`);
      }
    );
  }

  onClickDelete() {
    if (this.mode === 2) {
      this.boeService.deleteStudent(this.targetStudent).subscribe(
        (complete) => {
          alert(`学生 ${this.targetStudent.name} 删除成功`);
          this.displayDialog = false;
          this.getStudentsByNameGender(this.searchKey);
        },
        (error) => {
          alert('删除失败');
        }
      );
    }
  }

  deleteStudent(target: Student) {
    this.boeService.deleteStudent(target).subscribe(
      (complete) => {
        alert(`学生 ${target.name} 删除成功`);
        this.displayDialog = false;
        this.getStudentsByNameGender(this.searchKey);
      },
      (error) => {
        alert('删除失败');
      }
    );
  }

  getStudentsByNameGender(param: SearchParam) {
    this.searchKey = param;
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
