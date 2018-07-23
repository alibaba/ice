import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../app/@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../app/@core/data/smart-table.service';

@NgModule({
  imports: [ThemeModule, TablesRoutingModule, Ng2SmartTableModule],
  declarations: [...routedComponents],
  providers: [SmartTableService],
})
export class TablesModule {}
