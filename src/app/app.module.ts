import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider, Renderer2 } from '@angular/core';
import { CONFIG } from '../app/config/firebase.config';
import { AuthService } from "./services/firebaseauth.service";

import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { FacebookInitParams, FacebookLoginResponse, FacebookService } from "ng2-facebook-sdk";
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {LandingPageModule} from "./landing-page/landing-page.module";

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';

import { FileSelectDirective, FileDropDirective, FileUploader, FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { PathLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';

import { Ng2AutoCompleteModule } from "ng2-auto-complete/dist/index";
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';

import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import { JsonpModule } from '@angular/http';

import { NgPipesModule } from 'ngx-pipes';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { HeaderComponent } from './header/header.component';
import { ListingPageComponent } from './listings-page/listing-page.component';
import { PostCaseComponent } from './post-case/post-case.component';
// import { TagInputModule } from 'ng2-tag-input';
import { TagInputComponent, TagComponent, TagInputModule, TagInputForm } from 'ng2-tag-input';
import {RlTagInputModule} from 'angular2-tag-input';
// Must export the config

export const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup,
  // scope: ["user_friends", "user_relationships", "user_relationship_details"]
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
    LandingPageComponent,
    RegistrationPageComponent,
    ListingPageComponent,
    HeaderComponent,
    PostCaseComponent,
    // TagInputDropdown,
    // TagInputComponent,
    // TagInputModule
    
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
    TagInputModule,
    RlTagInputModule,
    // TagInputComponent,
    // TagInputDropdown,
    NgPipesModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, AngularFire, TagComponent, FacebookService, ListingPageComponent, PostCaseComponent, HeaderComponent, LandingPageComponent, TagInputComponent, TagInputModule, RegistrationPageComponent, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
