import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BlockModule } from '../src/index.module';

platformBrowserDynamic()
  .bootstrapModule(BlockModule)
  .catch(err => console.error(err));
