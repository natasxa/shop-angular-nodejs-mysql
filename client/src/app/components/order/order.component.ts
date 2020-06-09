import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Observable } from 'rxjs';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public openCart: any
  public cart_id: number
  public last4digits: string
  public total: number = 0

  public form: FormGroup
  public errors: boolean = false
  public isValid: boolean = true
  public filtered: any
  public tmp: any
  public today: any
  public isAvailable: boolean = true //valid

  constructor(public fb: FormBuilder, public _us: UsersService, public _ss: StoreService, public _router: Router, public data: DataService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50vw',
      data: {}
    });
    //auto-close modal when redirect:
    this._router.events
      .subscribe(() => {
        dialogRef.close();
      });

    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  public checkPasswords(form) {
    let pass = form.get('password').value;
    let confirmPass = form.get('password_confirm').value;
    console.log(pass)
    console.log(confirmPass)
    return pass === confirmPass ? (true) : (false)
  }

  ngOnInit() {
    this.data.currentItemsToShow.subscribe(data => this.openCart = data)
    console.log(this.openCart)
    this.today = new Date().toISOString().split('T')[0];
    console.log(this.today, "TODAY")

    this.form = this.fb.group({
      city: ["", Validators.required],
      street: ["", Validators.required],
      date_delivery: ["", Validators.required],
      credit_card: ["", Validators.required]
    })

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
        this.getCart()
      }
    }
  }

  public getCart() {
    this._ss.getCartByUserId(sessionStorage.user_id).subscribe(
      res => {
        this.tmp = JSON.parse(res),
          console.log(this.tmp),
          this.cart_id = this.tmp[0].id
        console.log(this.cart_id, "CART ID")
        this._ss.getCartByCardId(this.cart_id).subscribe(
          res => {
            this.openCart = JSON.parse(res)
            sessionStorage.cart = JSON.parse(res)
            console.log(this.openCart, "openCart")
            this.data.changeItemsToShow(this.openCart)
            this.openCart === "[]" ? null : (this.getTotal())
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  public getTotal() {
    for (let i = 0; i < this.openCart.length; i++) {
      this.total = this.total + this.openCart[i].price_all
    }
    console.log(this.total, 'total')
  }

  public ontype(request) {
    console.log(request)
    if (request === "") {
      this.getCart()
    } else {
      this.filtered = this.openCart.filter(item => item.name.toLowerCase().includes(request.toLowerCase()));
      console.log(this.filtered)
      this.data.changeItemsToShow(this.filtered)
    }
  }

  public defaultCity() {
    this.form.controls.city.setValue(sessionStorage.city)
  }

  public defaultStreet() {
    this.form.controls.street.setValue(sessionStorage.street)
  }

  public regex() {
    this.isValid = true //refresh
    let cc = this.form.get('credit_card').value;
    //if input contains spaces:
    let num = cc.replace(/ /g, "");
    let str: string = num
    this.last4digits = str.replace(/\d(?=\d{4})/g, "");
    console.log(this.last4digits)

    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    if (visaRegEx.test(num)) {
      console.log(num, "VISA CARD IS VALID")
    } else if (mastercardRegEx.test(num)) {
      console.log(num, "MASTER CARD IS VALID")
    } else if (amexpRegEx.test(num)) {
      console.log(num, "AMERICAN EXPRESS CARD IS VALID")
    } else if (discovRegEx.test(num)) {
      console.log(num, "DISCOVER CARD IS VALID")
    } else {
      this.isValid = false;
      console.log(num, "CREDIT CARD IS INVALID")
    }
  }

  public handleOrder() {
    this.regex()
    this.isAvailable = true //refresh
    this.errors = false //refresh
    this.errors = true
    /*   let dateDel = this.form.get("date_delivery").value
      let doo = new Date(dateDel);
      console.log(new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000)).toISOString().split('T')[0]); */
    if (this.form.controls.city.errors === null &&
      this.form.controls.street.errors === null &&
      this.form.controls.date_delivery.errors === null &&
      this.form.controls.credit_card.errors === null &&
      this.isValid) {
      console.log("NO ERRORS")
      let dd = this.form.get("date_delivery").value
      console.log(dd, "DELIVERY DATE")
      this._ss.checkDateDelivery(dd).subscribe(
        res => {
          let dates = JSON.parse(res)
          console.log(dates)
          if (dates !== "[]") {
            if (dates.length > 2) {
              console.log(dd, "the date is NOT available!")
              this.isAvailable = false
            }
          }
          if (this.isAvailable) {
            this.orderFinish()
          }
        },
        err => console.log(err)
      )
    }
  }

  public orderFinish() {
    sessionStorage.cart_id = this.cart_id
    sessionStorage.total = this.total
    //save order to DB:    
    this._ss.saveOrder({ user_id: sessionStorage.user_id, cart_id: this.cart_id, city: this.form.get("city").value, street: this.form.get("street").value, price_total: this.total, date_delivery: this.form.get("date_delivery").value, date_ordered: this.today, credit_card: this.last4digits }).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    //save bill:
    this._ss.saveBill(this.openCart).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    //clear cart:
    this._ss.deleteAllItems(this.cart_id).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )

    //show message to client:
    this.openDialog()
  }
}
