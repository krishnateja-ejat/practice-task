import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HTTPTestService} from "../service";
import { HomeComponent } from '../home/home.component';
import {Course} from "../course_service";
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers:[HTTPTestService,HomeComponent,Course],

})

export class StudentComponent  {
  public student_arr=[]
 public firse_name:string;
 public last_name:string;
 public s_mail:string;
 public s_password:string;
  constructor(private router: Router,public send :HomeComponent,localStorageService: LocalStorageService,public service:Course) {

  }
  add_student()
  {
    let data={
      "firse_name":this.firse_name,
      "last_name":this.last_name,
      "s_mail":this.s_mail,
      "s_password":this.s_password

    }
    alert(this.firse_name+" "+this.last_name+"You are Successfully Registered please Enroll")
    this.firse_name="";
    this.last_name="";
    this.s_mail="";
    this.s_password="";
    this.student_arr.push(data)
    localStorage.setItem("student_data", JSON.stringify(this.student_arr));


  }
  send_data()
  {
    this.router.navigateByUrl('/home');
  }
}

