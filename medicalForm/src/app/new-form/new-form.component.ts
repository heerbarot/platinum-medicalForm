import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { SignCanvasComponent } from '../sign-canvas/sign-canvas.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MedicalFormService } from '../services/medical-form.service';
import { saveAs } from "file-saver";
import { formatNumber } from '@angular/common';
import { OldFormComponent } from '../old-form/old-form.component'
declare var $: any;

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {
  addTextPastEarProblem: boolean = false
  addTextDeafnessFamily: boolean = false
  addTextSufferedHead: boolean = false
  addTextExposureGunfire: boolean = false
  addTextHadWax: boolean = false
  addTextEarDisease: boolean = false
  addTextSufferedInjury: boolean = false
  idConfirmList = ['Sentinel Card', 'Driving Licence', 'Passport', 'Company ID', 'Other'];
  noisyHobbiesList = ['Motor sports', 'Ride a motorcycle', 'DIY', 'Discos/loud music', 'Shooting', 'Other']
  yesNo = ['Yes', 'No']
  satisfactory = ['Satisfactory', 'Not Satisfactory']
  normality = ['Normal', 'Abnormal']
  urinanalysis = ['NAD', '+', '++', '+++']
  ifYes = ['Blood Pressure', 'Smoking', 'Alcohol', 'BMI', 'Hearing']
  leafletsIfYes = ['Blood Pressure', 'Smoking', 'Alcohol', 'BMI']
  strength = ['Good', 'Fair', 'Poor']
  betterWorse = ['BETTER', 'WORSE']
  types = ['Glass wool / earplugs', 'inserts / earmuffs']
  totalRightEar: Number;
  totalLeftEar: Number;
  bpArray = [
    {
      id: 0,
      value: 'Full pass providing asymptomatic, Fail and refer to GP if symptomatic',
      checked: null
    },
    {
      id: 1,
      value: 'Full pass',
      checked: null
    },
    {
      id: 2,
      value: 'Full pass with advice',
      checked: null
    },
    {
      id: 3,
      value: '6 Month Medical Certificate and referral to GP',
      checked: null
    },
    {
      id: 4,
      value: 'Fail & referral to GP',
      checked: null
    }
  ]
  doYouSuffer: boolean = false;
  pulseList;
  heightList;
  weightList;
  distanceVisionList;
  platesList;
  hearingList;
  showSpecifyOthers: boolean = false;
  letterToGpCheck: any;
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
  submitDisabled: boolean = true;
  showSecondOption: boolean = false;
  secondTestDisabled: boolean = true;
  thirdTestDisabled: boolean = true;
  showSecond: boolean;
  // showSecond: boolean;
  showThird: boolean;
  hideSecondForm;
  oldForm;
  loading;
  hideFirstForm;
  itemData: any;
  disableLevel: boolean;
  disableLevelConditions = [];
  isChecked: boolean;
  isChecked2: boolean;
  bpValidators = [Validators.pattern("^[0-9 /]+$")]
  bmiStairsDetails: boolean;
  bmiHillDetails: boolean;
  bmiWalkDetails: boolean;
  // bmiExerciseDetails: boolean;
  bmiBreathlessDetails: boolean;
  bmiHeadacheDetails: boolean;
  bmiSnoreDetails: boolean;
  bmiTiredDetails: boolean;
  bmiRefreshedDetails: boolean;
  leafletsSentYes;


  // To show aided and correct field based on glass worn selection
  isGlassWorn: boolean;
  showleafletsSentYes: boolean;
  isFailedReason: any;
  isFailed: any;
  constructor(private fb: FormBuilder, public dialog: MatDialog, public _medicalFormService: MedicalFormService) {
    this.pulseList = this.generateRange(40, 180)
    this.heightList = this.generateRange(120, 200)
    this.weightList = this.generateRange(30, 250)
    this.distanceVisionList = this.generateRange(0, 60)
    this.platesList = this.generateRange(0, 21)
    this.hearingList = this.generateHearingRange(-10, 80)
    localStorage.removeItem("formone");
  }


  ngOnInit() {

    // this.generalHealth.disable();
    // this.visionAssessment.disable();
    // this.hearingGrp.disable();
    // this.fitnessGrp.disable();
    // this.medicalAssess.disable();

    this.disableNewForm();

    if (localStorage.getItem("formone") !== null) {
      this.itemData = JSON.parse(localStorage.getItem("formone"));
      console.log('itemData======>', this.itemData);
      let name = this.itemData.medicalQuestionnaire.firstName + ' ' + this.itemData.medicalQuestionnaire.surName
      // this.form1.controls['name'].setValue(name);
      // this.form1.controls['dob'].setValue(this.itemData.medicalQuestionnaire.dob);
      this.oldForm = this.itemData;
      this.hideFirstForm = true;
      this.hideSecondForm = false;
      this.enableNewForm();
    } else {
      this.hideFirstForm = false;
      this.hideSecondForm = true;
    }

  }

  enableNewForm() {
    // this.form1.enable();
    this.generalHealth.enable();
    this.visionAssessment.enable();
    this.hearingGrp.enable();
    this.fitnessGrp.enable();
    this.medicalAssess.enable();
  }

  disableNewForm() {
    // this.form1.disable();
    this.generalHealth.disable();
    this.visionAssessment.disable();
    this.hearingGrp.disable();
    this.fitnessGrp.disable();
    this.medicalAssess.disable();
  }

  onValueChange() {
    // console.log('Function Calling', this.form1.value);

    // let formValue = this.form1.value;

    // if (formValue.name && formValue.idConfirmed && formValue.idConfirmed.length && formValue.dob) {
    //   console.log('Inside If');
    //   this.submitDisabled = false;
    //   this.generalHealth.enable();
    //   this.visionAssessment.enable();
    //   this.hearingGrp.enable();
    //   this.fitnessGrp.enable();
    //   this.medicalAssess.enable();
    // } else {
    //   console.log('Inside Else');
    //   this.submitDisabled = true;
    //   this.generalHealth.disable();
    //   this.visionAssessment.disable();
    //   this.hearingGrp.disable();
    //   this.fitnessGrp.disable();
    //   this.medicalAssess.disable();
    // }
  }


  // tslint:disable-next-line: member-ordering
  form1 = new FormGroup({
    name: new FormControl(''),
    idConfirmed: new FormControl(''),
    idConfirmOther: new FormControl(''),
    dob: new FormControl(''),
    currentSenCard: new FormControl(''),
    natInstNo: new FormControl(''),
    sentinalNo: new FormControl(''),
    additionalComments: new FormControl(''),
    // body: new FormControl('')
  });

  // tslint:disable-next-line: member-ordering
  generalHealth = new FormGroup({
    bp1: new FormControl('', this.bpValidators.concat(Validators.required)),
    pulse1: new FormControl('', Validators.required),
    bp2: new FormControl('', this.bpValidators),
    pulse2: new FormControl(''),
    bp3: new FormControl('', this.bpValidators),
    pulse3: new FormControl(''),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    bmi: new FormControl(''),
    isBmiGreater: new FormControl(''),
    bmiStairs: new FormControl(''),
    bmiStairsDetails: new FormControl(''),
    bmiHill: new FormControl(''),
    bmiHillDetails: new FormControl(''),
    bmiWalk: new FormControl(''),
    bmiWalkDetails: new FormControl(''),
    // bmiExercise : new FormControl(''),
    bmiExerciseDetails: new FormControl(''),
    bmiRefreshed: new FormControl(''),
    bmiRefreshedDetails: new FormControl(''),
    bmiBreathless: new FormControl(''),
    bmiBreathlessDetails: new FormControl(''),
    bmiTired: new FormControl(''),
    bmiTiredDetails: new FormControl(''),
    bmiHeadache: new FormControl(''),
    bmiHeadacheDetails: new FormControl(''),
    bmiSnore: new FormControl(''),
    bmiSnoreDetails: new FormControl(''),
    mobility: new FormControl(''),
    fitness: new FormControl(''),
    pulseRhythm: new FormControl('', Validators.required),
    glucose: new FormControl('', Validators.required),
    protein: new FormControl('', Validators.required),
    bpCheckBox: new FormControl(''),
    balanceNMobility: new FormControl('', Validators.required),
    alertnessNwellbeing: new FormControl('', Validators.required),
    speech: new FormControl('', Validators.required),
    adviceGiven: new FormControl('', Validators.required),
    lettersIssued: new FormControl('', Validators.required),
    leafletsSent: new FormControl(''),
    leafletsSentYes:new FormControl(''),
    adviceGivenYes: new FormControl(''),
    lettersIssuedYes: new FormControl(''),
    additionalComments: new FormControl(''),
    fatigue: new FormControl(''),
    lightHeadedness: new FormControl(''),
    dizziness: new FormControl(''),
    nausea: new FormControl(''),
    clammySkin: new FormControl(''),
    depression: new FormControl(''),
    lossOfConsciousness: new FormControl(''),
    // blurredVision: new FormControl(''),
    bmiFatigue: new FormControl(''),
    bmiLightHeadedness: new FormControl(''),
    bmiDizziness: new FormControl(''),
    bmiNausea: new FormControl(''),
    bmiClammySkin: new FormControl(''),
    bmiDepression: new FormControl(''),
    bmiLossOfConsciousness: new FormControl(''),
    bmiBlurredVision: new FormControl(''),
    bmiNormalDiet: new FormControl(''),
    bmiChangesWeight: new FormControl(''),
    bmiGastric: new FormControl(''),
    doYouSuffer: new FormControl(''),
    bmiLess: new FormControl('')
  })

  // tslint:disable-next-line: member-ordering
  visionAssessment = new FormGroup({
    dvlUnaided: new FormControl('', Validators.required),
    dvrUnaided: new FormControl('', Validators.required),
    dvlCorrected: new FormControl(''),
    dvrCorrected: new FormControl(''),
    glassesWorn: new FormControl('', Validators.required),
    lensesWorn: new FormControl('', Validators.required),
    visualFields: new FormControl('', Validators.required),
    colorVision: new FormControl('', Validators.required),
    plates: new FormControl('', Validators.required),
    additionalComments: new FormControl(''),
  })



  // tslint:disable-next-line: member-ordering
  hearingGrp = new FormGroup({
    leftEar500: new FormControl('', Validators.required),
    leftEar1000: new FormControl('', Validators.required),
    leftEar2000: new FormControl('', Validators.required),
    leftEar3000: new FormControl(''),
    leftEar4000: new FormControl(''),
    leftEar6000: new FormControl(''),
    leftEar8000: new FormControl(''),
    rightEar500: new FormControl('', Validators.required),
    rightEar1000: new FormControl('', Validators.required),
    rightEar2000: new FormControl('', Validators.required),
    rightEar3000: new FormControl(''),
    rightEar4000: new FormControl(''),
    rightEar6000: new FormControl(''),
    rightEar8000: new FormControl(''),
    earWax: new FormControl('', Validators.required),
    leTotal: new FormControl('', Validators.required),
    reTotal: new FormControl('', Validators.required),
    total90: new FormControl(''),
    rightStrength: new FormControl(''),
    leftStrength: new FormControl(''),
    hearingAid: new FormControl(''),
    sufferedInjury: new FormControl(''),
    sufferedInjuryText: new FormControl(''),
    earDisease: new FormControl(''),
    earDiseaseText: new FormControl(''),
    deafnessFamily: new FormControl(''),
    deafnessFamilyText: new FormControl(''),
    sufferedHead: new FormControl(''),
    sufferedHeadText: new FormControl(''),
    sufferRinging: new FormControl(''),
    sufferFromDizziness: new FormControl(''),
    additionalComments: new FormControl(''),
    ototoxicDrugs: new FormControl(''),
    exposureGunfire: new FormControl(''),
    exposureGunfireText: new FormControl(''),
    noisyHobbies: new FormControl(''),
    noisyHobbiesConfirm: new FormControl(''),
    hearNoise: new FormControl(''),
    hadWax: new FormControl(''),
    hadWaxWhen: new FormControl(''),
    pastEarProblem: new FormControl(''),
    previousJob: new FormControl(''),
    longYear: new FormControl(''),
    longMonth: new FormControl(''),
    protectionProvided: new FormControl(''),
    type: new FormControl(''),
    motorSports: new FormControl(''),
    rideMotorcycle: new FormControl(''),
    DIY: new FormControl(''),
    discos: new FormControl(''),
    shooting: new FormControl(''),
    Other: new FormControl()
  })


  // tslint:disable-next-line: member-ordering
  fitnessGrp = new FormGroup({
    addInfo: new FormControl(''),
    generalHealth: new FormControl(''),
    visual: new FormControl(''),
    colorVision: new FormControl(''),
    hearing: new FormControl(''),
  })
  // tslint:disable-next-line: member-ordering
  medicalAssess = new FormGroup({
    fit: new FormControl(''),
    letterToGp: new FormControl(''),
    sixMonthCerti: new FormControl(''),
    referToOHPhysician: new FormControl(''),
    level: new FormControl(''),
    reason: new FormControl(''),
    examinerName: new FormControl(''),
    examinerDate: new FormControl(''),
    examinarSignature: new FormControl('', Validators.required),
    checkedBy: new FormControl(''),
    checkedByDate: new FormControl(''),
    checkedSign: new FormControl(''),
    reasonForReferral: new FormControl(''),
    additionalComments: new FormControl(''),
    isFailed: new FormControl(''),
    isFailedReason: new FormControl('')
  })
  failedChange(event){
    console.log("event=============", event)
    if (event && event.target.checked){
      this.isFailed = true
    } else{
      this.isFailed = false
    }
  }
  newOldData(event) {
    this.oldForm = event;
    console.log('Old Form Data Here', this.oldForm);

    

    if (this.oldForm.medicalQuestionnaire && this.oldForm.medicalQuestionnaire.dob) {
      this.form1.controls['dob'].setValue(this.oldForm.medicalQuestionnaire.dob);
    }


    if (this.oldForm.medicalQuestionnaire && this.oldForm.medicalQuestionnaire.firstName && this.oldForm.medicalQuestionnaire.surName) {
      let name = this.oldForm.medicalQuestionnaire.firstName + ' ' + this.oldForm.medicalQuestionnaire.surName
      this.form1.controls['name'].setValue(name);
    }

    if (this.oldForm.personalDetails){
      this.submitDisabled = false
      this.form1.patchValue({
        idConfirmed: this.oldForm.personalDetails.idConfirmed,
        idConfirmOther: this.oldForm.personalDetails.idConfirmOther,
        currentSenCard: this.oldForm.personalDetails.currentSenCard,
        natInstNo: this.oldForm.personalDetails.natInstNo,
        sentinalNo: this.oldForm.personalDetails.sentinalNo,
        additionalComments: this.oldForm.personalDetails.additionalComments
      })
    } else {
      this.submitDisabled = true
    }

    this.enableNewForm();
    this.hideFirstForm = true;
    this.hideSecondForm = false;
  }
  finalDate(event, formName, fieldName?) {
    console.log("evemt ==> ", event, "<======> ", formName);
    switch (formName) {
      case "form1":
        // this.form1.controls[fieldName].setValue(event.finalDate)
        break;
      case "medicalAssess":
        switch (fieldName) {
          case "examinerDate":
            this.medicalAssess.controls[fieldName].setValue(event.finalDate)
            this.medicalAssess.updateValueAndValidity();
            console.log("mediacall examiner date setted ===> ", this.medicalAssess.controls)
            break;
          case "checkedByDate":
            this.medicalAssess.controls[fieldName].setValue(event.finalDate)
            this.medicalAssess.updateValueAndValidity();
            console.log("mediacall cehckby date setted ===> ", this.medicalAssess.controls)
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    // console.log("Form  1 ======> ", this.form1);
    console.log("Form  1 ======> ", this.medicalAssess);
  }
  isGlassesWorn(event) {
    console.log("event.target.value ", event);
    if (event == 'No') {
      this.isGlassWorn = false;
    }
    else {
      this.isGlassWorn = true
    }
  }

  idChanged(event) {
    console.log("Id confirm changed", event.value)

    let temp = event.value.forEach(element => {
      console.log(" yash check this ", element)

      if (element == 'Other') {
        console.log("element", element)
        this.showSpecifyOthers = true
      }
    });
  }

  checkboxChange(event) {
    if (event.checked == true) {
      this.secondTestDisabled = false;
      this.showSecond = true
      this.generalHealth.get('bp2').setValidators(this.bpValidators.concat(Validators.required))
    } else {
      this.secondTestDisabled = true;
      this.showSecond = false
      this.generalHealth.get('bp2').setValidators(this.bpValidators)
    }
  }

  checkboxChange2(event) {
    if (event.checked == true) {
      this.thirdTestDisabled = false;
      this.showThird = true
      this.generalHealth.get('bp3').setValidators(this.bpValidators.concat(Validators.required))
    } else {
      this.thirdTestDisabled = true;
      this.showThird = false
      this.generalHealth.get('bp3').setValidators(this.bpValidators)
    }
  }

  // colorVisionChange(e){
  // console.log('colourVisionChange', e)
  // if(e.value == 'Abnormal'){
  //   this.disableLevel = true
  // }
  // else{
  //   this.disableLevel = false
  // }
  // }
  fitnessChange(event, type) {
    console.log(event, type)
    // if (event.value == 'Abnormal'){
    //   event.value = 'Not Satisfactory'
    // }
    let obj = {
      type: type,
      value: event.value
    }

    var index = _.findIndex(this.disableLevelConditions, function (o) { return o.type == type })
    console.log("index", index);

    if (index == -1) {
      this.disableLevelConditions.push(obj)
      this.checkCondition()
    }
    else {
      this.disableLevelConditions[index] = obj
      this.checkCondition()
    }
  }

  checkCondition() {
    console.log("checkCondition called", this.disableLevelConditions);

    // if (this.disableLevelConditions && this.disableLevelConditions.length){
    var index = _.findIndex(this.disableLevelConditions, function (o) { return (o.value == 'Not Satisfactory' || o.value == 'Abnormal') })
    console.log("index", index);

    if (index == -1) {
      this.disableLevel = false
    }
    else {
      this.disableLevel = true
    }
    // }
  }
  // onCheckboxChange(e) {
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
  // }
  onCheckboxChange(e, i) {
    const checkArray: FormArray = this.generalHealth.get('bpCheckBox') as FormArray;

    if (e.target.checked) {
      this.bpArray[i].checked = true
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
    }
    else {
      this.bpArray[i].checked = null
    }
    this.generalHealth.patchValue({
      bpCheckBox: this.bpArray
    })
    console.log("const checkArray", checkArray, e)
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


  bpBlurred(event, reading) {

    console.log('event=====>', event);

    this.bpArray.forEach(el => {
      el.checked = null
    })
    console.log("BP", event.target.value)
    let temp = event.target.value.split('/')
    if (temp[0] > 160 || temp[1] > 95) {
      let event = {
        checked: true
      }
      if (reading == 'reading1') {
        this.isChecked = true
        this.checkboxChange(event)
      }
      else if (reading == 'reading2') {
        this.isChecked2 = true
        this.checkboxChange2(event)
      }
    }
    // console.log("temp", temp, Number(temp[0]) >= 90)
    if (temp.length == 2) {
      if ((Number(temp[0]) >= 90 && Number(temp[0]) <= 140) && (Number(temp[1]) >= 60 && Number(temp[1] <= 90))) {
        console.log("!!!!!!!!!!!!")
        this.bpArray[1].checked = true
      }
      else if ((Number(temp[0]) >= 140 && Number(temp[0]) <= 160) && (Number(temp[1]) >= 90 && Number(temp[1] <= 95))) {
        this.bpArray[2].checked = true
        // this.bpArray[2].checked = true
      }
      else if ((Number(temp[0]) >= 160 && Number(temp[0]) <= 180) && (Number(temp[1]) >= 95 && Number(temp[1] <= 100))) {
        // console.log("%cChecking This Condition", Number(temp[0]), Number(temp[0]), Number(temp[1]), Number(temp[1]), "color: Orange");

        // this.bpArray[1].checked = true
        this.bpArray[3].checked = true
      }
      else if (Number(temp[0]) > 180 && Number(temp[1]) > 100) {
        this.bpArray[4].checked = true
      }
      else if (Number(temp[0]) < 90) {
        this.bpArray[0].checked = true
      }
      this.generalHealth.patchValue({
        bpCheckBox: this.bpArray
      })

      console.log(Number(temp[0]))
      console.log(Number(temp[1]))

      if (Number(temp[0]) < 90 && Number(temp[1]) < 60) {
        this.doYouSuffer = true;
        this.generalHealth.patchValue({
          doYouSuffer: "Yes"
        })
      }
      else {
        this.doYouSuffer = false;
        this.generalHealth.patchValue({
          doYouSuffer: null
        })
      }

    }
  }

  checkBp() {
    console.log('Event Called', this.generalHealth.value);
    let healthForm = this.generalHealth.value;
    let temp = healthForm.bp1.split('/')

    // if ((Number(temp[0]) > 160 && Number(temp[1]) > 95)) {
    //   console.log('Inside range');
    //   this.showSecondOption = true;
    //   this.secondTestDisabled = false;
    // } else {
    //   this.showSecondOption = false;
    //   this.secondTestDisabled = true;
    // }
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
  leafletsSentChanged(event){
    console.log('event in leafletsSentChanged($event)', event)
    if (this.generalHealth.value.leafletsSent != '' && this.generalHealth.value.leafletsSent == 'Yes') {
      this.showleafletsSentYes = true
    }
    else {
      this.showleafletsSentYes = false
      this.generalHealth.patchValue({
        leafletsSentYes: ''
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
    if (this.bmi >= 30) {
      this.generalHealth.patchValue({
        isBmiGreater: 'Yes'
      })
    }
    else if (this.bmi <= 19) {
      this.generalHealth.patchValue({
        bmiLess: 'Yes'
      })
    }
    else {
      this.generalHealth.patchValue({
        isBmiGreater: 'No'
      })
    }
  }
  leftEarChange(event, id) {
    this.totalLeftEar = 0
    console.log("EVENT", event, "id", id)
    if (id == 500) {
      this.lear500 = event.value
      this.totalLeftEar = this.totalLeftEar + event.value
    }
    else if (id == 1000) {
      this.lear1000 = event.value
      this.totalLeftEar = this.totalLeftEar + event.value

    }
    else if (id == 2000) {
      this.lear2000 = event.value
      this.totalLeftEar = this.totalLeftEar + event.value

    }

    console.log("EVENT", this.lear500, this.lear1000, this.lear2000)

    if (this.lear500 != undefined && this.lear1000 != undefined && this.lear2000 != undefined) {
      let leftEarTotal = Number(this.lear500) + Number(this.lear1000) + Number(this.lear2000)
      this.learTotal = leftEarTotal
      this.hearingGrp.patchValue({
        leTotal: this.learTotal
      })

      if (this.learTotal > 89 || this.rearTotal > 89) {
        this.hearingGrp.patchValue({
          total90: true
        })
      }
      else {
        this.hearingGrp.patchValue({
          total90: false
        })
      }
    }
  }

  rightEarChange(event, id) {
    console.log("EVENT", event, "id", id)
    this.totalRightEar = 0
    if (id == 500) {
      this.rear500 = event.value
    }
    else if (id == 1000) {
      this.rear1000 = event.value
    }
    else if (id == 2000) {
      this.rear2000 = event.value
    }

    if (this.rear500 != undefined && this.rear1000 != undefined && this.rear2000 != undefined) {
      let rightEarTotal = Number(this.rear500) + Number(this.rear1000) + Number(this.rear2000)
      this.rearTotal = rightEarTotal
      this.hearingGrp.patchValue({
        reTotal: this.rearTotal
      })
    }

    if (this.rearTotal > 89 || this.learTotal > 89) {
      this.hearingGrp.patchValue({
        total90: true
      })
    }
    else {
      this.hearingGrp.patchValue({
        total90: false
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
    this.itemData = JSON.parse(localStorage.getItem("formone"));
    saveAs(blob, 'medical-' + this.itemData.medicalQuestionnaire.firstName + this.itemData.medicalQuestionnaire.surName);
    window.location.reload();

  }

  bmiQuestions(event, type) {
    console.log('event', event, 'type', type)
    if (event.value == 'Yes') {
      switch (type) {
        case 'bmiStairs':
          this.bmiStairsDetails = true
          break;
        case 'bmiHill':
          this.bmiHillDetails = true
          break;
        case 'bmiWalk':
          this.bmiWalkDetails = true
          break;
        // case 'bmiExercise':
        //   this.bmiExerciseDetails = true
        //   break;
        case 'bmiBreathless':
          this.bmiBreathlessDetails = true
          break;
        case 'bmiHeadache':
          this.bmiHeadacheDetails = true
          break;

        case 'bmiSnore':
          this.bmiSnoreDetails = true
          break;
        case 'bmiTired':
          this.bmiTiredDetails = true
          break;
        case 'bmiRefreshed':
          this.bmiRefreshedDetails = false
          break;
        default:
          break;
      }
      // if (type == 'bmiStairs'){
      //   this.bmiStairsDetails = true
      // } 
      // else if (type == 'bmiHill'){
      //   this.bmiHillDetails = true
      // }
      // else if (type == 'bmiWalk'){
      //   this.bmiWalkDetails = true
      // }
      // else if (type = 'bmiExercise'){
      //   this.bmiExerciseDetails = true
      // }
    }
    else {
      // if (type == 'bmiStairs') {
      //   this.bmiStairsDetails = false
      // }
      // else if (type == 'bmiHill') {
      //   this.bmiHillDetails = false
      // }
      // else if (type == 'bmiWalk') {
      //   this.bmiWalkDetails = false
      // }
      // else if (type = 'bmiExercise') {
      //   this.bmiExerciseDetails = false
      // }
      switch (type) {
        case 'bmiStairs':
          this.bmiStairsDetails = false
          break;
        case 'bmiHill':
          this.bmiHillDetails = false
          break;
        case 'bmiWalk':
          this.bmiWalkDetails = false
          break;
        // case 'bmiExercise':
        //   this.bmiExerciseDetails = false
        //   break;
        case 'bmiBreathless':
          this.bmiBreathlessDetails = false
          break;
        case 'bmiHeadache':
          this.bmiHeadacheDetails = false
          break;

        case 'bmiSnore':
          this.bmiSnoreDetails = false
          break;
        case 'bmiTired':
          this.bmiTiredDetails = false
          break;
        case 'bmiRefreshed':
          this.bmiRefreshedDetails = true
          break;
        default:
          break;
      }
    }
  }

  submit() {
    let temp = this.form1.controls.idConfirmed.value
    if (temp) {
      temp.forEach(el => {
        if (el == "Sentinel Card") {
          this.form1.value['sCard'] = "Sentinel Card"
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
    let tempLeaflets = this.generalHealth.controls.leafletsSentYes.value
    if (tempLeaflets) {
      tempLeaflets.forEach(el => {
        if (el == 'Blood Pressure') {
          this.generalHealth.value['bloodPleaf'] = "Bloop Pressure"
        }
        else if (el == 'Smoking') {
          this.generalHealth.value['smokeInleaf'] = "Smoking"
        }
        else if (el == 'Alcohol') {
          this.generalHealth.value['alcoleaf'] = "Alcohol"
        }
        else if (el == 'BMI') {
          this.generalHealth.value['bmiYesleaf'] = "BMI"
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
      recom: this.medicalAssess.value,
      medicalQuestionnaire: this.oldForm.medicalQuestionnaire,
      empHistory: this.oldForm.empHistory,
      medHistory: this.oldForm.medHistory,
      lifeStyle: this.oldForm.lifeStyle,
      confirmation: this.oldForm.confirmation,
    }

    console.log('Final Data to submit', data);


    // return;
    if (this.medicalAssess.valid) {
      if (this.generalHealth.valid) {
        if (this.visionAssessment.valid) {
          if (this.hearingGrp.valid) {
            this.apiCall(data)
          }
          else {
            alert('Fields in Hearning Missing')
          }
        }
        else {
          alert('Fields in Vission Assessment Missing')
        }
      }
      else {
        alert('Fields in General Health Missing')
      }
    }
    else {
      alert('Examiner Signature  Missing')
    }

    // if (this.form1.valid && this.medicalAssess.valid && this.generalHealth.valid && this.visionAssessment.valid && this.hearingGrp.valid ) {
    // if (this.generalHealth.valid){

    // }
    // else{
    // console.log("this.generalHealth.get('height').status", this.generalHealth.get('height').status);

    // if (this.generalHealth.get('height').status == 'INVALID' || this.generalHealth.get('weight').status == 'INVALID'){
    //   alert("Height and Weight is Required")
    // }
    // else{
    //   alert("Blood Pressure Readings Required")
    // }
    // alert("Blood Pressure Readings Required")
    // }
    // }

    // else {
    //   alert('Form Details Missing')
    // }


    let checked = $('input[name="checkButton"]:checked').val();
    console.log("checkedcheckedchecked", checked)
    // console.log("FORM", this.generalHealth)
    console.log("this.examinerSign", this.examinarSign)
    console.log("this.examinerSign", this.checkedBy)

    console.log("THe data is----------->>>>>>>>>>>>>>>", data)
  }

  apiCall(data) {
    this.loading = true;
    this._medicalFormService.generatePdf(data).subscribe(res => {
      console.log("RES", res)

      this.loading = false;
      this.saveToFileSystem(res);
    })
  }

  completeAsFailReferToGP() {
    console.log(" ****** completeAsFailReferToGP ******")
    console.log(" ****** Hey Yash ", this.generalHealth.value['pulse2'])
    console.log(" ****** Hey Yash ", this.generalHealth.value['pulse3'])


    if(this.generalHealth.value && (this.generalHealth.value['pulseRhythm'] == "Abnormal" || this.generalHealth.value['pulse1'] > 100 || this.generalHealth.value['pulse2'] > 100 || this.generalHealth.value['pulse3'] > 100 ) ){
      console.log("Yash Pulse1")
      this.bpArray[4].checked = true
      this.letterToGpCheck = true
      this.medicalAssess.patchValue({
        letterToGp: 'true'
      })
    }
    else if( (this.generalHealth.value['glucose'] == '++' || this.generalHealth.value['glucose'] == '+++') && this.generalHealth.value['protein'] == '+++'){
      this.bpArray[4].checked = true
      this.letterToGpCheck = true
      this.medicalAssess.patchValue({
        letterToGp: 'true'
      })
    }
    
    if (this.generalHealth.value && (this.generalHealth.value['pulse1'] < 40 || this.generalHealth.value['pulse1'] > 100 )) {
      console.log("Yash Pulse1", this.generalHealth.value['pulse1'])
      this.bpArray[4].checked = true
      this.letterToGpCheck = true
      this.medicalAssess.patchValue({
        letterToGp: 'true'
      })
    }
    else if (this.generalHealth.value && this.generalHealth.value['pulse2'] && (this.generalHealth.value['pulse2'] < 40 || this.generalHealth.value['pulse2'] > 100)) {
      console.log("Yash Pulse2", this.generalHealth.value['pulse1'])
      this.bpArray[4].checked = true
      this.letterToGpCheck = true
      this.medicalAssess.patchValue({
        letterToGp: 'true'
      })
    }
    else if (this.generalHealth.value && this.generalHealth.value['pulse2'] && (this.generalHealth.value['pulse3'] < 40 || this.generalHealth.value['pulse3'] > 100)) {
      console.log("Yash Pulse3", this.generalHealth.value['pulse1'])
      this.bpArray[4].checked = true
      this.letterToGpCheck = true
      this.medicalAssess.patchValue({
        letterToGp: 'true'
      })
    }
    else {
      console.log("Yash Pulse Else")
      this.bpArray[4].checked = null
      this.letterToGpCheck = null
      this.medicalAssess.patchValue({
        letterToGp: null
      })
    }
  }

  earProblems() {
    // if(this.generalHealth.value['pulse2'])
    console.log("Ear case", this.hearingGrp.value['sufferedInjury'])

    if (this.hearingGrp.value['sufferedInjury'] && this.hearingGrp.value['sufferedInjury'] == 'Yes') {
      this.addTextSufferedInjury = true
    }
    else {
      this.addTextSufferedInjury = false
    }

    if (this.hearingGrp.value['earDisease'] && this.hearingGrp.value['earDisease'] == 'Yes') {
      this.addTextEarDisease = true
    }
    else {
      this.addTextEarDisease = false
    }


    if (this.hearingGrp.value['deafnessFamily'] && this.hearingGrp.value['deafnessFamily'] == 'Yes') {
      this.addTextDeafnessFamily = true
    }
    else {
      this.addTextDeafnessFamily = false
    }

    if (this.hearingGrp.value['sufferedHead'] && this.hearingGrp.value['sufferedHead'] == 'Yes') {
      this.addTextSufferedHead = true
    }
    else {
      this.addTextSufferedHead = false
    }


    if (this.hearingGrp.value['exposureGunfire'] && this.hearingGrp.value['exposureGunfire'] == 'Yes') {
      this.addTextExposureGunfire = true
    }
    else {
      this.addTextExposureGunfire = false
    }


    if (this.hearingGrp.value['hadWax'] && this.hearingGrp.value['hadWax'] == 'Yes') {
      this.addTextHadWax = true
    }
    else {
      this.addTextHadWax = false
    }

    if (this.hearingGrp.value['pastEarProblem'] && this.hearingGrp.value['pastEarProblem'] == 'Yes') {
      this.addTextPastEarProblem = true
    }
    else {
      this.addTextPastEarProblem = false
    }

  }

  noisyHobbiesChanged(event) {
    console.log("Id confirm changed", event)

    this.hearingGrp.patchValue({
      motorSports: false
    })

    this.hearingGrp.patchValue({
      rideMotorcycle: false
    })

    this.hearingGrp.patchValue({
      DIY: false
    })

    this.hearingGrp.patchValue({
      discos: false
    })

    this.hearingGrp.patchValue({
      shooting: false
    })

    this.hearingGrp.patchValue({
      Other: false
    })


    this.hearingGrp.value['noisyHobbiesConfirm'].forEach(element => {
      console.log(" ELEment ", element)
      if (element == 'Motor sports') {
        console.log("element", element)
        this.hearingGrp.patchValue({
          motorSports: true
        })

      }

      if (element == 'Ride a motorcycle') {
        this.hearingGrp.patchValue({
          rideMotorcycle: true
        })
        console.log("element", element)
      }

      if (element == 'DIY') {
        this.hearingGrp.patchValue({
          DIY: true
        })
        console.log("element", element)
      }

      if (element == 'Discos/loud music') {
        console.log("element", element)
        this.hearingGrp.patchValue({
          discos: true
        })
      }

      if (element == 'Shooting') {
        console.log("element", element)
        this.hearingGrp.patchValue({
          shooting: true
        })
      }

      if (element == 'Other') {
        console.log("element", element)
        this.hearingGrp.patchValue({
          Other: true
        })
      }
    })
  }
}
