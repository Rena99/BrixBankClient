import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {HistoryService} from 'src/app/account/Services/history.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import {HistoryDetails}from 'src/app/account/Models/HistoryDetails'
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['accountNumber', 'date', 'amount', 'balance', 'debit'];
  ELEMENT_DATA: History[] = [];
  expandedElement: HistoryDetails | null;
  eElement: HistoryDetails | null;
  sortBy: string;
  page=0;
  count=5;
  length=10;
  clicked=false;
  transactionId="";
  dataSource = new MatTableDataSource<History>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  urlPath = "http://localhost:53715/Operations";
  url="http://localhost:56198/TransactionDetails";
  constructor(private historyService: HistoryService) { }
  ngOnChanges(str:string) {
    this.historyService.getHistory(this.urlPath+"/sort/"+this.page+"/"+this.count+"?accountId="+sessionStorage.getItem("currentUser").toString()+"&sort="+str).subscribe({
      next: path => {
        this.ELEMENT_DATA = path;
        this.dataSource = new MatTableDataSource<History>(this.ELEMENT_DATA);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  filter(start:Date, end:Date){
    this.historyService.getHistory(this.urlPath+"/filter/"+this.page+"/"+this.count+"?accountId="+sessionStorage.getItem("currentUser").toString()+"&from="+start+"&to="+end).subscribe({
      next: path => {
        this.ELEMENT_DATA = path;
        this.dataSource = new MatTableDataSource<History>(this.ELEMENT_DATA);
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
    if(transactionId===this.transactionId){
      this.clicked=false;
      this.transactionId="";
      console.log(this.clicked);
    }
    else{
    this.historyService.getDetails(this.url+"/"+transactionId).subscribe({
      next: detail => {
        this.eElement = detail;
        this.clicked=true;
        this.transactionId=transactionId;
        console.log(this.clicked);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  }

  public handlePage(e: any) {
    this.page=e.pageIndex;
    this.count=e.pageSize;
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.historyService.getHistory(this.urlPath+"/"+this.page+"/"+this.count+"?accountId="+sessionStorage.getItem("currentUser").toString()).subscribe({
      next: path => {
        this.ELEMENT_DATA = path;
        this.dataSource = new MatTableDataSource<History>(this.ELEMENT_DATA);
      },
      error: err => {
        console.log(err);
      }
    })
}
}
