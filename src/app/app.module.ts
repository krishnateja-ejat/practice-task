import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routes} from './app.router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import {DataTableModule} from "angular2-datatable";
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    DataTableModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
