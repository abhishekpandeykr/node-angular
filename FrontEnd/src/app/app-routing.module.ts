import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: async () =>
      (await import('./user-details/user-details.module')).UserDetailsModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
