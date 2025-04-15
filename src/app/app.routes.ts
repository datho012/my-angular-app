// ✅ app.routes.ts (adjustment)
import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { UserDetailComponent } from '../pages/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, // ✅ cần có
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '/home' }, //  redirect to correct page if not found
];
