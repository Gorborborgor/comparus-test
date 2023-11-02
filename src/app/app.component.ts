import { Component, QueryList, ViewChildren } from '@angular/core';
import { CellDirective } from './shared/directives/cell.directive';
import { MatDialog } from '@angular/material/dialog';
import { EndgameDialogComponent } from './shared/modals/endgame-dialog/endgame-dialog.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  size: number = 10;
  playerScore: number = 0;
  compScore: number = 0;
  elements: number[] = Array(this.size).fill(1).map((x,i)=>i);
  previousCells: number[] = [];

  isInGame: boolean = false;
  isAfterGame: boolean = false;

  time: FormControl = new FormControl(1000, [Validators.pattern("^[0-9]*$"),]);

  @ViewChildren(CellDirective) cells!: QueryList<CellDirective>;

  constructor(public dialog: MatDialog) {}

  onStart() {
    this.isInGame = true;
    this.activateCell();
  }

  activateCell() {
    let cellNumber = this.getRandomNumber(0, 99);
    while(this.previousCells.indexOf(cellNumber) !== -1) {
      cellNumber = this.getRandomNumber(0, 99)
    }

    this.previousCells.push(cellNumber)

    this.cells.get(cellNumber)!.status = 'active';
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onIsClicked(clicked: boolean) {
    if(clicked) {
      this.playerScore += 1;
    } else {
      this.compScore += 1;
    }

    if(this.playerScore === 10 || this.compScore === 10) {
      const dialogRef = this.dialog.open(EndgameDialogComponent, {
        width: '500px',
        data: {
          isWin: this.playerScore === 10
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isAfterGame = true;
      });
    } else {
      this.activateCell();
    }
  }

  onReload() {
    this.isInGame = false;
    this.isAfterGame = false;
    this.playerScore = 0;
    this.compScore = 0;
    this.previousCells = [];
    this.cells.forEach(cell => cell.reload())
  }
}
