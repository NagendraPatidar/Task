import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//get XHR service API for search user
@Injectable()
export class CommonService {
    constructor(private newHttp: HttpClient, ) {
    }
    getSearchResults(searchTerm, page?): Observable<any> {
        return this.newHttp.get('https://api.github.com/search/users?q=' + searchTerm + '&page=' + page)
    }
}
