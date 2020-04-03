import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// Car interface
import { Car } from "./list/list.component";

@Injectable({ providedIn: "root" })
export class CarServiceService {
  constructor(private http: HttpClient) {}

  getCarsSmall() {
    return this.http
      .get("../assets/car.json")
      .toPromise()
      .then(res => {
        return <Car[]>res; // type casting
      })
      .then(data => {
        return data;
      });
    // .catch(e => console.log('Get error', e));
  }
}
