import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TweetsStateService } from '../../services/tweets-state.service';
import { UserStateService } from '../../services/user-state.service';
import { CoreDataService } from '../../services/core-data.service';
import { Tweet } from '../../models/tweet';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  tweetId: string;

  tweetData$: Observable<any>;

 constructor(private data: CoreDataService, public userState: UserStateService, private route: ActivatedRoute, public replyDialog: MatDialog) { 
  }

  ngOnInit() {
    this.tweetData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.tweetId = params.get('id');
        return this.data.getTweet(this.tweetId);
      })
    )
  }


}
