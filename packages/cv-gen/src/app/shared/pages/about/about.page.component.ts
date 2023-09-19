import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { HOME } from '../../constants/routing-paths.consts';

@Component({
  selector: 'cv-gen-about.page',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './about.page.component.html',
  styleUrls: ['./about.page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  public homePath = HOME.fullPath
}
