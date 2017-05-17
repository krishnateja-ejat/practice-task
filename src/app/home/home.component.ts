import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {HTTPTestService} from "../service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../course_service";
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HTTPTestService,Course],


})

export class HomeComponent {
  //Varibles for getting data from Admin Page
  public enrolled_person
  data;
  course_values;
  data_std_component=[];
  public course_arr=[];
  public course_data;
  public sample_arr=[];
  public h_name;
  public h_mail;
  public h_password;
  public h_person
  cours
  flag=0;
  constructor(private router: Router,public _httpService:HTTPTestService,public route: ActivatedRoute,public data_course:Course,private localStorageService: LocalStorageService) {
    this._httpService.getjsondata()
      .subscribe(data => this.data = data,
        error=>alert(error),
        ()=>console.log(this.data)
      );
    let c=localStorage.getItem("test");
    this.course_data = JSON.parse(c);
    ///Student Local Storage
    let std_data=localStorage.getItem("student_data");
    this.course_arr=JSON.parse(std_data);
  }


  data_from_student(value:any)
  {
    alert("sadsa")
    this.data_std_component=value;
    console.log(this.data_std_component)

  }

     admin={
    name:"",
    email:"",
    password:""
  }
  login_person;
  login_fname="";
  login_lname="";
  s=true;
  check()
  {
    let name=(<HTMLInputElement>document.getElementById('name')).value
    let mail=(<HTMLInputElement>document.getElementById('email')).value
    let password=(<HTMLInputElement>document.getElementById('password')).value
    let person=(<HTMLInputElement>document.getElementById('select')).value
    this.admin.name=name;
    this.admin.email=mail;
    this.admin.password=password;
    this.rest();
    let tep=0;
    if(person=="admin")
    {
      //console.log(this.data)
      if(this.data.email===this.admin.email&&this.data.password===this.admin.password)
      {
        this.router.navigateByUrl('/admin');

      }
      else
      {
        alert("you are not admin please select student for enrolment");
        (<HTMLInputElement> document.getElementById("dtaTable")).disabled = false;

      }
    }
    else if(person=="student")
    {
      alert(this.course_arr.length)
      for(let i=0;i<this.course_arr.length;i++)
      {
        alert("in for");
        if(mail==this.course_arr[i].s_mail&&password===this.course_arr[i].s_password)
        {
          alert(this.course_arr[i]);
          this.enrolled_person=this.course_arr[i];
          (<HTMLInputElement> document.getElementById("btnTable")).disabled = false;
        }
      }
      //this.router.navigateByUrl('/student');
    }
  }
  rest=()=>
  {
    (<HTMLInputElement>document.getElementById('name')).value="";
    (<HTMLInputElement>document.getElementById('email')).value="";
    (<HTMLInputElement>document.getElementById('password')).value="";
    (<HTMLInputElement>document.getElementById('select')).value="";
  };
  add()
  {
    this.router.navigateByUrl('/student');
  }

  enrol(index)
  {
    for(let i=0;i<this.course_arr.length;i++)
    {

    }
  }
}

