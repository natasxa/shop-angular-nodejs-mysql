import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //vars for shopping
  public localChoise: number = 3
  public localItems/* : any */
  public isUser: boolean = true

  //vars for my cart
  public openCart: any
  public cart_id: number 
  public isEmpty: boolean = false
  public total: number = null

  public tmp: any

  constructor(public _ss: StoreService, public data: DataService, public _router: Router) { }

  ngOnInit() {
    this.data.currentItemsToShow.subscribe(data => this.localItems = data)
    console.log(this.localItems, 'LOCAL ITEMS')
    this.data.currentItemsInCart.subscribe(data => this.openCart = data)
    console.log(this.openCart, 'ITEMS IN CART')

    //check token:
    this.checkAuth()
  }

  public checkAuth() {
    if (!sessionStorage.token) {
      this._router.navigateByUrl("/login")
    } else {
      if (sessionStorage.isAdmin === "1") {
        this._router.navigateByUrl("/admin")
      } else {
        //check and show what we have in open cart:
        this.getOpenCart()
        //get items to show:
        this.getItemsToShow()
      }
    }
  }

  public getOpenCart() {
    this._ss.getCartByUserId(sessionStorage.user_id).subscribe(
      res => {
        this.tmp = JSON.parse(res),
          console.log(this.tmp),
          this.cart_id = this.tmp[0].id
        console.log(this.cart_id)
        this._ss.getCartByCardId(this.cart_id).subscribe(
          res => {
            this.tmp = res,
              console.log(this.tmp),
              this.tmp === "[]" ? (this.isEmpty = true) : (this.data.changeItemsInCart(JSON.parse(this.tmp)))
            this.tmp === "[]" ? null : (this.getTotal())
            console.log(this.openCart, "openCart")
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  public getItemsToShow() {
    this._ss.getItemsByCategoryId(this.localChoise).subscribe(
      res => this.data.changeItemsToShow(JSON.parse(res)),
      err => console.log(err)
    )
  }

  public getTotal() {
    let tmp: number = 0
    for (let i = 0; i < this.openCart.length; i++) {
      tmp += this.openCart[i].price_all
    }
    this.data.changeTotal(tmp)
  }

  //navigation between categories:
  public handleClick(x) {    
    this.localChoise = x
    this._ss.getItemsByCategoryId(x).subscribe(
      res => this.data.changeItemsToShow(JSON.parse(res)),
      err => console.log(err)
    )
  }
}
