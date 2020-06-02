import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  data

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

  ngOnInit() {
  }

  submit(){
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
    empHistory:{
      absentSickness: this.absentSickness,
      absentSicknessDetails: this.absentSicknessDetails,
      deniedJob: this.deniedJob,
      deniedJobDetails: this.deniedJobDetails,
      illnessByWork: this.illnessByWork,
      illnessByWorkDetails: this.illnessByWorkDetails
    },
    medHistory:{
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
    lifeStyle:{
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
    confirmation:{
      empSponsor: this.empSponsor
    }
    }
    console.log("THIS.DATA", this.data)
  }

}
