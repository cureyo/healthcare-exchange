import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;

@Component({
  templateUrl: 'listing-page.component.html',
  selector: 'listing-page',
  moduleId: module.id
})
export class ListingPageComponent implements OnInit {

  private ListingForm: FormGroup;
  private user: {};
  private isAuth: boolean;
  private caseData: any = [];

  constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    $('.modal').hide();
   
    this._authService.getCases()
      .subscribe(
      casesData => {
        this.caseData = casesData;
        console.log("this.caseData", this.caseData)
         this.ListingForm = this._fb.group({
      fname: ['',Validators.required],
      email: ['', Validators.required],
      psw: ['', Validators.required]
    })
        
      }
      )
  }
  emailLogin(model) {

  }

    onSubmit(model) {
    console.log(model, " hi ");
    // model['facilityArea'] = this.clinicAddress;
    // model['area'] = this.userAddress;
    // model['speciality'] = this.specs;
    console.log(model);
    this._authService._getUser().subscribe(userData => {
      console.log("user auth data", userData);
      // saveFunction(form.value, case.$key)
      this._authService._saveCase(userData.user.uid, model)
        .then(
        data => {
          console.log(data);
          // this.router.navigate(['listings']);

        },
        error => console.log(error)
         );
    });

  }
}