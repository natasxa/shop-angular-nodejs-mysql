import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public localChoise: number = 3
  public localItems
  public isAdmin: boolean = true

  public tmp: any

  constructor(public _ss: StoreService, public data: DataService, public _router: Router) { }

  ngOnInit() {
    this.data.currentItemsToShow.subscribe(data => this.localItems = data)
    console.log(this.localItems, 'LOCAL ITEMS')

    //check token:
    this.checkAuth()
  }

  public checkAuth() {
    if (!sessionStorage.token) {
      this._router.navigateByUrl("/login")
    } else {
      if (sessionStorage.isAdmin === "0") {
        this._router.navigateByUrl("/shop")
      } else {
        //get items to show
        this._ss.getItemsByCategoryId(this.localChoise).subscribe(
          res => this.data.changeItemsToShow(JSON.parse(res)),
          err => console.log(err)
        )
      }
    }
  }

  //navigation between categories
  public handleClick(x) {
    this.localChoise = x
    this._ss.getItemsByCategoryId(x).subscribe(
      res => this.data.changeItemsToShow(JSON.parse(res)),
      err => console.log(err)
    )
  }


}
