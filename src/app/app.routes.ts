import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';

export const MODULE_ROUTES: Route[] =[

    { path: '',  component:LandingPageComponent, pathMatch: 'full'  },
    
    


]

export const MODULE_COMPONENTS = [
    AppComponent,
    LandingPageComponent
    

]
