import { Component } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import {GameControlsComponent} from './components/game-controls/game-controls.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, GameControlsComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

}
