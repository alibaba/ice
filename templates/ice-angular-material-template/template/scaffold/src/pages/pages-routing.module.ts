import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { routerConfig } from '../routerConfig';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: routerConfig,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {}
