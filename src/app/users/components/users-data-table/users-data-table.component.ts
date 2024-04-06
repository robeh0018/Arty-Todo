import {Component, Input, OnChanges, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIcon} from "@ng-icons/core";
import {UserTableData} from "../../models";
import {formatDatesForUI} from "../../../helpers";
import {NgClass} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";


@Component({
  selector: 'app-users-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltip,
    NgIcon,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './users-data-table.component.html',
  styles: `
    .mat-mdc-table {
      background-color: var(--back-ground-color);
    }

  `
})
export class UsersDataTableComponent implements OnChanges {
  displayedColumns: WritableSignal<string[]> = signal<string[]>([]);
  dataSource: MatTableDataSource<UserTableData> = new MatTableDataSource<UserTableData>();
  // sortedUserTableData: WritableSignal<UserTableData[]> = signal<UserTableData[]>([]);

  @Input({required: true}) userTableData: UserTableData[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {

    // Assign the data to the data source for the users-data-table to render
    this.dataSource = new MatTableDataSource(this.userTableData);
  }

  ngOnChanges() {
    if (this.userTableData) {
      this.getDisplayedColumns(this.userTableData);

      this.dataSource = new MatTableDataSource(this.userTableData);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  public handleTableTimes(time: string) {

    return formatDatesForUI(new Date(time))
  };

  public handleDeleteUser() {
    console.log('delete')
  }

  public handleAddUser() {
    console.log('add')
  }

  public handleEditUser() {
    console.log('edit')
  }

  private getDisplayedColumns(usersTableData: UserTableData[]) {

    if (this.userTableData.length === 0) return;

    const displayedColumns = [...Object.keys(usersTableData[0]), 'actions'];

    this.displayedColumns.set(displayedColumns);
  }
}

