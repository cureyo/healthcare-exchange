import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/firebaseauth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;
@Component({
  templateUrl: 'header.component.html',
  selector: 'header-component',
  moduleId: module.id
})
export class HeaderComponent implements OnInit {

  private loginForm: FormGroup;
  private user: {};
  private isAuth: boolean;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    $.getScript('../../assets/js/jquery.bootstrap.js');
    $.getScript('../../assets/js/material-bootstrap-wizard.js');


  }
  emailLogin(model) {

  }
  public closeModal() {
    console.log("closing the damn thingie")
    $('#postcaseModal').hide();
  }
}