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
import { PassResetSikeresComponent } from './components/pass-reset-sikeres/pass-reset-sikeres.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { FullScreenEventComponent } from './components/full-screen-event/full-screen-event.component';
import { ModEventComponent } from './components/mod-event/mod-event.component';
import { EventRatingComponent } from './components/event-rating/event-rating.component';
import { PassResetFinalComponent } from './components/pass-reset-final/pass-reset-final.component';
import { ModUserComponent } from './components/mod-user/mod-user.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';


export const routes: Routes = [

    /**
   *  logged out routes
   */
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'pass-reset-sikeres', component: PassResetSikeresComponent
    },
        {
        path: 'pass-reset-final', component: PassResetFinalComponent
    },

    {
        path: 'passwordreset',
        loadComponent: () =>
            import('./components/password-reset/password-reset.component')
                .then(m => m.PasswordResetComponent)
    },

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
        path: 'event', component: FullScreenEventComponent, canActivate: [UserAuthGuard]
    },
    {
        path: 'modevent', component: ModEventComponent, canActivate: [UserAuthGuard]
    },
     {
        path: 'moduser', component: ModUserComponent, canActivate: [UserAuthGuard]
    },
    {
        path: 'ratingevent', component: EventRatingComponent, canActivate: [UserAuthGuard]
    },
    {
        path: 'adminpage', component: AdminPageComponent, canActivate: [AdminAuthGuard]
    },
    {
        path: 'adminevents', component: AdminEventsComponent, canActivate: [AdminAuthGuard]
    },
    {
        path: 'admincategories', component: AdminCategoriesComponent, canActivate: [AdminAuthGuard]
    },
    {
        path: 'stats', component: StatsComponent, canActivate: [AdminAuthGuard]
    },

    /**
   * Other routes
   */
    
    {
        path: '**', redirectTo: '' 
    },
];
