import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { TweetsStateService } from '../../services/tweets-state.service';
import { UserStateService } from '../../services/user-state.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ReplyDialogComponent } from '../reply-dialog/reply-dialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  messageText: string = '';
  private tweetsSubscription: Subscription;

  constructor(
    public state: TweetsStateService,
    public userState: UserStateService,
    public deleteDialog: MatDialog,
    public replyDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.tweetsSubscription = this.state.getAllTweets();
  }

  ngOnDestroy() {
    this.tweetsSubscription.unsubscribe();
  }

  clearText(element) {
    element.value = '';
  }

  userProfileToShow(userId: string) {
    this.router.navigate([`profile/${userId}`]);
  }

  openDialog(): void {
    const dialogRef = this.deleteDialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
      }
    });
  }

  postTweet() {
    this.state.postTweet(this.messageText);
    this.messageText = '';
  }

  tweetActions(event) {
    switch (event.actionType) {
      case 'delete':
        const dialogRef = this.deleteDialog.open(DialogComponent, {
          width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if (result) {
            this.state.deleteTweet(event.tweetId);
          }

        });
        break;
      case 'reply':
        this.replyDialogMethod(event.tweetId);
        break;
      case 'star':
        this.state.star(event.tweetId);
        break;
      case 'unstar':
        this.state.unstar(event.tweetId);
        break;


    }
  }

  replyDialogMethod(tweet: Tweet) {
    const dialogRef = this.replyDialog.open(ReplyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.state.reply(result, tweet._id);
      }

    });
  }

}
