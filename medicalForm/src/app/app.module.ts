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
import { OldFormComponent } from './old-form/old-form.component';


import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
import { DatePickerComponent } from './date-picker/date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    SignCanvasComponent,
    NewFormComponent,
    OldFormComponent,
    DatePickerComponent
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
    MatMomentDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    SignaturePadModule
  ],
  entryComponents: [SignCanvasComponent],
  providers: [MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
