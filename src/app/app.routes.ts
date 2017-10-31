import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {ListingPageComponent} from './listings-page/listing-page.component';
import { PostCaseComponent } from './post-case/post-case.component';
import { DoctorProfileComponent } from './doctor-profile-page/doctor-profile.component';

export const MODULE_ROUTES: Route[] =[

    { path: '',  component:LandingPageComponent, pathMatch: 'full'  },
    { path: 'register',  component:RegistrationPageComponent, pathMatch: 'full'  },
    { path: 'listings',  component:ListingPageComponent, pathMatch: 'full'  },
    { path: 'postCase',  component:PostCaseComponent, pathMatch: 'full'  },
    { path: 'doctorProfile',  component:DoctorProfileComponent, pathMatch: 'full'  }
    
]

export const MODULE_COMPONENTS = [
    AppComponent,
    LandingPageComponent,
    RegistrationPageComponent,
    ListingPageComponent,
    PostCaseComponent,
    DoctorProfileComponent
   
]
