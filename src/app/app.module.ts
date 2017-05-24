import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {routes} from './app.router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import {DataTableModule} from "angular2-datatable";
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import {PopupModule} from 'ng2-opd-popup';
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
    }),
    ReactiveFormsModule,
    CustomFormsModule,
    PopupModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
