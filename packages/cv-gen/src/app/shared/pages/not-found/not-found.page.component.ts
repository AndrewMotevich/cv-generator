import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-gen-not-found.page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.page.component.html',
  styleUrls: ['./not-found.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {}
