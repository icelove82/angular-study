import { Component, OnInit } from "@angular/core";
import { fromEvent } from "rxjs";
import { BoeService } from './../boe.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {

  constructor(private boeService: BoeService) {

  }

  ngOnInit(): void {

    fromEvent(document.getElementById('search_btn'), 'click').subscribe( it => {
      this.getAllStudents();
    });
  }

  getAllStudents() {
    this.boeService.getAllStudents().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }

}
