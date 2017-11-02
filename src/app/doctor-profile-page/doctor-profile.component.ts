import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;

@Component({
  templateUrl: 'doctor-profile.component.html',
  selector: 'doctor-profile',
  moduleId: module.id
})
export class DoctorProfileComponent implements OnInit {

  private DoctorForm: FormGroup;
  private doctorForm: boolean = false;
  private user: {};
  private isAuth: boolean;
  private caseData: any = [];

  constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

   // $('.modal').hide();
   
        this._authService._getUser()
      .subscribe(
      userData => {
        console.log(userData, userData.user.firstName);
        this.user = userData.user;

  this.doctorForm = true;

       this.DoctorForm = this._fb.group({
          fullName: [userData.user.firstName + " " + userData.user.lastName, Validators.required],
          Images: [userData.user.facilityImages, Validators.required],
          speciality: this._fb.array([]),
          Hospital: [userData.user.facilityName, Validators.required],
                  
       })
        this.doctorForm = true;

        console.log("this.DoctorForm ", this.DoctorForm)
         
         
   })

  }
 

  //   onSubmit(model, caseId) {
  //   console.log(model, " hi ");
  //   console.log(model);
  //   this._authService._getUser().subscribe(userData => {
  //     console.log("user auth data", userData);
  //     // saveFunction(form.value, case.$key)
  //     model['applicantId'] = userData.user.uid;
  //     this._authService._saveCaseQuotation(model, caseId, model['applicantId'] )
  //       .then(
  //       data => {
  //         console.log(data);
  //         // this.router.navigate(['listings']);

  //       },
  //       error => console.log(error)
  //        );
  //   });

  // }
}