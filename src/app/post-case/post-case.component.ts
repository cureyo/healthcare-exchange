import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
// import {TagsInputComponents} from 'bootstrap-tagsinput';

declare var $: any;
// @Component({
//   templateUrl: 'registration-page.component.html',
//   selector: 'registration-page',
//   styleUrls: './registration-page.component.css',
//   //styleUrls: ['./bloodsugar-carepath.component.css']
//   moduleId: module.id
// })
@Component({
    selector: 'post-case-component',
    templateUrl: 'post-case.component.html',

    //   styleUrls: ['pos-page.component.css']
})
export class PostCaseComponent implements OnInit {

    private postCaseForm: FormGroup;
    private loginForm: FormGroup;
    private user: {};
    private isAuth: boolean;
    private medSpecialities: any;
    private formReady: boolean = false;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        $.getScript('../../assets/js/jquery.bootstrap.js');
        $.getScript('../../assets/js/material-bootstrap-wizard.js');

        this.postCaseForm = this._fb.group({
            procedure: ['', Validators.required],
            speciality: this._fb.array([]),
            case: ['', Validators.required],
            // age: ['', Validators.required],
            // gender: ['', Validators.required],
            // condition: ['', Validators.required],
            patientForm: this._fb.array([
                this.initializePatient(null, null, null)
            ]),
            patientImages: ['', Validators.required]

        });

        this.formReady = true;
        this.getMedicalSpecialities();
    }
    initializePatient(age, gender, condition) {
        console.log("initializePatient", age, gender, condition);
        let control = this._fb.group({
            age: [age, Validators.required],
            gender: [gender, Validators.required],
            condition: [condition, Validators.required]
        });
        return control;
    }

    getMedicalSpecialities() {
        this._authService._getMedicalSpecialities()
            .subscribe(
            medData => {
                this.medSpecialities = medData;
                console.log("this.medSpecialities", this.medSpecialities)
            })
    }
     addPatientDetails(form) {
    const control = <FormArray>this.postCaseForm.controls['background'];
    control.push(this.initializePatient(null, null, null));
     }  

      onSubmit(model) {
    console.log(model, " model details ");
        // model['facilityArea'] = this.clinicAddress;
        // model['area'] = this.userAddress;
        // model['speciality'] = this.specs;
    console.log(model);
    this._authService._getUser().subscribe(userData => {
      console.log("user auth data", userData);
      this._authService._savePatient(userData.user.uid, model)
        .then(
        data => {
          console.log(data);
          this.router.navigate(['listings']);

        },
        error => console.log(error)
        );
    });

  }

}