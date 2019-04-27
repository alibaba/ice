import { Component } from '@angular/core';

import { headerMenuConfig, asideMenuConfig } from '../menuConfig';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  headerMenus = headerMenuConfig;
  asideMenus = asideMenuConfig;
}
