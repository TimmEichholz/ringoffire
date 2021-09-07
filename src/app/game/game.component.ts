import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  game!: Game;
  gameId! : string;

  constructor(
    private route: ActivatedRoute,

    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params.id);
this.gameId= params.id;

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game:any) => {
          console.log('game update', game)


          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimation = game.pickCardAnimation;

        });
    })


  }

  newGame() {
    this.game = new Game();


  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()
      this.game.playedCards.push(this.game.currentCard);


      
      this.game.pickCardAnimation = true
      if (this.game.players.length > 0) {
        this.game.currentPlayer++
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }
      this.saveGame()
      setTimeout(() => {
        
        this.game.pickCardAnimation = false
        this.saveGame()

      }, 1200);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame()
      }
      console.log('the dialog was closed', name);

    })
  }

  saveGame(){
    this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson())
  }


}


