import { Component, OnInit } from '@angular/core';
import { TweetsStateService } from '../../services/tweets-state.service';
import { UserStateService } from '../../services/user-state.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoreDataService } from '../../services/core-data.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  profileData$: Observable<any>;
  userProfileId: string;

  constructor(public state: TweetsStateService, private data: CoreDataService , public userState: UserStateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.profileData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userProfileId = params.get('userId');
        this.state.getTweetsById(this.userProfileId);
        return this.data.getMember(this.userProfileId);
      })
    )
  }

}
