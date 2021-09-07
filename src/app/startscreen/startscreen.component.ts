import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
  }

  newGame(){
    //generates firestore database or a new game
    let game = new Game(); 
    
    this.firestore
       .collection('games')
       .add(game.toJson())
       .then((gameInfo: any)=>{
         
         this.router.navigateByUrl('/game/'+ gameInfo.id)
       })



    //start Game
   
  }
}
