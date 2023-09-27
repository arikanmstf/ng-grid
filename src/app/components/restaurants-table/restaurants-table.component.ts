import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  RestaurantDTO,
  PaginationMeta,
  GetRestaurantsParams,
} from '../../services/restaurant.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface FilterOption {
  value: '' | RestaurantDTO['status'];
  label: string;
}

type PaginationChangeParams = {
  length?: number;
  pageIndex?: number;
  pageSize?: number;
  previousPageIndex?: number;
};

const FILTER_OPTIONS: FilterOption[] = [
  {
    value: '',
    label: 'All restaurants',
  },
  { value: 'INACTIVE', label: 'Inactive restaurants' },
  { value: 'ACTIVE', label: 'Active restaurants' },
];

@Component({
  selector: 'app-restaurants-table',
  templateUrl: './restaurants-table.component.html',
  styleUrls: ['./restaurants-table.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  standalone: true,
})
export class RestaurantsTableComponent implements AfterViewInit {
  @Input() restaurants!: RestaurantDTO[];
  @Input() paginationMeta: PaginationMeta = {
    page: 0,
    itemCount: 0,
    pageCount: 0,
    take: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };
  @Input() loading = false;
  @Input() onSearchChange!: (params: GetRestaurantsParams) => void;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild('tableAndForm') tableAndForm!: ElementRef;

  displayedColumns: string[] = [
    'name',
    'status',
    'address',
    'website',
    'action',
  ];
  dataSource: MatTableDataSource<RestaurantDTO>;
  filterOptions: FilterOption[] = FILTER_OPTIONS;
  tableHeight = 0;

  constructor() {
    this.dataSource = new MatTableDataSource(this.restaurants);
  }

  private setSort() {
    this.dataSource.sort = this.sort;
  }

  private setHeight() {
    this.tableHeight = this.tableAndForm?.nativeElement?.offsetHeight || 0;
  }

  onPaginationChange(params: PaginationChangeParams) {
    this.onSearchChange({
      page: (params.pageIndex || 0) + 1, // mat-paginator page index starts from 0, BE starts from 1
      take: params.pageSize,
    });
  }

  ngAfterViewInit() {
    this.setSort();
    this.setHeight();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['restaurants']?.currentValue) {
      this.dataSource = new MatTableDataSource(
        changes['restaurants'].currentValue
      );
      this.setSort();
      setTimeout(() => this.setHeight());
    }
  }
}
