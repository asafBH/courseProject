import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.scss']
})
export class ReplyDialogComponent implements OnInit {
   replyTweet: string ='';
  constructor(public dialogRef: MatDialogRef<ReplyDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onReplyClick() {
    this.dialogRef.close(this.replyTweet);
  }

}
