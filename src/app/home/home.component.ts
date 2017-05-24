import {Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {HTTPTestService} from "../service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../course_service";
import { LocalStorageService } from 'angular-2-local-storage';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Popup} from 'ng2-opd-popup';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HTTPTestService,Course,FormBuilder]


})

export class HomeComponent implements OnInit{
  //Varibles for getting data from Admin Page

  loginform:FormGroup;
  public enrolled_person_fname;
  public  enrolled_person_lname;
  public  enrolled_person_mail;
  data;
  enrolled_course_values=[];
  data_std_component=[];
  public course_arr=[];
  public course_data;
  public static sample_arr;
  public h_name;
  public h_mail;
  public h_password;
  public h_person;
  myForm: FormGroup;
 // public static data_course:Course;
  cours
  flag=0;
  dub=0
  public change_students;
  constructor(public popup:Popup ,private form:FormBuilder,private router: Router,public _httpService:HTTPTestService,public route: ActivatedRoute,private localStorageService: LocalStorageService,public s:Course)
  {
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
    console.log("dssd"+std_data)
  }
  @ViewChild('popup4') popup4:Popup;
  ngOnInit()
  {
    this.myForm = this.form.group({
      h_person:['',Validators.required],
      h_mail: ['', Validators.required],
      h_password: ['', Validators.required]
    });


  }





  check=():void=>
  {


    if(this.myForm.value.h_person=="admin")
    {
      if(this.data.email===this.myForm.value.h_mail&&this.data.password===this.myForm.value.h_password)
      {
        this.router.navigateByUrl('/admin');
        this.myForm.reset();
      }
      else
      {
        alert("Please check your Id & Password Admin");
        this.myForm.reset();
      }
    }
    else if(this.myForm.value.h_person=="student")
    {
      let temp=0
      for(let i=0;i<this.course_arr.length;i++)
      {

        if(this.myForm.value.h_mail===this.course_arr[i].s_mail&&this.myForm.value.h_password===this.course_arr[i].s_password)
        {
          temp=1;
        }
        if(temp==1)
        {

          this.enrolled_person_fname=this.course_arr[i].firse_name;
          this.enrolled_person_lname=this.course_arr[i].last_name;
          this.enrolled_person_mail=this.course_arr[i].s_mail;
          alert(this.enrolled_person_fname+" " +this.enrolled_person_lname+"Successfully Logged in");
          this.flag=1;
          this.myForm.reset();
          break;
        }
      }
      if(temp==0)
      {

        alert("!!!!Sorry Please Check Your Login & Password");
        this.myForm.reset();
      }
    }

  }

  add=():void=>
  {
    this.router.navigateByUrl('/student');
  }
  enrolled_course={};




  enrol=(index,f):void=>
  {
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
  check_log=(course_data,loged_person,course):boolean=>
  {
    let flag1 =0;
    for(let i=0;i<course_data.length;i++)
    {
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
  showPopup4=()=>{
    alert("yyyy")
    this.popup4.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-default",
      color: "#60B95D",
      header: "Like for this Post",   // this method is used to show the popup for likes by whom.
      widthProsentage:35,
      cancleBtnContent:"Cancel",
      animation: "bounceIn"};
    this.popup4.show(this.popup4.options);
  }



}

