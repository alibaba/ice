import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeModule } from './home';
import { AboutModule } from './about';

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [PagesRoutingModule, CommonModule, HomeModule, AboutModule],
  declarations: [...PAGES_COMPONENTS],
})
export class PagesModule {}
