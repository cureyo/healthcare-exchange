import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HeaderComponent } from '../header/header.component'

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

  constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, 
  private activatedRoute: ActivatedRoute,
  private headerComp: HeaderComponent) { }

  ngOnInit() {

    $('.modal').hide();
   
    this._authService.getCases()
      .subscribe(
      casesData => {
        this.caseData = casesData;
        console.log("this.caseData", this.caseData)
         this.ListingForm = this._fb.group({
      quotation: ['',Validators.required]
    })
        
      }
      )
  }
  emailLogin(model) {

  }

    onSubmit(model, caseId) {
    console.log(model, " hi ");
    console.log(model);
    this._authService._getUser().subscribe(userData => {
      console.log("user auth data", userData);
      // saveFunction(form.value, case.$key)
      model['applicantId'] = userData.user.uid;
      model['applicantName'] = userData.user.firstName + " " + userData.user.lastName 
      console.log(model['applicantName'], userData.user.fullname)
      this._authService._saveCaseQuotation(model, caseId, model['applicantId'] )
        .then(
        data => {
           console.log("data");
          console.log(data);

          $.notify({
                                icon: "notifications",
                                message: "Quotation " + model['quotation'] + " has been given by " + model['applicantName'] + "."

                            }, {
                                    type: 'success',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });
                            this.headerComp.closeModal();

        },
        error => console.log(error)
         );
    });

  }
}