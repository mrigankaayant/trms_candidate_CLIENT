import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.componet';
import { AppRoutingModule } from './app.routing'
import { AuthRoutingModule } from './auth/auth.router';
import { LoaderService } from './util/loader.service';
import { HttpService } from '../app/util/http.service';

 
import {
  EditorModule,InputTextModule, ButtonModule, InputMaskModule, RadioButtonModule, CalendarModule, FileUploadModule,
  PanelModule, FieldsetModule, DropdownModule, SelectItem, CheckboxModule, InputTextareaModule,
  DataTableModule, SharedModule, LazyLoadEvent, MenubarModule, MenuItem, TabMenuModule, AutoCompleteModule, TabViewModule,
  Message, SplitButtonModule,ContextMenuModule,DialogModule,SidebarModule
} from 'primeng/primeng';
@NgModule({
  imports: [EditorModule,BrowserModule, FormsModule, InputTextModule, ButtonModule, PanelModule,
    InputMaskModule, RadioButtonModule, CalendarModule,ContextMenuModule,DialogModule,
    PanelModule, FieldsetModule, DropdownModule, CheckboxModule, InputTextareaModule,
    FileUploadModule, MenubarModule, TabMenuModule,
    DataTableModule, SharedModule, HttpModule, ReactiveFormsModule, AutoCompleteModule, TabViewModule,
    SplitButtonModule, AppRoutingModule, BrowserAnimationsModule, AuthRoutingModule,SidebarModule
  ],
  declarations: [AppComponent,HomeComponent],
  providers: [LoaderService,HttpService],

  bootstrap: [AppComponent]
})
export class AppModule { }