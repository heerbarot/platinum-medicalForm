import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MedicalFormService } from '../services/medical-form.service';
import { saveAs } from "file-saver";
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { SignCanvasComponent } from '../sign-canvas/sign-canvas.component';

@Component({
  selector: 'app-old-form',
  templateUrl: './old-form.component.html',
  styleUrls: ['./old-form.component.scss']
})
export class OldFormComponent implements OnInit {
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;
  @Output() oldData = new EventEmitter();
  showSleepDisorderQues: boolean;

  constructor(public _medicalFormService: MedicalFormService, public dialog: MatDialog) { }
  data;
  imgData;

  firstName;
  surName;
  sponsorName;
  dateOfBirth;
  telNumber;
  homeAdd;
  gpAdd;
  jobTitle;
  medicalQuestionnaireComment;


  absentSickness;
  absentSicknessDetails;
  deniedJob;
  deniedJobDetails;
  illnessByWork;
  illnessByWorkDetails;
  empHistoryComment;


  heartNcirculatoryCon; heartNcirculatoryConQ1; heartNcirculatoryConQ2; heartNcirculatoryConQ3;
  heartNcirculatoryConDetails;
  respiratoryNlungCon; respiratoryNlungConQ1; respiratoryNlungConQ2; respiratoryNlungConQ3;
  respiratoryNlungConDetails;
  neurologicalCon; neurologicalConQ1; neurologicalConQ2; neurologicalConQ3;
  neurologicalConDetails;
  weeknessCon; weeknessConQ1; weeknessConQ2; weeknessConQ3;
  weeknessConDetails;
  mentalHealthCon; mentalHealthConQ1; mentalHealthConQ2; mentalHealthConQ3;
  mentalHealthConDetails;
  musculoskeletalCon; musculoskeletalConQ1; musculoskeletalConQ2; musculoskeletalConQ3;
  musculoskeletalConDetails;
  sleepDisordersCon;
  sleepDisordersConDetails;
  endocrineDisordersCon; endocrineDisordersConQ1; endocrineDisordersConQ2; endocrineDisordersConQ3;
  endocrineDisordersConDetails;
  behaviouralDisordersCon; behaviouralDisordersConQ1; behaviouralDisordersConQ2; behaviouralDisordersConQ3;
  behaviouralDisordersConDetails;
  visualCon; visualConQ1; visualConQ2; visualConQ3;
  visualConDetails;
  hearingCon; hearingConQ1; hearingConQ2; hearingConQ3;
  hearingConDetails;
  speechCon; speechConQ1; speechConQ2; speechConQ3;
  speechConDetails;
  bowelCon; bowelConQ1; bowelConQ2; bowelConQ3;
  bowelConDetails;
  kidneyCon; kidneyConQ1; kidneyConQ2; kidneyConQ3;
  kidneyConDetails;
  liverCon; liverConQ1; liverConQ2; liverConQ3;
  liverConDetails;
  allergiesCon; allergiesConQ1; allergiesConQ2; allergiesConQ3;
  allergiesConDetails;
  sleepingCon; sleepingConQ1; sleepingConQ2; sleepingConQ3;
  sleepingConDetails;
  medication; medicationQ1; medicationQ2; medicationQ3;
  medicationDetails;
  medicalTreatment; medicalTreatmentQ1; medicalTreatmentQ2; medicalTreatmentQ3;
  medicalTreatmentDetails;
  tests; testsQ1; testsQ2; testsQ3;
  testsDetails;
  otherHealthAspects; otherHealthAspectsQ1; otherHealthAspectsQ2; otherHealthAspectsQ3;
  otherHealthAspectsDetails;
  medHistoryComment;

  sleepDisorderRefreshed;
  sleepDisorderRefreshedDetails;
  sleepDisorderBreathless;
  sleepDisorderBreathlessDetails;
  sleepDisorderHeadache;
  sleepDisorderHeadacheDetails;
  sleepDisorderSnore;
  sleepDisorderSnoreDetails;
  sleepDisorderTired;
  sleepDisorderTiredDetails;

  exercise;
  exerciseDetails;
  smoke;
  smokeDetails;
  exsmoker;
  exsmokerYears;
  exsmokerMonths;
  alcohol;
  alcoholDetails;
  lifeStyleComment;


  empSponsor;
  confirmDate;

  hideFirstForm: boolean = false;


  ngOnInit() {
  }

  sleepDisorderChenge(event){
    console.log(event)
    if(event.value == 'Yes'){
      this.showSleepDisorderQues = true
    }
    else{
      this.showSleepDisorderQues = false
    }
  }

