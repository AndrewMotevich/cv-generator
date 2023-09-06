import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CoreFacade } from '../../../ngrx/core/core.facade';
import { HOME } from '../../../shared/constants/routing-paths.consts';

@UntilDestroy()
@Component({
  selector: 'cv-gen-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  // public breadcrumbs: IBreadcrumb[] = [];

  public title: string;
  public pageInfo: string;
  public paramPathName: string;

  public readonly homeRote = HOME.path;

  constructor(private coreFacade: CoreFacade, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    // this.coreFacade.selectUrl$.pipe(untilDestroyed(this)).subscribe((value) => {
    //   console.log('CORE-url: ', value.substring(1).split('/'));
    // });
    this.coreFacade.selectQueryParams$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.pageInfo = value['label'] || '';
        this.paramPathName = value['pathName'] || '';
        console.log('CORE-query-params: ', value);
      });
    this.coreFacade.selectRouteData$
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (!this.pageInfo) {
          this.pageInfo = value['pageInfo'];
        }
        this.title = value['title'] || '';
        this.cdr.markForCheck();
        console.log('CORE-data: ', value);
      });
  }

  // public navigate(crumb: IBreadcrumb) {
  //   console.log(`Navigating to ${crumb.route}`);
  // }
}
