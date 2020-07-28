import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HistoryDetails } from '../Models/HistoryDetails';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) { }

  getHistory(url) :Observable<History[]>{
      return this.http.get<History[]>(url).pipe();
  }
  getDetails(url) :Observable<HistoryDetails>{
    return this.http.get<HistoryDetails>(url).pipe();
}
}

  