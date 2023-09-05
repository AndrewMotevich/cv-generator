import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';
import { ICvName } from '../../../shared/interfaces/cv-name.interface';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-cvs-sidebar',
  templateUrl: './cvs-sidebar.component.html',
  styleUrls: ['./cvs-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsSidebarComponent implements OnInit {
  @Output() selectedId: EventEmitter<number> = new EventEmitter();
  @Output() deleteItem: EventEmitter<boolean> = new EventEmitter();
  public cvsNames: ICvName[];

  public id: number;

  constructor(private cvsFacade: CvsFacade, private cdr: ChangeDetectorRef) {}

  public ngOnInit() {
    this.cvsFacade.loadCvs();
    this.cvsFacade.cvsNames$.pipe(untilDestroyed(this)).subscribe((cvs) => {
      this.cvsNames = cvs;
      this.cdr.markForCheck();
    });
  }

  public addNewCv() {
    this.selectedId.emit(0);
    this.id = 0;
    if (!this.cvsNames.find((elem) => elem.id === 0)) {
      this.cvsNames.push({
        id: 0,
        cvName: 'New Cv',
      });
    }
    return;
  }

  public selectCv(cv: ICvName) {
    this.selectedId.emit(cv.id);
    this.id = cv.id
  }

  public deleteCv(event: Event, cv: ICvName) {
    event.stopPropagation();
    if (cv.id) {
      this.cvsFacade.deleteCv(cv.id);
    } else {
      this.cvsNames = this.cvsNames.filter((elem) => elem.id !== 0);
    }
    this.deleteItem.emit(true)
  }
}
