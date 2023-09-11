import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { CvDto } from '../../models/cvs.model';

@UntilDestroy()
@Component({
  selector: 'cv-gen-cv-html-template',
  templateUrl: './cv-html-template.component.html',
  styleUrls: ['./cv-html-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvHtmlTemplateComponent implements OnInit {
  public cv: CvDto;

  constructor(private cvsFacade: CvsFacade, private location: Location) {}

  public ngOnInit() {
    this.cvsFacade.selectedCv$
      .pipe(untilDestroyed(this))
      .subscribe((cv) => (this.cv = cv));
    // this.location.back()
  }
}
