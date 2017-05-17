/**
 * Created by sematic on 16/5/17.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminComponent} from '../app/admin/admin.component'
import {StudentComponent} from '../app/student/student.component';
import {HomeComponent} from '../app/home/home.component';

export const router:Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'admin', component:AdminComponent},
  {path:'student',component:StudentComponent}
];
export const routes:ModuleWithProviders=RouterModule.forRoot(router);
