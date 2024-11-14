import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cell',
  template: `
    <div class="cell" 
    [class.highlight]="highlight" 
    [class.first-color-cell]="firstColor"
    [class.second-color-cell]="secondColor">
      <p *ngIf="!hasKnight">{{ moveNumber || '' }}</p>
      <img 
       *ngIf="hasKnight"
        src="/assets/svg/knight.svg"
        class="cell-image"
       />
    </div>
  `,
  styleUrls: ['./cell.component.scss'],
  imports: [NgIf],
  standalone: true,
})
export class CellComponent {
  @Input() moveNumber: number | null = null;
  @Input() highlight = false;
  @Input() firstColor = false;
  @Input() secondColor = false;
  @Input() hasKnight = false;
}
