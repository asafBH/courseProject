import { Component } from '@angular/core';
import { LocalizationService } from './services/localization.service';
import { slideInAnimation } from 'src/animationts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'twitter';

  constructor(public localization: LocalizationService) {}
}
