import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {FormGroup, FormBuilder,Validators, FormArray} from "@angular/forms";

declare var $ : any;

@Component({
  selector: 'registration-component',
  templateUrl: 'registration-page.component.html',
  styleUrls: ['registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  @Input() objectId: any;
private loginForm:FormGroup;
  private user: {};
  private isAuth: boolean;

  constructor(
    private _fb: FormBuilder,
  private _authService: AuthService, 
  private router: Router, 
  private activatedRoute: ActivatedRoute) { }

      ngOnInit() {
        console.log(" %$#@#$ ",this.objectId);
        $.getScript('../../assets/js/jquery.bootstrap.js');
        $.getScript('../../assets/js/material-bootstrap-wizard.js');
    

        this.loginForm = this._fb.group({
              name: ['', Validators.required],
              email: ['', Validators.required],
              duration: ['', Validators.required]
        });
  
      }
      
}    