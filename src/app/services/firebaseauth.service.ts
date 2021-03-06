import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { AngularFire, FirebaseAuth, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from "@angular/router";
import { AppConfig } from "../config/app.config";
declare var $: any;

@Injectable()
export class AuthService {

  users: FirebaseListObservable<any[]>;
  cases: FirebaseListObservable<any[]>;
  regUser: FirebaseListObservable<any[]>;
  caseResponse: FirebaseListObservable<any[]>;
  userData: any;

  private db = AppConfig.database;

  constructor(public af: AngularFire, public firebase: FirebaseAuth, private router: Router) {

    // this.users = af.database.list(this.db.doctors);
    // this.regUser = af.database.list(this.db.userNames);

  }//constructor

  isAuthenticated() {
    return this.af.auth.subscribe(
      user => { return !!user }
    );
  }

  login(provider) {
    //console.log(provider)
    this.af.auth.login({
      //provider: provider
    });

  }//login


  public _getUser() {
    return this.af.auth.map(
      response => this._changeState(response)
    );
  }//_getUser
  public getCases() {
    const db = this.af.database.list(this.db.cases);
    return db;
  }//get all cases

  public _getUserDetails(uid) {
    const db = this.af.database.object(this.db.users + "/" + uid);
    return db;
  }//get each user details

  public _saveUser(uid, formData) {
    console.log("formdata", formData);
    const db = this.af.database.object(this.db.users + uid);
    return db.set(formData)

  }//_saveUser

  public _CaseResponse(uid, caseData) {
    console.log("casedata");
    console.log(caseData);
    // console.log(formsData.specializations);
    const db = this.af.database.list(this.db.cases);
    return db.push(caseData)

  }//_savePatientDetails

  _saveCaseQuotation(form, caseId, applicantId) {
    const db = this.af.database.object(this.db.caseResponse + "/" + caseId + "/" + applicantId);
    return db.set(form)
  }
  private _getUserInfo(user: any): any {

    if (!user) {
      //console.log("user call if null",user);
      return {};
    }
    //console.log("_getUserInfo",user);
    let data = user.auth.providerData[0];
    //console.log("data val test",data);
    if (data.displayName) {
      return {
        firstName: data.displayName.split(' ')[0],
        lastName: data.displayName.split(' ')[1],
        avatar: "https://graph.facebook.com/" + data.uid + "/picture?type=large",
        email: data.email,
        provider: data.providerId,
        uid: data.uid
      };
    }
    else {
      return {
        email: data.email,
        provider: data.providerId,
        uid: user.uid
      };

    }

  }//_getUserInfo
  fblogin() {
    console.log("doctor login firebase function called:");
    return (
      this.af.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup,
        // scope: ["manage_pages", "publish_pages", "ads_management", "user_friends", "user_relationships", "user_relationship_details", "pages_messaging", "business_management"]
      }).then(
        data => {
          console.log(data);
          $('#signupModal').hide();
          $('#loginModal').hide();
        }).catch(
        error => {
          console.log(error);
          if (error['code'] == "auth/web-storage-unsupported")
            alert('Oops! Seems like 3rd party cookies are disabled. You can change it to just allow us, if you want. Trust us! We are good people For Chrome, MORE (icon with 3 dots) > SETTINGS > ADVANCED (Section) > CONTENT SETTINGS > COOKIES > MANAGE EXCEPTIONS & Set your preference');
          else
            alert(error.message);
        }
        )
    )

  }
  public _getMedicalSpecialities() {
    return this.af.database.object(this.db.MedicalSpecialities);
  }
  glogin() {
    console.log("doctor login firebase function called:");
    return (
      this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup,
        // scope: ["manage_pages", "publish_pages", "ads_management", "user_friends", "user_relationships", "user_relationship_details", "pages_messaging", "business_management"]
      }).then(
        data => {
          console.log(data);
        }).catch(
        error => {
          console.log(error);
          if (error['code'] == "auth/web-storage-unsupported")
            alert('Oops! Seems like 3rd party cookies are disabled. You can change it to just allow us, if you want. Trust us! We are good people For Chrome, MORE (icon with 3 dots) > SETTINGS > ADVANCED (Section) > CONTENT SETTINGS > COOKIES > MANAGE EXCEPTIONS & Set your preference');
          else
            alert(error.message);
        }
        )
    )

  }
  private _changeState(user: any = null) {
    if (user) {
      //console.log("the user value in change state ",user);
      return {
        isAuth: true,
        user: this._getUserInfo(user)
      }
    }
    else {
      return {
        isAuth: false,
        user: {}
      }
    }

  }//_changeState()

  public _setUserData(userData) {
    this.userData = userData;
  }//_setUserData

  public _fetchDocUser(uid) {
    //console.log(this.db.docUsers + uid);
    return this.af.database.object(this.db.users + uid).map(
      res => {
        //console.log(res);
        if (!res.fullName) {
          //console.log("Doctor firstName not found")
          return false;
        } else {
          this._setUserData(res);
          return this.userData;
        }
      }//res
    );
  }//_fetchUser
    public _getHealthReports(uid) {
    console.log(this.db.caseResponse + uid);
    //console.log("uid data:", uid);
    //console.log("url", this.db.healthReports + uid);
    return this.af.database.object(this.db.caseResponse + uid);
  }//_getHealthReports

 public _saveHealthReports(data, caredoneId, index) {
    if (index == null || index == undefined)
      index = 0;
    return this.af.database.object(this.db.caseResponse + caredoneId + '/' + index)
      .set(data);
  }
}