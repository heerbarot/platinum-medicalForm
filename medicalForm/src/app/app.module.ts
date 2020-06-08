import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SignCanvasComponent } from './sign-canvas/sign-canvas.component';
import { NewFormComponent } from './new-form/new-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignCanvasComponent,
    NewFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatInputModule, MatButtonModule,
    MatFormFieldModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    SignaturePadModule
  ],
  entryComponents: [SignCanvasComponent],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
