import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  public number_of_items: number
  public number_of_orders: number
  public localOrders: any
  public localItems: any
  public localUser: any
  public localCartByID: any
  public localCartByCartID: any
  public localOrdersByID: any
  public isLogged: boolean
  public errors: boolean = false
  public name: string
  public date: string = ""

  constructor(public fb: FormBuilder, public _us: UsersService, public _router: Router, private data: DataService) { }

  ngOnInit() {
    this.data.currentName.subscribe(name => this.name = name)
    this.data.currentIsLogged.subscribe(l => this.isLogged = l)

    //form for login:
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })

    //check logged user
    this.checkAuth()
  }

  public checkAuth() {
    if (sessionStorage.token) {
      this.name = sessionStorage.f_name
      this.data.changeIsLogged(true)
    }
    if (this.name === 'guest') {
      this.isLogged = false
    }
  }

  public log() {
    this.errors = false //refresh
    this.errors = true
    console.log(this.form.value)
    this.errors = true
    this._us.login(this.form.value).subscribe(
      res => {
        sessionStorage.token = JSON.parse(res).token
        sessionStorage.f_name = JSON.parse(res).f_name
        sessionStorage.user_id = JSON.parse(res).user_id
        sessionStorage.isAdmin = JSON.parse(res).isAdmin
        sessionStorage.city = JSON.parse(res).city
        sessionStorage.street = JSON.parse(res).street
        this.data.changeName(JSON.parse(res).f_name)
        this.data.changeIsLogged(true)
        //redirect admin to admin page:
        if (sessionStorage.isAdmin === "1") {
          this._router.navigateByUrl("/admin")
        } else {
          this._router.navigateByUrl("/shop")
        }
      },
      err => console.log("error")
    )
  }
}
