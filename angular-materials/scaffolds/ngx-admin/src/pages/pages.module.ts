import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ThemeModule } from '../app/@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { PagesRoutingModule } from './pages-routing.module';

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [...PAGES_COMPONENTS],
})
export class PagesModule {}
