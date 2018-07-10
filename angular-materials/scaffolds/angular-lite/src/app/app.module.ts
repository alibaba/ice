import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { BlankLayoutComponent } from '../layouts/blank-layout/blank-layout.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  declarations: [AppComponent, HeaderComponent, BlankLayoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
