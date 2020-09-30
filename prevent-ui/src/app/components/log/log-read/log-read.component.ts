import { LogService } from '../log.service';
import { Log } from '../log.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-log-read',
  templateUrl: './log-read.component.html',
  styleUrls: ['./log-read.component.css']
})
export class LogReadComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filterValues = {};
  dataSource = new MatTableDataSource<Log>();
  displayedColumns = ['id', 'data', 'ip', 'request', 'status', 'useragent','action']

  filterSelectObj = [];

  constructor(private logService: LogService) {

    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'id',
        options: []
      }, {
        name: 'Data',
        columnProp: 'data',
        options: []
      }, {
        name: 'IP',
        columnProp: 'ip',
        options: []
      }, {
        name: 'Request',
        columnProp: 'request',
        options: []
      }, {
        name: 'Status',
        columnProp: 'status',
        options: []
      }, {
        name: 'User Agent',
        columnProp: 'useragent',
        options: []
      }
    ]
  }


  ngOnInit(): void {

    this.dataSource.filterPredicate = this.createFilter();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.logService.read().subscribe(logs => {
      this.dataSource.data = logs

      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(logs, o.columnProp);
      });

    })
  }

  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

}
