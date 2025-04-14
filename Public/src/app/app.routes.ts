import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { MyeventsComponent } from './components/myevents/myevents.component';
import { CompanyRegComponent } from './components/company-reg/company-reg.component';
import { FooldalComponent } from './components/fooldal/fooldal.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


export const routes: Routes = [

    /**
   *  logged out routes
   */
    {
        path: 'login', component: LoginComponent
    },

    {
        path: 'passwordreset',
        loadComponent: () =>
            import('./components/password-reset/password-reset.component')
                .then(m => m.PasswordResetComponent)
    }
    ,

    {
        path: 'register' ,children: 
        [
            {
                path: 'userReg',  component: RegisterComponent
            },
            {
                path: 'companyReg', component: CompanyRegComponent
            }
        ]
    },
    
    {
        path: 'landingpage', component: LandingpageComponent
    },
    {
        path: '', component: LandingpageComponent
    },
    
    /**
   * logged in routes
   */

    {
        path: 'fooldal', component: FooldalComponent, canActivate: [UserAuthGuard]
    },

    {
        path: 'newevent', component: NeweventComponent, canActivate: [UserAuthGuard]
    },

    {
        path: 'myevents', component: MyeventsComponent, canActivate: [UserAuthGuard]
    },

    {
        path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard]
    },
    {
        path: 'stats', component: StatsComponent, canActivate: [UserAuthGuard]
    },

    /**
   * Other routes
   */
    
    {
        path: '**', redirectTo: '' 
    },
];
