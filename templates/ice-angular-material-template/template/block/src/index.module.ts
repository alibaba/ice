import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { <%= className %> } from './index.component';

@NgModule({
  declarations: [<%= className %>],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [<%= className %>],
})
export class BlockModule {}
