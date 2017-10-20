import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { HeaderComponent } from '../header/header.component'

declare var $: any;

@Component({
    selector: 'post-case-component',
    templateUrl: 'post-case.component.html',
})
export class PostCaseComponent implements OnInit {

    private postCaseForm: FormGroup;
    private loginForm: FormGroup;
    private user: {};
    private isAuth: boolean;
    private condition2: any = [];
    private medSpecialities: any;
    private specs2: any = [];
    private formReady: boolean = false;
    private medSReady: boolean = false;
    constructor(private _fb: FormBuilder,
        private headerComp: HeaderComponent,
        private _authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        $.getScript('../../assets/js/jquery.bootstrap.js');
        $.getScript('../../assets/js/material-bootstrap-wizard.js');
        $.getScript('../../assets/js/bootstrap-tagsinput.js');
        // $.getScript('../../assets/js/bootstrap-notify.js');

        this.postCaseForm = this._fb.group({
            procedure: ['', Validators.required],
            caseBrief: ['', Validators.required],
            speciality: this._fb.array([]),
            age: ['', Validators.required],
            gender: ['', Validators.required],
            condition: ['', Validators.required],
            patientImages: ['', Validators.required]

        });


        this.getMedicalSpecialities();
        this.formReady = true;
    }

    getMedicalSpecialities() {
        this._authService._getMedicalSpecialities()
            .subscribe(
            medData => {
                this.medSpecialities = medData;
                console.log("this.medSpecialities", this.medSpecialities)
                this.medSReady = true;
            }
            )
    }


    onSubmit(model) {
        var elmt = document.getElementById('conditionInput');

        console.log($(elmt).tagsinput('items'))
        console.log(model, " model details ");

        model['speciality'] = this.specs2;
        model['condition'] = $(elmt).tagsinput('items');


        console.log(model);
        this._authService._getUser().subscribe(userData => {
            console.log("user auth data", userData);
            model['postedBy'] = userData.user.uid;
            this._authService._fetchDocUser(userData.user.uid)
                .subscribe(
                docUserDets => {
                    model['area'] = docUserDets.area.formatted_address;
                    this._authService._saveCase(userData.user.uid, model)
                        .then(
                        data => {
                            console.log(data);
                            //  $('.modal').hide();
                            $.notify({
                                icon: "notifications",
                                message: "Case " + model['procedure'] + " has been posted. We will notify you once somebody applies."

                            }, {
                                    type: 'success',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });
                            this.headerComp.closeModal();



                        },
                        error => console.log(error)
                        );
                }
                )

        });

    }

}