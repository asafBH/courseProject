import { Component, OnInit, OnChanges } from '@angular/core';

import { LocalizationService } from 'src/app/services/localization.service';
import { UserStateService } from 'src/app/core/services/user-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public localization: LocalizationService, public userState: UserStateService) { }
  ngOnInit() {
  }

  logout() {
  
  }
}
