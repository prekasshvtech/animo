import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { RoutinitComponent } from './routinit/routinit.component';
import { AdminComponent } from './admin/admin.component';
import { SurveyComponent } from './survey/survey.component';
import { TabsModule } from 'ngx-tabs';

@NgModule({
  declarations: [
    AppComponent,
    RoutinitComponent,
    AdminComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [RoutinitComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }
