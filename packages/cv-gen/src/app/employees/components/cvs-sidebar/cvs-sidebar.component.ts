import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CvsFacade } from '../../../ngrx/cvs/cvs.facade';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'cv-gen-cvs-sidebar',
  templateUrl: './cvs-sidebar.component.html',
  styleUrls: ['./cvs-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvsSidebarComponent implements OnInit {
  @Output() selectedId: EventEmitter<number> = new EventEmitter();
  public cvsNames = this.cvsFacade.cvsNames$;

  constructor(private cvsFacade: CvsFacade) {}

  public ngOnInit() {
    this.cvsFacade.loadCvs();
  }

  public addNewCv() {
    console.log("ADD CV")
  }

  public selectCv(id: number) {
    this.selectedId.emit(id);
  }

  public deleteCv(event: Event, cv: { id?: number; cvName: string }) {
    event.stopPropagation();
    if (cv.id) {
      this.cvsFacade.deleteCv(cv.id);
    }
  }
}
