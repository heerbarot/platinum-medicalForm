import {tick, fakeAsync , async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NgModule , DebugElement } from '@angular/core';
import { AbstractControl , FormGroup , FormsModule , FormBuilder  , ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By , BrowserModule }  from '@angular/platform-browser';
import { MatButtonModule, MatCheckboxModule , MatSelectModule, MatDatepickerModule , MatOptionModule,MatFormFieldModule, MatInputModule, MatRippleModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { OldFormComponent } from './../old-form/old-form.component'

import 'jquery';

declare let $ : any;

import { NewFormComponent } from './new-form.component';

describe('NewFormComponent', () => {
  let component: NewFormComponent;
  let fixture: ComponentFixture<NewFormComponent>;
  let name
  let idConfirmed
  let idConfirmOther
  let form1: FormGroup;
  let nameFormControl : AbstractControl;
  let idConfirmedFormControl : AbstractControl;
  let idConfirmOtherFormControl: AbortController;
  let showSpecifyOthers

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFormComponent, OldFormComponent ],
      imports: [ 
        HttpClientModule,
        FormsModule, 
        BrowserModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatRadioModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    name = fixture.debugElement.query(By.css('#name')).nativeElement ;
    idConfirmed = fixture.debugElement.query(By.css('#idConfirmed')).nativeElement ;
    // idConfirmOther = fixture.debugElement.query(By.css('#idConfirmOther')).nativeElement ;


    // showSpecifyOthers = true
    
    form1 = component.form1;
    nameFormControl = form1.controls['name'];
    idConfirmedFormControl = form1.controls['idConfirmed'];
    // idConfirmOtherFormControl = form1.controls['idConfirmOther'];


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('accordian New open', () => {
    $('#accordianNew').trigger('click');
    // // $('.menu-icon-link').trigger('click');
    // expect($('#collapse').is(':block')).toBe(true);
    // var accordion = element(by.id('accordianNew'));
    // expect(accordion.isPresent()).toBeTruthy();

    // // When
    // accordion.click();

    // // Then
    // expect(accordion.isPresent()).toBeFalsy();
    // expect($('#accordion-expand')).isPresent()).toBeTruthy();  
    // // expect(component).toBeTruthy();
  });

  // it('should create new from form1', () => {
    
  //      const developers = 
  //       { 
  //           "name" : "Yash Shukla", 
  //           "idConfirmed" : "Sentinel Card", 
  //           "idConfirmOther" : "yash8866621972",
  //       };

  //       fixture.whenStable().then(() => {
  //           //act
  //           $('#accordianNew').trigger('click');

  //           name.value = developers.name;
  //           name.dispatchEvent(new Event("input"));

  //           // idConfirmed.value = developers.idConfirmed;
  //           // idConfirmed.dispatchEvent(new Event("mat-select"));

  //           // idConfirmOther.value = developers.idConfirmOther;
  //           // idConfirmOther.dispatchEvent(new Event("input"));
            
  //           fixture.detectChanges();

  //           console.log("integrated =========>" , component.form1.value);
  //           expect(nameFormControl.hasError('required')).toBe(false);
  //           expect(nameFormControl.valid).toBe(true);
            
  //           // expect(idConfirmedFormControl.hasError('required')).toBe(false);
  //           // expect(idConfirmedFormControl.valid).toBe(true);

  //       });    

  // });
});
