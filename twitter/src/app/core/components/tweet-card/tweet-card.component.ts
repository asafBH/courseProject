import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TweetsStateService } from '../../services/tweets-state.service';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  private _loggedIn: boolean;

  @Input() tweetDetails;
  @Input() userDetails;
  @Input()
  set loggedIn(val) {
    if (val) {
      this._loggedIn = true;
    } else {
      this._loggedIn = false;
    }
  }

  get loggedIn() {
    return this._loggedIn;
  }
  @Output() tweetAction = new EventEmitter();
  @Output() userProfile = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  tweetReply() {
    this.tweetAction.emit({ actionType: 'reply', tweetId: this.tweetDetails });
  }

  tweetDelete() {
    this.tweetAction.emit({ actionType: 'delete', tweetId: this.tweetDetails._id });
  }

  star(event: any) {
    this.tweetAction.emit({ actionType: 'star', tweetId: this.tweetDetails._id });
  }

  unstar(event: any) {
    this.tweetAction.emit({ actionType: 'unstar', tweetId: this.tweetDetails._id });
  }

  //user to navigate profile page
  userTweet() {
    console.log(this.userDetails);
    this.userProfile.emit(this.tweetDetails.posterId);
    console.log(this.userProfile);
  }
}
