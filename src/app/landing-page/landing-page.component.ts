import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {FormGroup, FormBuilder,Validators} from "@angular/forms";

@Component({
  templateUrl: 'landing-page.component.html',
  selector: 'landing-page',
  moduleId: module.id
})
export class LandingPageComponent implements OnInit {

private loginForm:FormGroup;
  private user: {};
  private isAuth: boolean;

  constructor(private _fb: FormBuilder,private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

      ngOnInit() {

       
      this.loginForm=this._fb.group({
          fname:[],
         email:[,Validators.required],
         psw:[]
       })

      }
      emailLogin(model) {

      }
}