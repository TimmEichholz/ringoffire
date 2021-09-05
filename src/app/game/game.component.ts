import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
pickCardAnimation = false;
currentCard:string|any ='';

  game!: Game;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  this.newGame();
  }
newGame(){
  this.game = new Game();
  console.log(this.game);
  
}

  takeCard(){
    if (!this.pickCardAnimation){
    this.currentCard = this.game.stack.pop()
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = true
if(this.game.players.length>0){
    this.game.currentPlayer++
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }
    
    setTimeout(() => {
      this.pickCardAnimation = false
    }, 1200);
  }
  }
  openDialog():void{
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe((name:string) =>{
      if(name && name.length > 0){
      this.game.players.push(name);}
      console.log('the dialog was closed', name);
      
    })
  }

  
}


