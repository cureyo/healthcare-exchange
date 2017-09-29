import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';

export const MODULE_ROUTES: Route[] =[

    { path: '',  component:LandingPageComponent, pathMatch: 'full'  },
    { path: 'register',  component:RegistrationPageComponent, pathMatch: 'full'  },
    
    


]

export const MODULE_COMPONENTS = [
    AppComponent,
    LandingPageComponent,
    RegistrationPageComponent
    

]
