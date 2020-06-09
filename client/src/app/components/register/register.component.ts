import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup
  public step1: boolean = true
  public step2: boolean = false
  public errors1: boolean = false
  public errors2: boolean = false
  public checkRegistredUser: any
  public isRegisteredID: boolean = false
  public isRegisteredEmail: boolean = false
  public isMatch: boolean = true
  public filtered: any

  constructor(public fb: FormBuilder, public _us: UsersService, public _ss: StoreService, public _router: Router, public data: DataService) { }

  public checkPasswords(form) {
    let pass = form.get('password').value;
    let confirmPass = form.get('password_confirm').value;
    console.log(pass)
    console.log(confirmPass)
    return pass === confirmPass ? (true) : (false)
  }

  ngOnInit() {
    this.form = this.fb.group({
      user_id: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required],
      password_confirm: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required],
      f_name: ["", Validators.required],
      l_name: ["", Validators.required]
    })
  }

  public handleContinue() {
    console.log("continue pressed")
    console.log(this.form.value)
    this.errors1 = false //remove previous errors
    this.errors1 = true

    if (this.form.controls.user_id.errors === null &&
      this.form.controls.email.errors === null &&
      this.form.controls.password.errors === null &&
      this.form.controls.password_confirm.errors === null) {
      console.log("NO ERRORS")
      //check if ID already registred:
      let id = this.form.get('user_id').value;
      this._us.getUserById(id).subscribe(
        res => {
          this.checkRegistredUser = res,
            this.checkRegistredUser.length > 2 ? (this.isRegisteredID = true) : (this.isRegisteredID = false),
            console.log(this.isRegisteredID, "id is alredy registred")

        },
        err => console.log(err)
      )
      //check if email already registred:
      let checkEmail = this.form.get('email').value;
      this._us.getAllUsers().subscribe(
        res => {
          let tmp = JSON.parse(res)
          this.filtered = tmp.filter(tmp => tmp.email.toLowerCase().includes(checkEmail.toLowerCase()));
          console.log(this.filtered)
          this.filtered.length !== 0 ? (this.isRegisteredEmail = true) : (this.isRegisteredEmail = false)
          console.log(this.isRegisteredEmail, "email is already registred")
          if (!this.isRegisteredID && !this.isRegisteredEmail) {
            //check if passwords match:
            this.isMatch = this.checkPasswords(this.form)
            console.log(this.isMatch, 'isMatch')
            if (this.isMatch) {
              this.step1 = false
              this.errors1 = false
              this.step2 = true
            }
          }
        },
        err => console.log(err)
      )


    }
  }

  public handleSubmit() {
    console.log("submit pressed")
    console.log(this.form.value)
    this.errors2 = true

    if (this.form.controls.city.errors === null &&
      this.form.controls.street.errors === null &&
      this.form.controls.f_name.errors === null &&
      this.form.controls.l_name.errors === null) {
      console.log("NO ERRORS")
      //registration:
      this._us.register(this.form.value).subscribe(
        res => {
          console.log("user created")
          //create cart for user:
          this._ss.createNewCart({ user_id: this.form.get('user_id').value }).subscribe(
            res => {
              console.log("created cart")
              this._router.navigateByUrl("/login")
            },
            err => console.log(err)
          )
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
