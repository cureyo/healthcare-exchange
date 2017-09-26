import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { FacebookInitParams, FacebookLoginResponse, FacebookService } from "ng2-facebook-sdk";
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LandingPageModule} from "./landing-page/landing-page.module";

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';

import { FileSelectDirective, FileDropDirective, FileUploader, FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { PathLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';

import {Ng2AutoCompleteModule} from "ng2-auto-complete/dist/index";
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';

import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import {JsonpModule} from '@angular/http';

import {NgPipesModule} from 'ngx-pipes';
import {LandingPageComponent} from './landing-page/landing-page.component';
// Must export the config

var CONFIG = {
    apiKey: "AIzaSyChVGJ1hUJoncOy2OimrPoBF-dwtTA3kdA",
    authDomain: "cureyo-your-personal-hospital.firebaseapp.com",
    databaseURL: "https://cureyo-your-personal-hospital.firebaseio.com/",
    storageBucket: "cureyo-your-personal-hospital.appspot.com",
    messagingSenderId: "530369218586"
};
export const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup,
  scope: ["user_friends", "user_relationships", "user_relationship_details"]
}
export const firebaseConfig = {
  apiKey: CONFIG.apiKey,
  authDomain: CONFIG.authDomain,
  databaseURL: CONFIG.databaseURL,
  storageBucket: CONFIG.storageBucket,
};

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
        CommonModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    RouterModule.forChild(MODULE_ROUTES),
    BrowserModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    HttpModule,
    Ng2AutoCompleteModule,
    GooglePlaceModule,
    JsonpModule,


   NgPipesModule
  ],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, AngularFire, FacebookService, LandingPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
