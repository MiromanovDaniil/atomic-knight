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
      <ng-container *ngIf="hasKnight">
      <img 
        src="/assets/svg/knight.svg" width="50" height="50" 
        style="filter: brightness(0) saturate(100%) invert(44%) sepia(94%) saturate(4953%) hue-rotate(95deg) brightness(98%) contrast(105%); pointer-events: none;" 
       />
      </ng-container>
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
