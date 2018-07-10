import { Component } from '@angular/core';

import { asideMenuConfig } from '../../menuConfig';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public title = 'Home';
  public asideMenuConfig = asideMenuConfig;
}
