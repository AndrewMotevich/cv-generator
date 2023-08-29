import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IColumns } from '../../interfaces/columns.interfeces';

@Component({
  selector: 'cv-gen-base-table1',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './base-table1.component.html',
  styleUrls: ['./base-table1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTable1Component {
  @Input() data: unknown[];
  @Input() cols: IColumns[];
  @Output() itemInfo = new EventEmitter<unknown>()

  sendItemInfo(info: unknown) {
    this.itemInfo.emit(info)
  }
}
