import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { filter } from 'rxjs';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { CvDto } from '../../models/cvs.model';

@UntilDestroy()
@Component({
  selector: 'cv-gen-cv-html-template',
  templateUrl: './cv-html-template.component.html',
  styleUrls: ['./cv-html-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvHtmlTemplateComponent implements OnInit, AfterViewInit {
  public cv: CvDto | null;
  private cvId: number;

  constructor(private cvsFacade: CvsFacade, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.cvId = Number(this.route.snapshot.paramMap.get('id'));
    this.cvsFacade.loadCvById(this.cvId);
    this.cvsFacade.selectedCv$
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((cv) => {
        this.cv = cv;
      });
  }

  public ngAfterViewInit() {
    const pdf = new jsPDF();

    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

      pdf.save(`${this.cv.firstName || 'unknown'}_CV.pdf`);
    });
  }
}
