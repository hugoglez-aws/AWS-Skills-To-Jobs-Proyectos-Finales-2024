import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AllSchedulesComponent } from './components/shared/all-schedules/all-schedules.component';
import { UserSchedulesComponent } from './components/shared/user-schedules/user-schedules.component';
import { ManageActivitiesComponent } from './components/pages/manage-activities/manage-activities.component';
import { ManageCampagneComponent } from './components/pages/manage-campagne/manage-campagne.component';
import { ManageTypesComponent } from './components/pages/manage-types/manage-types.component';
import { ManageUsersComponent } from './components/pages/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: "schedules",
    component: AllSchedulesComponent,
    canActivate: [authGuard]
  },
  {
    path: "userSchedules",
    component: UserSchedulesComponent,
    canActivate: [authGuard]
  },
  {
    path: "manageA",
    component: ManageActivitiesComponent,
    canActivate: [authGuard]
  },
  {
    path: "manageC",
    component: ManageCampagneComponent,
    canActivate: [authGuard]
  },
  {
    path: "manageT",
    component: ManageTypesComponent,
    canActivate: [authGuard]
  },
  {
    path: "manageU",
    component: ManageUsersComponent,
    canActivate: [authGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
