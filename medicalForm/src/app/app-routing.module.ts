import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignCanvasComponent } from '../app/sign-canvas/sign-canvas.component'
import { DatePickerComponent } from '../app/date-picker/date-picker.component';
import { NewFormComponent } from '../app/new-form/new-form.component'
import { from } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewFormComponent
  },
  {
    path: 'signature',
    component: SignCanvasComponent
  },
  {
    path: 'date-picker',
    component: DatePickerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
