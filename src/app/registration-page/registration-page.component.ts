import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {FormGroup, FormBuilder,Validators} from "@angular/forms";

declare var $ : any;
// @Component({
//   templateUrl: 'registration-page.component.html',
//   selector: 'registration-page',
//   styleUrls: './registration-page.component.css',
//   //styleUrls: ['./bloodsugar-carepath.component.css']
//   moduleId: module.id
// })
@Component({
  selector: 'registration-component',
  templateUrl: 'registration-page.component.html',
  styleUrls: ['registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

private loginForm:FormGroup;
  private user: {};
  private isAuth: boolean;

  constructor(private _fb: FormBuilder,private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

      ngOnInit() {
        $.getScript('../../assets/js/jquery.bootstrap.js');
        $.getScript('../../assets/js/material-bootstrap-wizard.js');
     
      }
      
}