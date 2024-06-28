import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeButtonComponent } from './components/shared/theme-button/theme-button.component';
import { FormComponent } from './components/shared/form/form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginFormComponent } from './components/shared/login-form/login-form.component';
import { AllSchedulesComponent } from './components/shared/all-schedules/all-schedules.component';
import { TokenAuthInterceptor } from './interceptors/tokenAuth/token-auth.interceptor';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ScheduleCardComponent } from './components/shared/schedule-card/schedule-card.component';
import { ScheduleModalComponent } from './components/shared/schedule-modal/schedule-modal.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UserSchedulesComponent } from './components/shared/user-schedules/user-schedules.component';
import { UserScheduleCardComponent } from './components/shared/user-schedule-card/user-schedule-card.component';
import { NoActivityFoundComponent } from './components/shared/no-activity-found/no-activity-found.component';
import { UserScheduleModalComponent } from './components/shared/user-schedule-modal/user-schedule-modal.component';
import { ManageActivitiesComponent } from './components/pages/manage-activities/manage-activities.component';
import { ActivityModalComponent } from './components/shared/activity-modal/activity-modal.component';
import { AddActivityComponent } from './components/shared/add-activity/add-activity.component';
import { ManageCampagneComponent } from './components/pages/manage-campagne/manage-campagne.component';
import { CampagneModalComponent } from './components/shared/campagne-modal/campagne-modal.component';
import { AddCampagneComponent } from './components/shared/add-campagne/add-campagne.component';
import { ConfirmationModalComponent } from './components/shared/confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from './components/shared/success-modal/success-modal.component';
import { ManageTypesComponent } from './components/pages/manage-types/manage-types.component';
import { TypeModalComponent } from './components/shared/type-modal/type-modal.component';
import { AddTypeComponent } from './components/shared/add-type/add-type.component';
import { GoogleAuthBtnComponent } from './components/shared/google-auth-btn/google-auth-btn.component';
import { ViewCommentsComponent } from './components/shared/view-comments/view-comments.component';
import { ProfileCardComponent } from './components/shared/profile-card/profile-card.component';
import { UserInfoModalComponent } from './components/shared/user-info-modal/user-info-modal.component';
import { AddScheduleComponent } from './components/shared/add-schedule/add-schedule.component';
import { ManageUsersComponent } from './components/pages/manage-users/manage-users.component';
import { UserCardComponent } from './components/shared/user-card/user-card.component';
import { ProfileInfoModalComponent } from './components/shared/profile-info-modal/profile-info-modal.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ThemeButtonComponent,
    FormComponent,
    RegisterPageComponent,
    ConfirmationComponent,
    NotFoundComponent,
    LoginComponent,
    HomeComponent,
    LoginFormComponent,
    AllSchedulesComponent,
    HeaderComponent,
    FooterComponent,
    ScheduleCardComponent,
    ScheduleModalComponent,
    UserSchedulesComponent,
    UserScheduleCardComponent,
    NoActivityFoundComponent,
    UserScheduleModalComponent,
    ManageActivitiesComponent,
    ActivityModalComponent,
    AddActivityComponent,
    ManageCampagneComponent,
    CampagneModalComponent,
    AddCampagneComponent,
    ConfirmationModalComponent,
    SuccessModalComponent,
    ManageTypesComponent,
    TypeModalComponent,
    AddTypeComponent,
    GoogleAuthBtnComponent,
    ViewCommentsComponent,
    ProfileCardComponent,
    UserInfoModalComponent,
    AddScheduleComponent,
    ManageUsersComponent,
    UserCardComponent,
    ProfileInfoModalComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenAuthInterceptor,
    multi: true
  },
  { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
