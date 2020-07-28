import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {HistoryService} from 'src/app/account/Services/history.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import {HistoryDetails}from 'src/app/account/Models/HistoryDetails'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  columnsToDisplay: string[] = ['Account No.', 'Date', 'Amount', 'Balance', 'Credit'];
  ELEMENT_DATA: History[] = [];
  expandedElement: HistoryDetails | null;
  sortBy: string;
  test:any;
  page=0;
  count=5;
  dataSource = this.ELEMENT_DATA;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  urlPath = "'http://localhost:53715/history";
  url="http://localhost:56198/Transaction‏";
  constructor(private historyService: HistoryService) { }
  ngOnChanges(str:string) {
    this.historyService.getHistory(this.urlPath+"/"+str+"/"+this.page+"/"+this.count).subscribe({
      next: path => {
        this.ELEMENT_DATA = path;
        this.dataSource = (this.ELEMENT_DATA);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  filter(start:Date, end:Date){
    this.historyService.getHistory(this.urlPath+"/filter/"+start+"/"+end+"/"+this.page+"/"+this.count).subscribe({
      next: path => {
        this.ELEMENT_DATA = path;
        this.dataSource = (this.ELEMENT_DATA);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  transform(itemList: any, searchKeyword: string) {
    if (!itemList)
      return [];
    if (!searchKeyword)
      return itemList;
    let filteredList = [];
    if (itemList.length > 0) {
      searchKeyword = searchKeyword.toLowerCase();
      itemList.forEach(item => {
        let propValueList = Object.values(item);
        for(let i=0;i<propValueList.length;i++)
        {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1)
            {
              filteredList.push(item);
              break;
            }
          }
        }
      });
    }
    return filteredList;
  }
  getDetails(transactionId: string){
    this.historyService.getDetails(this.url+"/"+transactionId).subscribe({
      next: detail => {
        this.expandedElement = detail;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  public handlePage(e: any) {
    this.page=e.pageIndex;
    this.count=e.pageSize;
    this.ngOnInit();
  }
  ngOnInit(): void {
    this.historyService.getHistory(this.urlPath+"/"+this.page+"/"+this.count).subscribe({
      next: path => {
        this.ELEMENT_DATA = path;
        this.dataSource = (this.ELEMENT_DATA);
      },
      error: err => {
        console.log(err);
      }
    })

}
}