  submit() {
    if (this.firstName == undefined || this.firstName == "" || this.surName == undefined || this.surName == ""
      || this.dateOfBirth == undefined || this.dateOfBirth == "" || !this.imgData) {
      alert("Details missing")
    }
    else {
      this.data = {
        medicalQuestionnaire: {
          firstName: this.firstName,
          surName: this.surName,
          sponsorName: this.sponsorName,
          dob: this.dateOfBirth,
          telNumber: this.telNumber,
          homeAdd: this.homeAdd,
          gpAdd: this.gpAdd,
          jobTitle: this.jobTitle,
          medicalQuestionnaireComment: this.medicalQuestionnaireComment
        },
        empHistory: {
          absentSickness: this.absentSickness,
          absentSicknessDetails: this.absentSicknessDetails,
          deniedJob: this.deniedJob,
          deniedJobDetails: this.deniedJobDetails,
          illnessByWork: this.illnessByWork,
          illnessByWorkDetails: this.illnessByWorkDetails,
          empHistoryComment: this.empHistoryComment,
        },
        medHistory: {
          heartNcirculatoryCon: this.heartNcirculatoryCon,
          heartNcirculatoryConQ1:this.heartNcirculatoryConQ1,
          heartNcirculatoryConQ2:this.heartNcirculatoryConQ2,
          heartNcirculatoryConQ3:this.heartNcirculatoryConQ3,
          heartNcirculatoryConDetails: this.heartNcirculatoryConDetails,
          respiratoryNlungCon: this.respiratoryNlungCon,
          respiratoryNlungConQ1:this.respiratoryNlungConQ1,
          respiratoryNlungConQ2:this.respiratoryNlungConQ2,
          respiratoryNlungConQ3:this.respiratoryNlungConQ3,
          respiratoryNlungConDetails: this.respiratoryNlungConDetails,
          neurologicalCon: this.neurologicalCon,
          neurologicalConQ1:this.neurologicalConQ1,
          neurologicalConQ2:this.neurologicalConQ2,
          neurologicalConQ3:this.neurologicalConQ3,
          neurologicalConDetails: this.neurologicalConDetails,
          weeknessCon: this.weeknessCon,
          weeknessConQ1:this.weeknessConQ1,
          weeknessConQ2:this.weeknessConQ2,
          weeknessConQ3:this.weeknessConQ3,
          weeknessConDetails: this.weeknessConDetails,
          mentalHealthCon: this.mentalHealthCon,
          mentalHealthConQ1:this.mentalHealthConQ1,
          mentalHealthConQ2:this.mentalHealthConQ2,
          mentalHealthConQ3:this.mentalHealthConQ3,
          mentalHealthConDetails: this.mentalHealthConDetails,
          musculoskeletalCon: this.musculoskeletalCon,
          musculoskeletalConQ1:this.musculoskeletalConQ1,
          musculoskeletalConQ2:this.musculoskeletalConQ2,
          musculoskeletalConQ3:this.musculoskeletalConQ3,
          musculoskeletalConDetails: this.musculoskeletalConDetails,
          sleepDisordersCon: this.sleepDisordersCon,
          sleepDisordersConDetails: this.sleepDisordersConDetails,
          endocrineDisordersCon: this.endocrineDisordersCon,
          endocrineDisordersConQ1:this.endocrineDisordersConQ1,
          endocrineDisordersConQ2:this.endocrineDisordersConQ2,
          endocrineDisordersConQ3:this.endocrineDisordersConQ3,
          endocrineDisordersConDetails: this.endocrineDisordersConDetails,
          behaviouralDisordersCon: this.behaviouralDisordersCon,
          behaviouralDisordersConQ1:this.behaviouralDisordersConQ1,
          behaviouralDisordersConQ2:this.behaviouralDisordersConQ2,
          behaviouralDisordersConQ3:this.behaviouralDisordersConQ3,
          behaviouralDisordersConDetails: this.behaviouralDisordersConDetails,
          visualCon: this.visualCon,
          visualConQ1:this.visualConQ1,
          visualConQ2:this.visualConQ2,
          visualConQ3:this.visualConQ3,
          visualConDetails: this.visualConDetails,
          hearingCon: this.hearingCon,
          hearingConQ1:this.hearingConQ1,
          hearingConQ2:this.hearingConQ2,
          hearingConQ3:this.hearingConQ3,
          hearingConDetails: this.hearingConDetails,
          speechCon: this.speechCon,
          speechConQ1:this.speechConQ1,
          speechConQ2:this.speechConQ2,
          speechConQ3:this.speechConQ3,
          speechConDetails: this.speechConDetails,
          bowelCon: this.bowelCon,
          bowelConQ1:this.bowelConQ1,
          bowelConQ2:this.bowelConQ2,
          bowelConQ3:this.bowelConQ3,
          bowelConDetails: this.bowelConDetails,
          kidneyCon: this.kidneyCon,
          kidneyConQ1:this.kidneyConQ1,
          kidneyConQ2:this.kidneyConQ2,
          kidneyConQ3:this.kidneyConQ3,
          kidneyConDetails: this.kidneyConDetails,
          liverCon: this.liverCon,
          liverConQ1:this.liverConQ1,
          liverConQ2:this.liverConQ2,
          liverConQ3:this.liverConQ3,
          liverConDetails: this.liverConDetails,
          allergiesCon: this.allergiesCon,
          allergiesConQ1:this.allergiesConQ1,
          allergiesConQ2:this.allergiesConQ2,
          allergiesConQ3:this.allergiesConQ3,
          allergiesConDetails: this.allergiesConDetails,
          sleepingCon: this.sleepingCon,
          sleepingConQ1:this.sleepingConQ1,
          sleepingConQ2:this.sleepingConQ2,
          sleepingConQ3:this.sleepingConQ3,
          sleepingConDetails: this.sleepingConDetails,
          medication: this.medication,
          medicationQ1:this.medicationQ1,
          medicationQ2:this.medicationQ2,
          medicationQ3:this.medicationQ3,
          medicationDetails: this.medicationDetails,
          medicalTreatment: this.medicalTreatment,
          medicalTreatmentQ1:this.medicalTreatmentQ1,
          medicalTreatmentQ2:this.medicalTreatmentQ2,
          medicalTreatmentQ3:this.medicalTreatmentQ3,
          medicalTreatmentDetails: this.medicalTreatmentDetails,
          tests: this.tests,
          testsQ1:this.testsQ1,
          testsQ2:this.testsQ2,
          testsQ3:this.testsQ3,
          testsDetails: this.testsDetails,
          otherHealthAspects: this.otherHealthAspects,
          otherHealthAspectsQ1: this.otherHealthAspectsQ1,
          otherHealthAspectsQ2: this.otherHealthAspectsQ2,
          otherHealthAspectsQ3: this.otherHealthAspectsQ3,
          otherHealthAspectsDetails: this.otherHealthAspectsDetails,
          medHistoryComment: this.medHistoryComment,
          sleepDisorderRefreshed : this.sleepDisorderRefreshed,
          sleepDisorderRefreshedDetails : this.sleepDisorderRefreshedDetails,
          sleepDisorderBreathless : this.sleepDisorderBreathless,
          sleepDisorderBreathlessDetails : this.sleepDisorderBreathlessDetails,
          sleepDisorderHeadache : this.sleepDisorderHeadache,
          sleepDisorderHeadacheDetails : this.sleepDisorderHeadacheDetails,
          sleepDisorderSnore : this.sleepDisorderSnore,
          sleepDisorderSnoreDetails : this.sleepDisorderSnoreDetails,
          sleepDisorderTired : this.sleepDisorderTired,
          sleepDisorderTiredDetails : this.sleepDisorderTiredDetails
        },
        lifeStyle: {
          exercise: this.exercise,
          exerciseDetails: this.exerciseDetails,
          smoke: this.smoke,
          smokeDetails: this.smokeDetails,
          exsmoker: this.exsmoker,
          exsmokerYears: this.exsmokerYears,
          exsmokerMonths: this.exsmokerMonths,
          alcohol: this.alcohol,
          alcoholDetails: this.alcoholDetails,
          lifeStyleComment: this.lifeStyleComment
        },
        confirmation: {
          empSponsor: this.empSponsor,
          confirmDate: this.confirmDate,
          signature: this.imgData
        }
      }
      console.log("this.data", this.data)
      this.hideFirstForm = true;
      localStorage.setItem('formone', JSON.stringify(this.data));

      this.oldData.emit(this.data);

      // this._medicalFormService.generatePdf(this.data).subscribe(res => {
      //   console.log("RES", res)
      //   this.saveToFileSystem(res);
      // })
    }


    console.log("THIS.DATA", this.data)
  }
  private saveToFileSystem(response) {
    var byteArray = new Uint8Array(response.data);
    var blob = new Blob([byteArray], { type: 'application/pdf' });
    saveAs(blob, 'medical-consent');
    // this.loading = false;
  }

  redirect(role) {
    // this.router.navigateByUrl('/signature')
    this.openDialog(SignCanvasComponent).subscribe(data => {
      console.log("data from signature", data)
      if (role == 'consent') {
        this.imgData = data
      }
      console.log('the form is')
      // this.submit()
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

  // drawComplete() {
  //   // will be notified of szimek/signature_pad's onEnd event
  //   this.imgData = this.signaturePad.toDataURL()
  //   console.log(this.signaturePad.toDataURL());
  // }

  // clear() {
  //   this.imgData = null
  //   this.signaturePad.clear();
  // }

  // drawStart() {
  //   // will be notified of szimek/signature_pad's onBegin event
  //   console.log('begin drawing');
  // }

}
