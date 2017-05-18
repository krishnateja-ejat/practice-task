import {Component} from '@angular/core';
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
  public enrolled_person_fname;
  public  enrolled_person_lname;
  public  enrolled_person_mail;
  data;
  enrolled_course_values=[];
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
  dub=0
  public change_students;
  constructor(private router: Router,public _httpService:HTTPTestService,public route: ActivatedRoute,public data_course:Course,private localStorageService: LocalStorageService) {
    this._httpService.getjsondata()
      .subscribe(data => this.data = data,
        error=>alert(error),
        ()=>console.log(this.data)
      );
    let c=localStorage.getItem("test");

    this.course_data = JSON.parse(c);
    console.log("course_data");
    console.log(this.course_data);

    ////////////////////////////////////Code For Student Count///////////////////////
    for(let i=0;i<this.course_data.length;i++){
      for(let j=0;j<3;j++){
        if(this.course_data[i].timeSlot === "1Pm"){
          this.course_data[i].noOfStudents = this.course_data[i].tim["1Pm"];
        }else if(this.course_data[i].timeSlot === "4Pm"){
          this.course_data[i].noOfStudents = this.course_data[i].tim["4Pm"];
        }else if(this.course_data[i].timeSlot === "8Am"){
          this.course_data[i].noOfStudents = this.course_data[i].tim["8Am"];
        }
      }
    }
    /////////////////////////////////////////////////////////////////////////////////
    this.change_students = this.course_data;
    ///Student Local Storage
    let std_data=localStorage.getItem("student_data");
    this.course_arr=JSON.parse(std_data);

  }


  data_from_student(value:any)
  {
    this.data_std_component=value;
    console.log(this.data_std_component)

  }
  s=true;
  check()
  {
    if(this.h_person=="admin")
    {
      if(this.data.email===this.h_mail&&this.data.password===this.h_password)
      {
        this.router.navigateByUrl('/admin');
        this.rest();
      }
      else
      {
        alert("you are not admin please select student for enrolment");
      }
    }
    else if(this.h_person=="student")
    {
     console.log(this.course_arr)
      for(let i=0;i<this.course_arr.length;i++)
      {
        if(this.h_mail=this.course_arr[i].s_mail&&this.h_password===this.course_arr[i].s_password)
        {

          this.enrolled_person_fname=this.course_arr[i].firse_name;
          this.enrolled_person_lname=this.course_arr[i].last_name;
          this.enrolled_person_mail=this.course_arr[i].s_mail;
          this.flag=1;
        }

      }
      this.rest();

    }
  }
  rest=()=>
  {
    this.h_mail="";
    this.h_password="";
  };
  add()
  {
    this.router.navigateByUrl('/student');
  }
  enrolled_course={};




  enrol(index,f)
  {
  alert(index)
    if(f==1)
    {

       let val=this.check_log(this.enrolled_course_values,this.enrolled_person_mail,this.course_data[index].course_name)

      if(val==false)
      {
        for(let i=0;i< this.course_data.length;i++)
        {
          if(index===i && this.course_data[i].noOfStudents >= 0)
          {
            this.enrolled_course=
              {

                "Student_fname":this.enrolled_person_fname,
                "Student_lname":this.enrolled_person_lname,
                "Student_mail":this.enrolled_person_mail,
                "course_name": this.course_data[i].course_name,
                "description":this.course_data[i].description,
                "noOfDays": this.course_data[i].noOfDays,
                "duration": this.course_data[i].duration,
                "Coach": this.course_data[i].Coach,
                "fee": this.course_data[i].fee,
                "timeSlot":this.course_data[i].timeSlot,

              }
            let count = this.course_data[i].noOfStudents;
            count = count-1;

            this.course_data[i].noOfStudents = count;

          }

        }
        this.enrolled_course_values.push(this.enrolled_course)
      }
      else
      {
        alert("you are Already Enrolled")
      }
    }
    else {
      alert("Please Login as a Student");
    }

  }
  check_log(course_data,loged_person,course)
  {
    let flag1 =0;
    for(let i=0;i<course_data.length;i++)
    {

      console.log("hi")
      console.log(course_data[i].Student_mail+' '+loged_person);
      console.log(course_data[i].course_name+' '+course);

      console.log("hi")
      if(course_data[i].Student_mail===loged_person && course_data[i].course_name===course )
      {
        flag1 = 1;
      }


    }
    if(flag1 === 1){
      return true;
    }else{
     return false
    }

  }

}

