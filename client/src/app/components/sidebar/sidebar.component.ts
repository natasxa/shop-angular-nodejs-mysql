import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isCreating = false;
  public change = "active";
  public add = "passive";

  //vars for my cart
  @Input() public openCart
  @Input() public cart_id
  @Input() localChoise
  public isEmpty: boolean = false
  public total: number = null

  public tmp: any

  constructor(public data: DataService, public fb: FormBuilder, public router: Router, public _ss: StoreService/* public http: HttpClient */) { }

  ngOnInit() {
    this.data.currentTotal.subscribe(num => this.total = num)
    console.log(this.total, 'CURRENT TOTAL')

  }

  public changeColor() {
    if (this.isCreating) {
      this.add = "active"
      this.change = "passive"
    } else {
      this.add = "passive"
      this.change = "active"
    }
  }

  public getTotal() {
    let tmp: number = 0
    for (let i = 0; i < this.openCart.length; i++) {
      tmp += this.openCart[i].price_all
    }
    this.data.changeTotal(tmp)
  }

  //delete items from my cart
  public handleDelete($event) {
    console.log($event.target.id + ' item id and ' + this.cart_id + ' cart id')
    if ($event.target.id === "0") {
      console.log('DELETE ALL')
      this._ss.deleteAllItems(this.cart_id).subscribe(
        res => {
          console.log(res)
          this.updateOpenCart()
        },
        err => console.log(err)
      )
    } else {
      this._ss.deleteOneItem({ item_id: +$event.target.id, cart_id: this.cart_id }).subscribe(
        res => {
          console.log(res)
          this.updateOpenCart()
        },
        err => console.log(err)
      )
    }
  }

  public updateOpenCart() {
    this._ss.getCartByCardId(this.cart_id).subscribe(
      res => {
        this.openCart = JSON.parse(res)
        console.log('UPDATED OPEN CART', this.openCart)
        this.data.changeItemsInCart(this.openCart)
        this.getTotal()
      },
      err => console.log(err)
    )
  }
}

