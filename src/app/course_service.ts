/**
 * Created by sematic on 17/5/17.
 */
import {Injectable} from '@angular/core';
import {combineAll} from "rxjs/operator/combineAll";
import { Http,Response } from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()

export class Course
{
  temp;
  constructor(private http:Http)
  {}

  addCourse(Courses):any{
    this.temp=Courses;
  }


  set_Course():any{
    return this.temp
      .map(res=>res.json());
  }


}


