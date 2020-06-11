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


  absentSickness;
  absentSicknessDetails;
  deniedJob;
  deniedJobDetails;
  illnessByWork;
  illnessByWorkDetails;


  heartNcirculatoryCon;
  heartNcirculatoryConSetails;
  respiratoryNlungCon;
  respiratoryNlungConDetails;
  neurologicalCon;
  neurologicalConDetails;
  weeknessCon;
  weeknessConDetails;
  mentalHealthCon;
  mentalHealthConDetails;
  musculoskeletalCon;
  musculoskeletalConDetails;
  sleepDisordersCon;
  sleepDisordersConDetails;
  endocrineDisordersCon;
  endocrineDisordersConDetails;
  behaviouralDisordersCon;
  behaviouralDisordersConDetails;
  visualCon;
  visualConDetails;
  hearingCon;
  hearingConDetails;
  speechCon;
  speechConDetails;
  bowelCon;
  bowelConDetails;
  kidneyCon;
  kidneyConDetails;
  liverCon;
  liverConDetails;
  allergiesCon;
  allergiesConDetails;
  sleepingCon;
  sleepingConDetails;
  medication;
  medicationDetails;
  medicalTreatment;
  medicalTreatmentDetails;
  tests;
  testsDetails;
  otherHealthAspects;
  otherHealthAspectsDetails;

  exercise;
  exerciseDetails;
  smoke;
  smokeDetails;
  exsmoker;
  exsmokerYears;
  exsmokerMonths;
  alcohol;
  alcoholDetails;


  empSponsor;
  confirmDate;

  hideFirstForm: boolean = false;

  ngOnInit() {
  }

  submit() {
    if (this.firstName == undefined || this.firstName == "" || this.surName == undefined || this.surName == ""
      || this.dateOfBirth == undefined || this.dateOfBirth == "") {
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
          jobTitle: this.jobTitle
        },
        empHistory: {
          absentSickness: this.absentSickness,
          absentSicknessDetails: this.absentSicknessDetails,
          deniedJob: this.deniedJob,
          deniedJobDetails: this.deniedJobDetails,
          illnessByWork: this.illnessByWork,
          illnessByWorkDetails: this.illnessByWorkDetails
        },
        medHistory: {
          heartNcirculatoryCon: this.heartNcirculatoryCon,
          heartNcirculatoryConSetails: this.heartNcirculatoryConSetails,
          respiratoryNlungCon: this.respiratoryNlungCon,
          respiratoryNlungConDetails: this.respiratoryNlungConDetails,
          neurologicalCon: this.neurologicalCon,
          neurologicalConDetails: this.neurologicalConDetails,
          weeknessCon: this.weeknessCon,
          weeknessConDetails: this.weeknessConDetails,
          mentalHealthCon: this.mentalHealthCon,
          mentalHealthConDetails: this.mentalHealthConDetails,
          musculoskeletalCon: this.musculoskeletalCon,
          musculoskeletalConDetails: this.musculoskeletalConDetails,
          sleepDisordersCon: this.sleepDisordersCon,
          sleepDisordersConDetails: this.sleepDisordersConDetails,
          endocrineDisordersCon: this.endocrineDisordersCon,
          endocrineDisordersConDetails: this.endocrineDisordersConDetails,
          behaviouralDisordersCon: this.behaviouralDisordersCon,
          behaviouralDisordersConDetails: this.behaviouralDisordersConDetails,
          visualCon: this.visualCon,
          visualConDetails: this.visualConDetails,
          hearingCon: this.hearingCon,
          hearingConDetails: this.hearingConDetails,
          speechCon: this.speechCon,
          speechConDetails: this.speechConDetails,
          bowelCon: this.bowelCon,
          bowelConDetails: this.bowelConDetails,
          kidneyCon: this.kidneyCon,
          kidneyConDetails: this.kidneyConDetails,
          liverCon: this.liverCon,
          liverConDetails: this.liverConDetails,
          allergiesCon: this.allergiesCon,
          allergiesConDetails: this.allergiesConDetails,
          sleepingCon: this.sleepingCon,
          sleepingConDetails: this.sleepingConDetails,
          medication: this.medication,
          medicationDetails: this.medicationDetails,
          medicalTreatment: this.medicalTreatment,
          medicalTreatmentDetails: this.medicalTreatmentDetails,
          tests: this.tests,
          testsDetails: this.testsDetails,
          otherHealthAspects: this.otherHealthAspects,
          otherHealthAspectsDetails: this.otherHealthAspectsDetails
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
          alcoholDetails: this.alcoholDetails
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
