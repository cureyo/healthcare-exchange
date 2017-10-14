import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
 import { AuthService } from "./services/firebaseauth.service";
import { FacebookInitParams, FacebookLoginResponse, FacebookService } from "ng2-facebook-sdk";
 import { AppConfig } from "./config/app.config";
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';


declare var $: any

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  moduleId: module.id,
  
  // providers: [AuthService, AngularFire, FacebookService]
})

export class AppComponent implements OnInit{

  private currentUser: any;
  private isAuth: boolean;
  private fbAccessToken: string;
  private sideBarCover: any;
  private caredOnes: any;
  private user: any;
  private showLoginMod: boolean = false;
  private noCaredOnes: boolean = false;
  public showSideBar: boolean = false;
  // private isLogin: boolean = false;



  constructor(
    private route: ActivatedRoute,
   private _authService: AuthService,
    private fs: FacebookService,
    private router: Router,
    
    location: PlatformLocation
  ) {
    location.onPopState(() => {
      //console.log('pressed back!');

    });




  }//constructor

ngOnInit() {
   this._authService._getUser()
      .subscribe(
      data => {
        console.log(data);
        if (!data.isAuth) {
          //window.location.href = window.location.origin + '/login?next=' + window.location.pathname;
        } else {
          this.isAuth = data.isAuth;
          this.user = data.user;
          this._authService._fetchDocUser(data.user.uid)
            .subscribe(res => {
              //console.log("from login: ");
              console.log(res);
              if (res.hasOwnProperty('fullName')) {
                // this.activatedRoute.queryParams
                //   .subscribe(params => {
                //       //console.log("query parameters");
                //     //console.log(params);
                   
                //  });

                console.log("logged in");
                this.router.navigate(['listings']);

              } else {
                // this.router.navigate(['listings']);
                this.router.navigate(['register']);

              }

            })
        }
      },
      error => console.log(error)
      );

}



}
