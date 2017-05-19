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
  public Courses=[];
  public Student=[];
  constructor(private http:Http)
  {}

 addCourse(Courses){
    this.Courses.push(Courses);
  }
  set_Course():any{
    return this.Courses

  }
  /*SetStudent(Student)
  {

    this.Student.push(Student);
  }
  getStudent():any
  {
    console.log(this.Student)
    return this.Student
  }*/

}


