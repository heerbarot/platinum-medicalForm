import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '../app/form/form.component'
import { SignCanvasComponent } from '../app/sign-canvas/sign-canvas.component'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
