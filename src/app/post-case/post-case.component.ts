import { Component, OnInit,Renderer2 } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {FormGroup, FormBuilder,Validators} from "@angular/forms";
// import {TagsInputComponents} from 'bootstrap-tagsinput';

declare var $ : any;
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

private loginForm:FormGroup;
  private user: {};
  private isAuth: boolean;
  private medSpecialities: any;

  constructor(private _fb: FormBuilder,private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

      ngOnInit() {
        $.getScript('../../assets/js/jquery.bootstrap.js');
        $.getScript('../../assets/js/material-bootstrap-wizard.js');
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
      
}