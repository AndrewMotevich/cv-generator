import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'cv-gen-base-table2',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './base-table2.component.html',
  styleUrls: ['./base-table2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTable2Component {
  data = [{}]
}


