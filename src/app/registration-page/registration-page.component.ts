import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { HeaderComponent } from '../header/header.component'

declare var $: any;

@Component({
  selector: 'registration-component',
  templateUrl: 'registration-page.component.html',
  styleUrls: ['registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  @Input() objectId: any;
  private registrationForm: FormGroup;
  private isAuth: boolean;
  private isClinic: boolean = true;
  private isDoctor: boolean = true;
  private formReady: boolean = false;
  private clinicAddress: any;
  private userAddress: any;
  private user: any;
  private medSpecialities: any;
  private Profilephoto: any;
  private specs: any = [];
  constructor(
    private _fb: FormBuilder,
    private headerComp: HeaderComponent,
    private _authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(" %$#@#$ ", this.objectId);
    $.getScript('../../assets/js/jquery.bootstrap.js');
    $.getScript('../../assets/js/material-bootstrap-wizard.js');
    $('.modal-open').modal('hide');

     this._authService._getUser()
      .subscribe(
      usersProfile => {
        console.log(usersProfile);
        this.Profilephoto = usersProfile;
        console.log(this.Profilephoto.user.avatar)
      })

    this._authService._getUser()
      .subscribe(
      userData => {
        console.log(userData);
        this.user = userData.user;
        this.registrationForm = this._fb.group({
          fullName: [userData.user.firstName + " " + userData.user.lastName, Validators.required],
          email: [userData.user.email, Validators.required],
          speciality: this._fb.array([]),
          phone: ['', Validators.required],
          medicalNumber: ['', Validators.required],
          // city: ['', Validators.required],
          area: ['', Validators.required],
          education: this._fb.array([
            this.initializeEducation(null, null, null)
          ]),
          experience: this._fb.array([
            this.initializeExperience(null, null, null, null)
          ]),
          cases: this._fb.array([
            this.initializeCases(null, null, null, null)
          ]),
          facilityName: ['', Validators.required],
          facilityAddress: ['', Validators.required],
          facilityImages: ['', Validators.required],
          facilityArea: ['', Validators.required]
        });

        this.formReady = true;

        this.getMedicalSpecialities();


      })


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

  initializeEducation(degree, institute, completionYear) {
    console.log("initializeEducation", degree, institute, completionYear);
    let control = this._fb.group({
      degree: [degree, Validators.required],
      institute: [institute, Validators.required],
      completionYear: [completionYear, Validators.required]
    });
    return control;
  }
  addEducation(form) {
    const control = <FormArray>this.registrationForm.controls['education'];
    control.push(this.initializeEducation(null, null, null));

  }
  addExperience(form) {
    const control = <FormArray>this.registrationForm.controls['experience'];
    control.push(this.initializeExperience(null, null, null, null));

  }
  addCases(form) {
    const control = <FormArray>this.registrationForm.controls['cases'];
    control.push(this.initializeCases(null, null, null, null));

  }

  initializeExperience(role, org, fromYear, toYear) {
    console.log("initializeExperience", role, org, fromYear, toYear);
    let control = this._fb.group({
      role: [role, Validators.required],
      org: [org, Validators.required],
      fromYear: [fromYear, Validators.required],
      toYear: [toYear, Validators.required],
    });
    return control;
  }
  initializeCases(brief, detail, images, patientBrief) {
    console.log("initializeCases", brief, detail, images, patientBrief);
    let control = this._fb.group({
      brief: [brief, Validators.required],
      images: [images, Validators.required],
      patientBrief: [patientBrief, Validators.required],
    });
    return control;
  }

  updateType(type) {
    if (type == 'both') {
      this.isClinic = this.isDoctor = true;
    }
    else if (type == 'clinic') {
      this.isClinic = !this.isClinic;
    } else if (type == 'doctor') {
      this.isDoctor = !this.isDoctor;
    }
  }
  getAddress1(place: Event) {
    this.userAddress = place;
    delete this.userAddress.geometry;
    delete this.userAddress.photos;
    console.log("this is the places 1", this.userAddress);
  }
  getAddress2(place: Event) {
    this.clinicAddress = place;
    delete this.clinicAddress.geometry;
    delete this.clinicAddress.photos;
    console.log("this is the places 2", this.clinicAddress);
  }
  onSubmit(model) {
    console.log(model, " hi ");
    model['facilityArea'] = this.clinicAddress;
    model['area'] = this.userAddress;
    model['speciality'] = this.specs;
    console.log(model);
    this._authService._getUser().subscribe(userData => {
      console.log("user auth data", userData);
       model['postedBy'] = userData.user.uid;
      this._authService._saveUser(userData.user.uid, model)
        .then(
        data => {
          console.log(data);

            // this._authService._fetchDocUser(userData.user.uid)
            //     .subscribe(
            //     docUserDets => {
                    
            //         this._authService._CaseResponse(userData.user.uid, model)
            //             .then(
            //             data => {
            //                 console.log(data);
            //                 //  $('.modal').hide();
            //                 $.notify({
            //                     icon: "notifications",
            //                     message: "Case " + model['procedure'] + " has been posted. We will notify you once somebody applies."
            //                 }, {
            //                         type: 'success',
            //                         timer: 4000,
            //                         placement: {
            //                             from: 'top',
            //                             align: 'right'
            //                         }
            //                     });
            //                 this.headerComp.closeModal();
            //             },
            //             error => console.log(error)
            //             );
            //     })
          this.router.navigate(['listings']);

        },
        error => console.log(error)
        );
    });


  }

}    



































// import { Component, OnInit, Input } from '@angular/core';
// import { AuthService } from "../services/firebaseauth.service";
// import { Router, ActivatedRoute, Params } from "@angular/router";
// import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
// import { HeaderComponent } from '../header/header.component';
// //import { LocationAutocompleteComponent } from 'ng2-location-autocomplete/index';

// declare var $: any;



// @Component({
//   selector: 'registration-component',
//   templateUrl: 'registration-page.component.html',
//   styleUrls: ['registration-page.component.css'],
//   //directives: ['GoogleplaceDirective'],
// })
// export class RegistrationPageComponent implements OnInit {


//   @Input() objectId: any;
//   private registrationForm: FormGroup;
//   private isAuth: boolean;
//   private isClinic: boolean = true;
//   private isDoctor: boolean = true;
//   private formReady: boolean = false;
//   private clinicAddress: any;
//   private userAddress: any;
//   private user: any;
//   private medSpecialities: any;
//   private Profilephoto: any;
//   private specs: any = [];
//   constructor(
//     private _fb: FormBuilder,
//     private headerComp: HeaderComponent,
//     private _authService: AuthService,
//     private router: Router,
//     private activatedRoute: ActivatedRoute) { }

//   ngOnInit() {
//     console.log(" %$#@#$ ", this.objectId);
//     $.getScript('../../assets/js/jquery.bootstrap.js');
//     $.getScript('../../assets/js/material-bootstrap-wizard.js');
//     $('.modal-open').modal('hide');

//      this._authService._getUser()
//       .subscribe(
//       usersProfile => {
//         console.log(usersProfile);
//         this.Profilephoto = usersProfile;
//         console.log(this.Profilephoto.user.avatar)
//       })

//      this._authService._getUser()
//       .subscribe(
//       userData => {
//         console.log(userData);
//         this.Profilephoto = userData;
//         this.user = userData.user;
//         // this.Profilephoto = userData.user.avatar;
        
//         this.registrationForm = this._fb.group({
//           fullName: [userData.user.firstName + " " + userData.user.lastName, Validators.required],
//           profile_image: [userData.user.avatar, Validators.required],
//           email: [userData.user.email, Validators.required],
//           speciality: this._fb.array([]),
//           phone: ['', Validators.required],
//           medicalNumber: ['', Validators.required],
//           // city: ['', Validators.required],
//           area: ['', Validators.required],
//           ducation: this._fb.array([
//             this.initializeEducation(null, null, null)
//           ]),
//           experience: this._fb.array([
//             this.initializeExperience(null, null, null, null)
//           ]),
//           cases: this._fb.array([
//             this.initializeCases(null, null, null, null)
//           ]),
//           facilityName: ['', Validators.required],
//           facilityAddress: ['', Validators.required],
//           facilityImages: ['', Validators.required],
//           facilityArea: ['', Validators.required]
//         });

//         this.formReady = true;

//         this.getMedicalSpecialities();


//       })

//       console.log(this.Profilephoto);

//   }
//   getMedicalSpecialities() {
//     this._authService._getMedicalSpecialities()
//       .subscribe(
//       medData => {
//         this.medSpecialities = medData;
//         console.log("this.medSpecialities", this.medSpecialities)

//       }
//       )
//   }

//   initializeEducation(degree, institute, completionYear) {
//     console.log("initializeEducation", degree, institute, completionYear);
//     let control = this._fb.group({
//       degree: [degree, Validators.required],
//       institute: [institute, Validators.required],
//       completionYear: [completionYear, Validators.required]
//     });
//     return control;
//   }
//   addEducation(form) {
//     const control = <FormArray>this.registrationForm.controls['education'];
//     control.push(this.initializeEducation(null, null, null));

//   }
//   addExperience(form) {
//     const control = <FormArray>this.registrationForm.controls['experience'];
//     control.push(this.initializeExperience(null, null, null, null));

//   }
//   addCases(form) {
//     const control = <FormArray>this.registrationForm.controls['cases'];
//     control.push(this.initializeCases(null, null, null, null));

//   }

//   initializeExperience(role, org, fromYear, toYear) {
//     console.log("initializeExperience", role, org, fromYear, toYear);
//     let control = this._fb.group({
//       role: [role, Validators.required],
//       org: [org, Validators.required],
//       fromYear: [fromYear, Validators.required],
//       toYear: [toYear, Validators.required],
//     });
//     return control;
//   }
//   initializeCases(brief, detail, images, patientBrief) {
//     console.log("initializeCases", brief, detail, images, patientBrief);
//     let control = this._fb.group({
//       brief: [brief, Validators.required],
//       images: [images, Validators.required],
//       patientBrief: [patientBrief, Validators.required],
//     });
//     return control;
//   }

//   updateType(type) {
//     if (type == 'both') {
//       this.isClinic = this.isDoctor = true;
//     }
//     else if (type == 'clinic') {
//       this.isClinic = !this.isClinic;
//     } else if (type == 'doctor') {
//       this.isDoctor = !this.isDoctor;
//     }
//   }
//   getAddress1(place: Event) {
//     this.userAddress = place;
//     delete this.userAddress.geometry;
//     delete this.userAddress.photos;
//     console.log("this is the places 1", this.userAddress);
//   }
//   getAddress2(place: Event) {
//     this.clinicAddress = place;
//     delete this.clinicAddress.geometry;
//     delete this.clinicAddress.photos;
//     console.log("this is the places 2", this.clinicAddress);
//   }
//   onSubmit(model) {
//     console.log(model, " hi ");
//     model['facilityArea'] = this.clinicAddress;
//     model['area'] = this.userAddress;
//     model['speciality'] = this.specs;
//     console.log(model);
//     this._authService._getUser().subscribe(userData => {
//       console.log("user auth data", userData);
//        model['postedBy'] = userData.user.uid;
//       this._authService._saveUser(userData.user.uid, model)
//         .then(
//         data => {
//           console.log(data);

//             // this._authService._fetchDocUser(userData.user.uid)
//             //     .subscribe(
//             //     docUserDets => {
                    
//             //         this._authService._CaseResponse(userData.user.uid, model)
//             //             .then(
//             //             data => {
//             //                 console.log(data);
//             //                 //  $('.modal').hide();
//             //                 $.notify({
//             //                     icon: "notifications",
//             //                     message: "Case " + model['procedure'] + " has been posted. We will notify you once somebody applies."

//             //                 }, {
//             //                         type: 'success',
//             //                         timer: 4000,
//             //                         placement: {
//             //                             from: 'top',
//             //                             align: 'right'
//             //                         }
//             //                     });
//             //                 this.headerComp.closeModal();

//             //             },
//             //             error => console.log(error)
//             //             );
//             //     })

//           this.router.navigate(['listings']);

//         },
//         error => console.log(error)
//         );
//     });


//   }

// }    