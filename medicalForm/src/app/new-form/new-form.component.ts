import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { SignCanvasComponent } from '../sign-canvas/sign-canvas.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MedicalFormService } from '../services/medical-form.service';
import { saveAs } from "file-saver";
import { formatNumber } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {

  idConfirmList = ['Sentinal Card', 'Driving Licence', 'Passport', 'Company ID', 'Other'];
  yesNo = ['Yes', 'No']
  satisfactory = ['Satisfactory', 'Not Satisfactory']
  normality = ['Normal', 'Abnormal']
  urinanalysis = ['NAD', '+', '++', '+++']
  ifYes = ['Blood Pressure', 'Smoking', 'Alcohol', 'BMI', 'Hearing']
  bpArray = [{
    id: 0,
    value: 'Full pass providing Asymptomatic',
    checked: null
  },
  {
    id: 1,
    value: 'Full pass with advice',
    checked: null
  },
  {
    id: 2,
    value: 'Full pass providing Asymptomatic',
    checked: null
  },
  {
    id: 3,
    value: 'Fail & referral to GP',
    checked: null
  }]

  pulseList;
  heightList;
  weightList;
  distanceVisionList;
  platesList;
  hearingList;
  showSpecifyOthers: boolean = false;
  bmi: any;
  selectedIndex = -1
  showAdviceYes: boolean;
  showlettersIssuedYes: boolean;
  lear500: any;
  lear1000: any;
  lear2000: any;
  learTotal: any;
  rear500: any;
  rear1000: any;
  rear2000: any;
  rearTotal: number;
  examinarSign;
  checkedBy: any;
  secondTestChecked: boolean = true;
  secondTestDisabled: boolean = false;
  submitDisabled: boolean = true;
  showSecondOption: boolean = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog, public _medicalFormService: MedicalFormService) {
    this.pulseList = this.generateRange(40, 180)
    this.heightList = this.generateRange(120, 200)
    this.weightList = this.generateRange(30, 200)
    this.distanceVisionList = this.generateRange(0, 60)
    this.platesList = this.generateRange(0, 21)
    this.hearingList = this.generateHearingRange(-10, 80)
  }

  ngOnInit() {

    this.generalHealth.disable();
    this.visionAssessment.disable();
    this.hearingGrp.disable();
    this.fitnessGrp.disable();
    this.medicalAssess.disable();

  }

  onValueChange() {
    console.log('Function Calling', this.form1.value);

    let formValue = this.form1.value;

    if (formValue.name && formValue.idConfirmed && formValue.idConfirmed.length && formValue.dob) {
      console.log('Inside If');
      this.submitDisabled = false;
      this.generalHealth.enable();
      this.visionAssessment.enable();
      this.hearingGrp.enable();
      this.fitnessGrp.enable();
      this.medicalAssess.enable();
    } else {
      console.log('Inside Else');
      this.submitDisabled = true;
      this.generalHealth.disable();
      this.visionAssessment.disable();
      this.hearingGrp.disable();
      this.fitnessGrp.disable();
      this.medicalAssess.disable();

    }
  }


  form1 = new FormGroup({
    name: new FormControl(''),
    idConfirmed: new FormControl(''),
    idConfirmOther: new FormControl(''),
    dob: new FormControl(''),
    currentSenCard: new FormControl(''),
    natInstNo: new FormControl(''),
    sentinalNo: new FormControl('')
    // body: new FormControl('')
  });

  generalHealth = new FormGroup({
    bp1: new FormControl('', Validators.pattern("^[0-9 /]+$")),
    pulse1: new FormControl(''),
    bp2: new FormControl('', Validators.pattern("^[0-9 /]+$")),
    pulse2: new FormControl(''),
    bp3: new FormControl('', Validators.pattern("^[0-9 /]+$")),
    pulse3: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    bmi: new FormControl(''),
    mobility: new FormControl(''),
    fitness: new FormControl(''),
    pulseRhythm: new FormControl(''),
    glucose: new FormControl(''),
    protein: new FormControl(''),
    bpCheckBox: new FormControl(''),
    balanceNMobility: new FormControl(''),
    alertnessNwellbeing: new FormControl(''),
    speech: new FormControl(''),
    adviceGiven: new FormControl(''),
    lettersIssued: new FormControl(''),
    adviceGivenYes: new FormControl(''),
    lettersIssuedYes: new FormControl('')
  })

  visionAssessment = new FormGroup({
    dvlUnaided: new FormControl(''),
    dvrUnaided: new FormControl(''),
    dvlCorrected: new FormControl(''),
    dvrCorrected: new FormControl(''),
    glassesWorn: new FormControl(''),
    lensesWorn: new FormControl(''),
    visualFields: new FormControl(''),
    colorVision: new FormControl(''),
    plates: new FormControl('')
  })



  hearingGrp = new FormGroup({
    leftEar500: new FormControl(''),
    leftEar1000: new FormControl(''),
    leftEar2000: new FormControl(''),
    leftEar3000: new FormControl(''),
    leftEar4000: new FormControl(''),
    leftEar6000: new FormControl(''),
    leftEar8000: new FormControl(''),
    rightEar500: new FormControl(''),
    rightEar1000: new FormControl(''),
    rightEar2000: new FormControl(''),
    rightEar3000: new FormControl(''),
    rightEar4000: new FormControl(''),
    rightEar6000: new FormControl(''),
    rightEar8000: new FormControl(''),
    earWax: new FormControl(''),
    leTotal: new FormControl(''),
    reTotal: new FormControl('')
  })



  fitnessGrp = new FormGroup({
    addInfo: new FormControl(''),
    generalHealth: new FormControl(''),
    visual: new FormControl(''),
    colorVision: new FormControl(''),
    hearing: new FormControl(''),
    // leftEar500: new FormControl(''),
    // leftEar1000: new FormControl(''),
    // leftEar2000: new FormControl(''),
    // leftEar3000: new FormControl(''),
    // leftEar4000: new FormControl(''),
    // leftEar6000: new FormControl(''),
    // leftEar8000: new FormControl(''),
    // rightEar500: new FormControl(''),
    // rightEar1000: new FormControl(''),
    // rightEar2000: new FormControl(''),
    // rightEar3000: new FormControl(''),
    // rightEar4000: new FormControl(''),
    // rightEar6000: new FormControl(''),
    // rightEar8000: new FormControl(''),
    // earWax: new FormControl(''),
    // le500: new FormControl(''),
    // le1000: new FormControl(''),
    // le2000: new FormControl(''),
    // leTotal: new FormControl(''),
    // re500: new FormControl(''),
    // re1000: new FormControl(''),
    // re2000: new FormControl(''),
    // reTotal: new FormControl('')
  })

  medicalAssess = new FormGroup({
    fit: new FormControl(''),
    letterToGp: new FormControl(''),
    sixMonthCerti: new FormControl(''),
    referToOHPhysician: new FormControl(''),
    level: new FormControl(''),
    reason: new FormControl(''),
    examinerName: new FormControl(''),
    examinerDate: new FormControl(''),
    examinarSignature: new FormControl(''),
    checkedBy: new FormControl(''),
    checkedByDate: new FormControl(''),
    checkedSign: new FormControl(''),
    reasonForReferral: new FormControl('')
  })

  idChanged(event) {
    console.log("Id confirm changed", event)

    let temp = event.value.forEach(element => {
      if (element == 'Other') {
        console.log("element", element)
        this.showSpecifyOthers = true
      }
    });
  }

  checkboxChange(event) {
    if (event.checked == true) {
      this.secondTestDisabled = false;
    } else {
      this.secondTestDisabled = true;
    }
    console.log('secondTestDisabled===>', this.secondTestDisabled);
  }
  onCheckboxChange(e) {
    // const checkArray: FormArray = this.generalHealth.get('bpCheckBox') as FormArray;

    // if (e.target.checked) {
    //   checkArray.push(new FormControl(e.target.value));
    // } else {
    //   let i: number = 0;
    //   checkArray.controls.forEach((item: FormControl) => {
    //     if (item.value == e.target.value) {
    //       checkArray.removeAt(i);
    //       return;
    //     }
    //     i++;
    //   });
    // }
    // console.log("const checkArray", checkArray)
  }
  fit(event) {
    console.log("ecent on fir check", event)
    if (event.target.checked) {
      this.medicalAssess.patchValue({
        fit: 'true'
      })
    }
    else {
      this.medicalAssess.patchValue({
        fit: ''
      })
    }
  }

  letterToGp(event) {
    console.log("ecent on fir check", event)
    if (event.target.checked) {
      this.medicalAssess.patchValue({
        letterToGp: 'true'
      })
    }
    else {
      this.medicalAssess.patchValue({
        letterToGp: ''
      })
    }
  }
  sixMonth(event) {
    console.log("ecent on fir check", event)
    if (event.target.checked) {
      this.medicalAssess.patchValue({
        sixMonthCerti: 'true'
      })
    }
    else {
      this.medicalAssess.patchValue({
        sixMonthCerti: ''
      })
    }
  }

  referToOH(event) {
    console.log("ecent on fir check", event)
    if (event.target.checked) {
      this.medicalAssess.patchValue({
        referToOHPhysician: 'true'
      })
    }
    else {
      this.medicalAssess.patchValue({
        referToOHPhysician: ''
      })
    }
  }


  bpBlurred(event) {

    console.log('event=====>', event);

    this.bpArray.forEach(el => {
      el.checked = null
    })
    console.log("BP", event.target.value)
    let temp = event.target.value.split('/')
    console.log("temp", temp, Number(temp[0]) >= 90)
    if (temp.length == 2) {
      if ((Number(temp[0]) >= 90 && Number(temp[0]) <= 140) && (Number(temp[1]) >= 60 && Number(temp[1] <= 90))) {
        console.log("!!!!!!!!!!!!")
        this.bpArray[0].checked = true
      }
      else if ((Number(temp[0]) >= 140 && Number(temp[0]) <= 160) && (Number(temp[1]) >= 90 && Number(temp[1] <= 95))) {
        this.bpArray[1].checked = true
        this.bpArray[2].checked = true
      }
      else if (Number(temp[0]) > 180 && Number(temp[1]) > 100) {
        this.bpArray[3].checked = true
      }
      this.generalHealth.patchValue({
        bpCheckBox: this.bpArray
      })
    }
  }

  checkBp() {
    console.log('Event Called', this.generalHealth.value);
    let healthForm = this.generalHealth.value;
    let temp = healthForm.bp1.split('/')

    if ((Number(temp[0]) > 160 && Number(temp[1]) > 95) && (Number(healthForm.pulse1) >= 60 && Number(healthForm.pulse1) <= 100)) {
      console.log('Inside range');
      this.showSecondOption = true;
      this.secondTestDisabled = false;
    } else {
      this.showSecondOption = false;
      this.secondTestDisabled = true;
    }
  }

  adviceGivenChanged(event) {
    console.log("adviceGivenChanged", event, this.generalHealth.value.adviceGiven)
    if (this.generalHealth.value.adviceGiven != '' && this.generalHealth.value.adviceGiven == 'Yes') {
      this.showAdviceYes = true
    }
    else {
      this.showAdviceYes = false
      this.generalHealth.patchValue({
        adviceGivenYes: ''
      })
    }
  }
  lettersIssuedChanged(event) {
    if (this.generalHealth.value.lettersIssued != '' && this.generalHealth.value.lettersIssued == 'Yes') {
      this.showlettersIssuedYes = true
    }
    else {
      this.showlettersIssuedYes = false
      this.generalHealth.patchValue({
        lettersIssuedYes: ''
      })
    }
  }

  calcBmi(event) {
    this.generalHealth.patchValue({
      mobility: "",
      fitness: ""
    })
    let h = this.generalHealth.value.height
    let w = this.generalHealth.value.weight
    if (h != '' && w != '') {
      this.bmi = (w / ((h / 100) * (h / 100))).toFixed(3)
      console.log("BMI", this.bmi)
      this.generalHealth.patchValue({
        bmi: this.bmi
      });
    }
  }
  leftEarChange(event, id) {
    console.log("EVENT", event, "id", id)
    if (id == 500) {
      this.lear500 = event.value
    }
    else if (id == 1000) {
      this.lear1000 = event.value
    }
    else if (id == 2000) {
      this.lear2000 = event.value
    }

    if (this.lear500 && this.lear1000 && this.lear2000) {
      this.learTotal = Number(this.lear500) + Number(this.lear1000) + Number(this.lear2000)
      this.hearingGrp.patchValue({
        leTotal: this.learTotal
      })
    }
  }
  rightEarChange(event, id) {
    console.log("EVENT", event, "id", id)
    if (id == 500) {
      this.rear500 = event.value
    }
    else if (id == 1000) {
      this.rear1000 = event.value
    }
    else if (id == 2000) {
      this.rear2000 = event.value
    }

    if (this.rear500 && this.rear1000 && this.rear2000) {
      this.rearTotal = Number(this.rear500) + Number(this.rear1000) + Number(this.rear2000)
      this.hearingGrp.patchValue({
        reTotal: this.rearTotal
      })
    }
  }

  generateRange(start, end) {
    return _.range(start, end + 1, 1)
  }

  generateHearingRange(start, end) {
    return _.range(start, end + 1, 5)
  }

  redirect(role) {
    // this.router.navigateByUrl('/signature')
    this.openDialog(SignCanvasComponent).subscribe(data => {
      console.log("data from signature", data)
      if (role == 'examinar') {
        this.examinarSign = data
        this.medicalAssess.patchValue({
          examinarSignature: this.examinarSign
        })
      }
      else {
        this.checkedBy = data
        this.medicalAssess.patchValue({
          checkedSign: this.checkedBy
        })
      }
    })
  }

  openDialog(someComponent, data = {}): Observable<any> {
    console.log("OPENDIALOG", "DATA = ", data);
    const dialogRef = this.dialog.open(someComponent, {
      data, maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
    return dialogRef.afterClosed();
  }
  private saveToFileSystem(response) {
    var byteArray = new Uint8Array(response.data);
    var blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, 'medical-consent');
    // this.loading = false;
  }

  submit() {
    let temp = this.form1.controls.idConfirmed.value
    if (temp) {
      temp.forEach(el => {
        if (el == "Sentinal Card") {
          this.form1.value['sCard'] = "Sentinal Card"
        } else if (el == 'Driving Licence') {
          this.form1.value['driving'] = "Driving Licence"
        } else if (el == 'Passport') {
          this.form1.value['passport'] = "Passport"
        }
        else if (el == 'Company ID') {
          this.form1.value['cID'] = "Company ID"
        }
        else if (el == 'Other') {
          this.form1.value['other'] = "other"
        }
      })
    }
    let temp1 = this.generalHealth.controls.adviceGivenYes.value
    if (temp1) {
      temp1.forEach(el => {
        if (el == 'Blood Pressure') {
          this.generalHealth.value['bloodP'] = "Bloop Pressure"
        }
        else if (el == 'Smoking') {
          this.generalHealth.value['smokeIn'] = "Smoking"
        }
        else if (el == 'Alcohol') {
          this.generalHealth.value['alco'] = "Alcohol"
        }
        else if (el == 'BMI') {
          this.generalHealth.value['bmiYes'] = "BMI"
        }
        else if (el == 'Hearing') {
          this.generalHealth.value['hearing'] = "Hearing"
        }
      })
    }

    let temp2 = this.generalHealth.controls.lettersIssuedYes.value
    if (temp2) {
      temp2.forEach(el => {
        if (el == 'Blood Pressure') {
          this.generalHealth.value['bloodP1'] = "Bloop Pressure"
        }
        else if (el == 'Smoking') {
          this.generalHealth.value['smokeIn1'] = "Smoking"
        }
        else if (el == 'Alcohol') {
          this.generalHealth.value['alco1'] = "Alcohol"
        }
        else if (el == 'BMI') {
          this.generalHealth.value['bmiYes1'] = "BMI"
        }
        else if (el == 'Hearing') {
          this.generalHealth.value['hearing1'] = "Hearing"
        }
      })
    }
    let temp3 = this.medicalAssess.controls.level.value
    if (temp3 && temp3 == 'level1') {
      this.medicalAssess.value['level1'] = "level1"
    }
    else if (temp3 && temp3 == 'level3') {
      this.medicalAssess.value['level3'] = "level3"
    }

    let temp4 = this.generalHealth.controls.bpCheckBox.value
    if (temp4) {
      temp4.forEach(el => {
        if (el.id == 0 && el.checked == true) {
          this.generalHealth.value['bpCheck0'] = "true"
        }
        else if (el.id == 3 && el.checked == true) {
          this.generalHealth.value['bpCheck3'] = "true"
        }
        else {
          if (el.id == 2 && el.checked == true) {
            this.generalHealth.value['bpCheck2'] = "true"
          }
          if (el.id == 1 && el.checked == true) {
            this.generalHealth.value['bpCheck1'] = "true"
          }
        }
      })
    }
    let data = {
      form1: this.form1.value,
      generalHealth: this.generalHealth.value,
      vision: this.visionAssessment.value,
      hearing: this.hearingGrp.value,
      fitness: this.fitnessGrp.value,
      recom: this.medicalAssess.value
    }

    console.log("temp", temp, this.form1.value)



    this._medicalFormService.generatePdf(data).subscribe(res => {
      console.log("RES", res)
      this.saveToFileSystem(res);
    })
    let checked = $('input[name="checkButton"]:checked').val();
    console.log("checkedcheckedchecked", checked)
    // console.log("FORM", this.generalHealth)
    console.log("this.examinerSign", this.examinarSign)
    console.log("this.examinerSign", this.checkedBy)

    console.log("THe data is----------->>>>>>>>>>>>>>>", data)
  }

}
