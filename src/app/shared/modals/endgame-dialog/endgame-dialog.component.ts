import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgame-dialog.component.html',
  styleUrls: ['./endgame-dialog.component.scss']
})
export class EndgameDialogComponent {
  status: string;
  text: string;
  class: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {isWin: boolean}
  ) {
    this.status = data.isWin ? 'win' : 'lose'
    this.text = 'you ' + this.status;
    this.class = this.status;
    this.playAudio();
  }


  playAudio() {
    let audio = new Audio();
    audio.src = './assets/audio/'+this.status+'.mp3';
    audio.load();
    setTimeout(()=> {
      audio.play();
    }, 500)
  }
}
