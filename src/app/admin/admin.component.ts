import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";
import {Course} from "../course_service";
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[Course]

})

export class AdminComponent  {
  public course_arr=[];
  course_name:string;
  duration:string;
  noOfDays:number;
  fee:number;
  timeSlot:string;
  noOfStudents;
  Coach:string;
  availableSlots:string;
  courseDescription: string;


  constructor(private router: Router,private service:Course,private localStorageService: LocalStorageService) {

  }

  tab() {
     let obj=
      {
        "course_name": this.course_name,
        "description":this.courseDescription,
        "noOfDays": this.noOfDays,
        "duration": this.duration,
        "Coach": this.Coach,
        "fee": this.fee,
        "timeSlot": this.timeSlot,
        "noOfStudents": this.noOfStudents,
        "availableSlots": this.availableSlots

      }
    this.course_arr.push(obj);
     let Courses=this.course_arr;

    localStorage.setItem("test", JSON.stringify(Courses));
    (<HTMLInputElement> document.getElementById("btnExcel")).disabled = false;
     this.clear();


  }

  clear()
  {
    this.course_name="";
    this.courseDescription="";
    this.noOfDays=null;
    this.duration="";
    this.Coach="";
    this.fee=null;
    this.timeSlot="";
    this.noOfStudents="";
    this.availableSlots="";
  }
  add()
  {
    this.router.navigateByUrl('/home')
  }
}
