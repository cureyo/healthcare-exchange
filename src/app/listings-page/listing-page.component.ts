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

  private loginForm: FormGroup;
  private user: {};
  private isAuth: boolean;
  private caseData: any = [];

  constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    $('.modal').hide();
    this.loginForm = this._fb.group({
      fname: [],
      email: [, Validators.required],
      psw: []
    })
    this._authService.getCases()
      .subscribe(
      casesData => {
        this.caseData = casesData;
        console.log("this.caseData", this.caseData)
      }
      )
  }
  emailLogin(model) {

  }
}