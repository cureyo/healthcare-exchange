import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;

@Component({
  templateUrl: 'doctor-profile.component.html',
  selector: 'doctor-profile',
  moduleId: module.id
})
export class DoctorProfileComponent implements OnInit {

  @Input() objectId: any;
  private isAuth: boolean;
  private userId: any;
  private userData: any;
  private dt1: any;
  private dt2: any;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // $('.modal').hide();
    this._authService._getUser().subscribe(userData => {
      console.log("user auth data", userData);

      console.log(userData.user.uid)
      this.userId = userData.user.uid;
      this._authService._getUserDetails(this.userId)
        .subscribe(
        Detaildata => {
          console.log(Detaildata);
          this.userData = Detaildata;
          console.log("this.user ", this.userData)
        })


    })

    this.calculateExperience('04/02/2014', '11/04/2014');
    console.log(this.calculateExperience('04/02/2014', '11/04/2014'))

  }
  calculateExperience(date1, date2) {
    this.dt1 = new Date(date1);
    this.dt2 = new Date(date2);
    return Math.floor((Date.UTC(this.dt2.getFullYear(), this.dt2.getMonth(), this.dt2.getDate()) - Date.UTC(this.dt1.getFullYear(), this.dt1.getMonth(), this.dt1.getDate())) / (1000 * 60 * 60 * 24));

    

  }

}