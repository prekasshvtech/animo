import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';


const routes: Routes = [
  {path:'', component: AppComponent},
  {path: 'main', component: AppComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'survey', component: SurveyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
