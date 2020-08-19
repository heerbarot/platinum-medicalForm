import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';

import { OldFormComponent } from './old-form.component';
import { MedicalFormService } from '../services/medical-form.service';
import { FormsModule, AbstractControl  } from '@angular/forms';
// import { MatButtonHarness } from '@angular/material/button/testing';


describe('OldFormComponent', () => {
  let component: OldFormComponent;
  let fixture: ComponentFixture<OldFormComponent>;
  let MedicalFormService: MedicalFormService;
  let router: Router;
  let surName;
  let firstName;
  let nextButton;
  let firstNameFormControl: AbstractControl;
  let surNameFormControl: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldFormComponent ],
      imports: [FormsModule],
      providers: [ MedicalFormService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MedicalFormService = TestBed.get(MedicalFormService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();

    console.log(" fixture ", fixture)
    
  });

  // it('should create', () => {
  //   console.log(" Yash Check this")
  //   expect(component).toBeTruthy();
  // });

    // it(`must test the proper validation of the add details field` , async() => {
    //     const developers = 
    //     { 
    //         "firstName" : "Yash", 
    //         "surName" : "Shukla", 
    //     };
       
    //     fixture
    //     .whenStable()
    //     .then(() => {
    //         //act
    //         firstName.value = developers.firstName;
    //         firstName.dispatchEvent(new Event("input"));

    //         surName.value = developers.surName;
    //         surName.dispatchEvent(new Event("input"));
            
    //         fixture.detectChanges();

    //         //assert

    //         console.log("integrated =========>" , component);
    //         expect(firstNameFormControl.hasError('required')).toBe(false);
    //         expect(firstNameFormControl.valid).toBe(true);
            
    //         expect(surNameFormControl.hasError('required')).toBe(false);
    //         expect(surNameFormControl.valid).toBe(true);    
    //     })
    //     .catch((error)=>{
    //       console.log(" ERROR :::" , error)
    //     })
    // });


});
