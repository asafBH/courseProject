import { Injectable } from '@angular/core';
import { Store } from './store';
import { Tweet } from '../models/tweet';
import { CoreDataService } from './core-data.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetsStateService extends Store<Tweet[]> {

  constructor(private data: CoreDataService) {
    super([]);
  }

  getAllTweets() {
    this.data.getAllTweets().subscribe(tweets => {
      this.setState(tweets);
    });

    return interval(10000).pipe(
      switchMap(() => this.data.getAllTweets())
    ).subscribe(tweets => {
      this.setState(tweets);
    });
  }
  postTweet(message: string){
    this.data.postTweet(message).subscribe(tweet => {
      this.setState([...this.state, tweet]);
    })
  }
  deleteTweet(id: string){
    this.data.deleteTweet(id).subscribe(() => {
      const idx = this.state.findIndex(t => t._id === id);
      this.state.splice(idx, 1);
      this.setState(this.state);
    });
  }
  getTweetsById(id: string){
    this.data.getMemberTweets(id).subscribe(res => {
      this.setState(res);
    });
  }

  star(tweetId: string) {
    this.data.starToggle(tweetId).subscribe(res => {
      const idx = this.state.findIndex(t => t._id === tweetId);
      this.state[idx].isStaredByMe = true;
      this.state[idx].starCount++;
      this.setState(this.state);
    });
  }


  unstar(tweetId: string) {
    this.data.starToggle(tweetId).subscribe(res => {
      const idx = this.state.findIndex(t => t._id === tweetId);
      this.state[idx].isStaredByMe = false;
      this.state[idx].starCount--;
      this.setState(this.state);
    });
  }

  reply(message: string, tweetId: string) {
    this.data.replyTweet(message, tweetId).subscribe(res => {
      const idx = this.state.findIndex(t => t._id === tweetId);
      this.state[idx].reply.push((res as any).replyTweet);
    })
  }
}
