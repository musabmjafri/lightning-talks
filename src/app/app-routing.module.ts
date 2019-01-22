import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralShellComponent } from './shell/general/general-shell.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralShellComponent,
    children: [
      {
        path: '',
        redirectTo: '/landing-page',
        pathMatch: 'full',
      },
      {
        path: 'landing-page',
        loadChildren: './home/home.module#HomeModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
