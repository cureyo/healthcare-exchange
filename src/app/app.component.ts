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
  providers: [AuthService, AngularFire, FacebookService]
})

export class AppComponent implements OnInit{

  private currentUser: any;
  private isAuth: boolean;
  private fbAccessToken: string;
  private sideBarCover: any;
  private caredOnes: any;
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

}



}
