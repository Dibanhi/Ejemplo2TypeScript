import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule), canLoad: [LoginGuard]
  },
  {
    path: 'lugares',
    loadChildren: () => import('./lugares/lugares.module').then( m => m.LugaresPageModule)
  },
  {
    path: 'reservaciones',
    loadChildren: () => import('./reservaciones/reservaciones.module').then( m => m.ReservacionesPageModule), canLoad: [LoginGuard]
  },
];

const routes: Routes = [
  { path: '', redirectTo: 'lugares', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login.module').then ( m => m.LoginPageModule)},
  { path: 'lugares', loadChildren: () => import('./lugares/lugares.module').then( m => m.LugaresPageModule)},
  { path: 'reservaciones', loadChildren: ( => import('./reservaciones/reservaciones.module').yhen( m=> m.ReservacionesPageModule))}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
