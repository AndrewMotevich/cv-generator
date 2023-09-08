import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { HOME } from '../../../shared/constants/routing-paths.consts';
import { IBreadcrumb } from '../../../shared/interfaces/breadcrumbs.interface';

@UntilDestroy()
@Component({
  selector: 'cv-gen-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[] = [];

  public title: string;
  public pageInfo: string;
  public paramPathName: string;

  public readonly homeRote = HOME.path;

  constructor(private coreFacade: CoreFacade, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    console.log()
  }
}
