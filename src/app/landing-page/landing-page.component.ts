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

        this._authService._getUser()
      .subscribe(
      data => {
        if (!data.isAuth) {
          //window.location.href = window.location.origin + '/login?next=' + window.location.pathname;
        } else {
          this.isAuth = data.isAuth;
          this.user = data.user;
          this._authService._fetchDocUser(data.user.uid)
            .subscribe(res => {
              //console.log("from login: ");
              //console.log(res);
              if (res.hasOwnProperty('authUID')) {
                this.activatedRoute.queryParams
                  .subscribe(params => {
                      //console.log("query parameters");
                    //console.log(params);
                    if (params['next'] && params['next']!= '') {
                      window.location.href = window.location.origin + params['next'];
                    } else {
                      window.location.href = window.location.origin + '/dashboard';
                    }
                 });

              } else {
                this.router.navigate(['doctor-checkup']);

              }

            })
        }
      },
      error => console.log(error)
      );
      this.loginForm=this._fb.group({
        //  fname:[],
         email:[,Validators.required],
         psw:[]
       })

      }
}