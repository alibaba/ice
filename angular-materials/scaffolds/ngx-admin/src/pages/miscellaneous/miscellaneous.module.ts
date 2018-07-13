import { NgModule } from '@angular/core';
import { ThemeModule } from '../../app/@theme/theme.module';
import {
  MiscellaneousRoutingModule,
  routedComponents,
} from './miscellaneous-routing.module';

@NgModule({
  imports: [ThemeModule, MiscellaneousRoutingModule],
  declarations: [...routedComponents],
})
export class MiscellaneousModule {}
