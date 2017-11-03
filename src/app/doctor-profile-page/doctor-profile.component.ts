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
  private doctorForm: boolean = false;
  private user: any = [];
  private isAuth: boolean;
  private userId: any;

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
       this.user = Detaildata;
        console.log("this.user ", this.user)
      })   
      
         
   })

  }
 

  //   onSubmit(model, caseId) {
  //   console.log(model, " hi ");
  //   console.log(model);
  //   this._authService._getUser().subscribe(userData => {
  //     console.log("user auth data", userData);
  //     // saveFunction(form.value, case.$key)
  //     model['applicantId'] = userData.user.uid;
  //     this._authService._saveCaseQuotation(model, caseId, model['applicantId'] )
  //       .then(
  //       data => {
  //         console.log(data);
  //         // this.router.navigate(['listings']);

  //       },
  //       error => console.log(error)
  //        );
  //   });

  // }
}