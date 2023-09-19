import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CoreFacade } from '../../../ngrx/core/core.facade';

@UntilDestroy()
@Component({
  selector: 'cv-gen-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  public breadcrumbs = this.coreFacade.breadcrumbs$;
  public pageData = this.coreFacade.pageData$;

  constructor(private coreFacade: CoreFacade) {}
}
