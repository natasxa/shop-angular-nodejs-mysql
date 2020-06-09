import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public filtered: any

  constructor(public _ss: StoreService, public data: DataService) { }

  ngOnInit() {
  }
  public handleKeyDown(request) {
    console.log(request)
    this._ss.getItems().subscribe(
      (res: Array<any>) => {
        console.log(res)//,
        this.filtered = res.filter(res => res.name.toLowerCase().includes(request.toLowerCase()));
        console.log(this.filtered)
        this.data.changeItemsToShow(this.filtered)
      },
      err => console.log(err)
    )
  }

}
