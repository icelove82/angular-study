import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { student } from './model/student';
import { searchParam } from './model/searchParam';

@Injectable({
  providedIn: 'root'
})
export class BoeService {

  // Domain
  BoeServiceDomain = "http://localhost:8080";

  // By Name & Gender data service url
  SearchData = "/boe/students";

  // All data service url
  AllData = "/boe/all";

  // Data
  studentData: student[];

  // Do search event observable
  private searchSource = new Subject<searchParam>();
  searchObservable = this.searchSource.asObservable();

  constructor(private http: HttpClient) {
  }

  // Do search
  doSearch(param: searchParam) {
    this.searchSource.next(param);
  }

  // 按照名字和性别查询学生信息
  getStudentsByNameGender(param: searchParam): Observable<student[]> {

    let params = new HttpParams();
    params = params.set('NAME', param.name);
    params = params.set('GENDER', param.gender);

    return this.http.get<student[]>(this.BoeServiceDomain + this.SearchData, { params });
  }

  // 获取全部学生信息
  getAllStudents(): Observable<student[]> {
    return this.http.get<student[]>(this.BoeServiceDomain + this.AllData);
 }
}
