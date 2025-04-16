import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { UserDetailComponent } from '../pages/user-detail/user-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    // Removed renderMode and added a comment for prerendering configuration
    // Prerendering configuration should be handled in the server-side setup
  },
  { path: '**', redirectTo: '/home' },
];
