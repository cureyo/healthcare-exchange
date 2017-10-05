import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

declare var $: any;

@Component({
  selector: 'registration-component',
  templateUrl: 'registration-page.component.html',
  styleUrls: ['registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  @Input() objectId: any;
  private registrationForm: FormGroup;
  private user: {};
  private isAuth: boolean;
  private isClinic: boolean = true;
  private isDoctor: boolean = true;
  private formReady: boolean = false;
  private clinicAddress: any;
  private medSpecialities: any;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(" %$#@#$ ", this.objectId);
    $.getScript('../../assets/js/jquery.bootstrap.js');
    $.getScript('../../assets/js/material-bootstrap-wizard.js');


    this.registrationForm = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      speciality: this._fb.array([]),
      phone: ['', Validators.required],
      medicalNumber: ['', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      education: this._fb.array([
        this.initializeEducation(null, null, null)
      ]),
      experience: this._fb.array([
        this.initializeExperience(null, null, null,null)
      ]),
      cases: this._fb.array([
        this.initializeCases(null, null, null,null)
      ]),
      facilityName: ['', Validators.required],
      facilityAddress: ['', Validators.required],
      facilityImages: ['', Validators.required],
      facilityArea: ['', Validators.required]
    });

    this.formReady = true;

   this.getMedicalSpecialities();
      }
 getMedicalSpecialities() {
        this._authService._getMedicalSpecialities()
            .subscribe(
            medData => {
                this.medSpecialities = medData;
                console.log("this.medSpecialities", this.medSpecialities)
            }
            )
    }

  initializeEducation(degree, institute,completionYear ) {
    console.log("initializeEducation", degree, institute,completionYear);
    let control = this._fb.group({
      degree: [degree, Validators.required],
      institute: [institute, Validators.required],
      completionYear: [completionYear, Validators.required]
    });
    return control;
  }
  addEducation(form) {
    const control = <FormArray>this.registrationForm.controls['education'];
    control.push(this.initializeEducation(null, null, null));

  }
    addExperience(form) {
    const control = <FormArray>this.registrationForm.controls['experience'];
    control.push(this.initializeExperience(null, null, null, null));

  }
    addCases(form) {
    const control = <FormArray>this.registrationForm.controls['cases'];
    control.push(this.initializeCases(null, null, null, null));

  }

   initializeExperience(role, org,fromYear, toYear ) {
    console.log("initializeExperience", role, org,fromYear, toYear );
    let control = this._fb.group({
      role: [role, Validators.required],
      org: [org, Validators.required],
      fromYear: [fromYear, Validators.required],
      toYear: [toYear, Validators.required],
    });
    return control;
  }
  initializeCases(brief, detail,images, patientBrief ) {
    console.log("initializeCases", brief, detail,images, patientBrief  );
    let control = this._fb.group({
      brief: [brief, Validators.required],
      images: [images, Validators.required],
      patientBrief: [patientBrief, Validators.required],
    });
    return control;
  }

  updateType(type) {
    if (type == 'both') {
      this.isClinic = this.isDoctor = true;
    }
    else if (type == 'clinic') {
      this.isClinic = !this.isClinic;
    } else if (type == 'doctor') {
      this.isDoctor = !this.isDoctor;
    }
  }
    getAddress(place:Event){
    this.clinicAddress=place;
    console.log("this is the places",this.clinicAddress);
  }

}    