import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; //if i need it
import { StoreService } from 'src/app/services/store.service';
import { AttachSession } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})
export class UpdateformComponent implements OnInit {
  @Input() localChoise
  public item: any = [];
  public form_update: FormGroup;
  public errors: boolean = false;
  public file: File = null;
  public fileName: string = null;
  public isCategory: boolean = true; //valid
  public isImage: boolean = true; //valid

  constructor(public data: DataService, public fb: FormBuilder, public _router: Router, public _ss: StoreService) { }

  ngOnInit() {
    this.data.currentItemToUpdate.subscribe(data => this.item = data)
    console.log(this.item, "THIS ITEM")

    this.form_update = this.fb.group({
      name: [""],
      price: ["", Validators.pattern("^[0-9]+$")],
      picture: [""],
      category: ["", Validators.pattern("^[0-9]+$")]
    })
  }

  public handleSave() {
    this.errors = true; //refresh
    this.isCategory = true; //refresh
    //check if category is valid / existing:
    let category = this.form_update.get("category").value
    if (category !== "") {
      if (category < 1 || category > 5) {
        this.isCategory = false
      } else {
        this.updateItem()
      }
    } else {
      this.updateItem()
    }
  }

  public updateItem() {
    if (this.form_update.controls.name.errors === null &&
      this.form_update.controls.price.errors === null &&
      this.form_update.controls.picture.errors === null &&
      this.form_update.controls.category.errors === null &&
      this.isImage) {

      let newName: string
      if (this.form_update.get("name").value === "") {
        newName = this.item.name
      } else {
        newName = this.form_update.get("name").value
      }

      let newCategory: number
      if (this.form_update.get("category").value === "") {
        newCategory = this.item.category_id
      } else {
        newCategory = this.form_update.get("category").value
      }

      let newPrice: number
      if (this.form_update.get("price").value === "") {
        newPrice = this.item.price
      } else {
        newPrice = this.form_update.get("price").value
      }

      let trash = this.randomStr(20, '12345abcde')
      console.log(trash)
      let newImage = this.item.img_url + "?r=" + trash
      console.log(newImage)

      this._ss.updateItem({ id: this.item.id, name: newName, category_id: newCategory, price: newPrice, img_url: newImage }).subscribe(
        res => {
          console.log("item updated", res)
          this._ss.getItemsByCategoryId(this.localChoise).subscribe(
            res => {
              console.log(res)
              this.data.changeItemsToShow(JSON.parse(res))
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      )
    }
  }

  public randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
      ans +=
        arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  public onFileSelected(event) {
    this.isImage = true //refresh
    this.file = <File>event.target.files[0]
    console.log(this.file)
    if (this.file) {
      if (this.file.type === "image/png" ||
        this.file.type === "image/jpg" ||
        this.file.type === "image/jpeg") {
        this.fileName = this.file.name
      } else {
        this.isImage = false
      }
    } else {
      this.fileName = null
    }
  }

}
