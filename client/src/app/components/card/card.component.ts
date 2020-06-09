import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public item
  @Input() public cart_id
  @Input() public openCart
  @Input() public isEmpty

  //modal
  public email: string;
  public quantity: number;

  public counter = 0
  public filter

  constructor(public _ss: StoreService, public data: DataService, public router: Router, public dialog: MatDialog) { }

  openDialog($event): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '230px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.quantity = result
      console.log(`Dialog result: ${result}`);
      console.log($event.target.id + " is clicked")
      //check if smth is choosed:
      if (this.quantity && result !== "0") {
        //check if cart isn't empty:
        if (this.openCart.length) {
          //check if we already have the item:
          this.filter = this.openCart.filter(item => item.item_id === +$event.target.id)
          console.log(this.filter)
          if (this.filter.length) {
            this.updateItems($event) //update item in cart
          } else {
            this.addItems($event) //add new item
          }
        } else {
          this.addItems($event) //add new item
          this.isEmpty = false
        }
      }
    });
  }

  ngOnInit() {
  }

  public handleClick($event) {
    if (this.router.url === '/shop') {
      console.log('user clicked')
      this.openDialog($event)
    }
    if (this.router.url === '/admin') {
      console.log('admin clicked ' + $event.target.id, this.item)
      this.data.changeItemToUpdate(this.item)
    }
  }

  public updateItems($event) {
    console.log('we need to update existing item in cart!')
    this._ss.updateItemInCart({ item_id: $event.target.id, cart_id: this.cart_id, quantity: this.quantity, price_unit: this.item.price, price_all: this.quantity * this.item.price }).subscribe(
      res => {
        console.log("item is added!")
        this.updateOpenCart()
      },
      err => console.log(err)
    )
  }
  public addItems($event) {
    console.log("let's add a new item in cart!")
    this._ss.addItemToCart({ item_id: $event.target.id, cart_id: this.cart_id, quantity: this.quantity, price_unit: this.item.price, price_all: this.quantity * this.item.price }).subscribe(
      res => {
        console.log("item is added!")
        this.updateOpenCart()
      },
      err => console.log(err)
    )
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

  public getTotal() {
    let total: number = 0
    for (let i = 0; i < this.openCart.length; i++) {
      total += this.openCart[i].price_all
    }
    this.data.changeTotal(total)
  }
}
