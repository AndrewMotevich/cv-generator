import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cv-gen-about.page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.page.component.html',
  styleUrls: ['./about.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
