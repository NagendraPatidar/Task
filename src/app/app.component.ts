import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from './service-component/common.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SearchUser';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allRepro: Object;
  @ViewChild('searchInput') searchInput: ElementRef;
  allUsers = [];
  searchCtrl: FormControl;
  totalValue = 0;
  page = 1;
  _pageIndex = 1;
  //set order values asc and des for sorting
  sortByList = [{ value: 'login', viewValue: 'Name (Ascending)' },
  { value: '-login', viewValue: 'Name (Descending)' },
  { value: 'score', viewValue: 'Rank (Ascending)' },
  { value: '-score', viewValue: 'Rank (Descending)' }];
  sortBy: FormControl = new FormControl();
  sortElementBy: any;
  // constructor
  constructor(
    private newHttp: HttpClient,
    public commonService: CommonService
  ) {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.subscribe(res => {
      this.allUsers = [];
      this.commonService.getSearchResults(res, this.page)
        .subscribe(a => {
          this.allUsers = a.items;
          this.totalValue = a.total_count;
          this.allUsers.forEach(a => a.mode = 'C');
        })
    })
  }
  SortBy(formValues) {
    this.sortElementBy = [];
    formValues.value ? this.sortElementBy = formValues.value : null;
  }
  //use pagination
  nextPage(paginator) {
    this.commonService.getSearchResults(this.searchCtrl.value, this.paginator.pageIndex+ 1).subscribe(res => {
      this.allUsers = res.items;
      this.allUsers.forEach(a => a.mode = 'C');
    })
    console.log(paginator);
  }
  //get user details through url
  viewDetails(item) {
    if (item.mode == 'C') {
      item.mode = 'D'
      this.allRepro = [];
      this.newHttp.get('https://api.github.com/users/' + item.login + '/repos').subscribe(res => {
        this.allRepro = res;
      })
    } else {
      item.mode = 'C'
    }
  }
  ngOnInIt() {
  }
}

