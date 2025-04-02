import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

// Import Components
import { HomeComponent } from './app/home/home.component';
import { EventsComponent } from './app/events/events.component';
import { ExamScheduleComponent } from './app/exam-schedule/exam-schedule.component';
import { StudentDashboardComponent } from './app/student-dashboard/student-dashboard.component';
import { HostDashboardComponent } from './app/host-dashboard/host-dashboard.component';
import { AdminDashboardComponent } from './app/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'schedule', component: ExamScheduleComponent },

  // Dashboards
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'host-dashboard', component: HostDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect invalid URLs to home
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch(err => console.error(err));
