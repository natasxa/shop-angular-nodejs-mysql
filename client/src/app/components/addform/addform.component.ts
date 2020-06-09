import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {
  @Input() localChoise
  public form_create: FormGroup;
  public errors: boolean = false;
  public file: File = null;
  public fileName: string = null;
  public isCategory: boolean = true; //valid
  public isImage: boolean = true; //valid

  constructor(public data: DataService, public fb: FormBuilder, public _router: Router, public _ss: StoreService) { }

  ngOnInit() {
    this.form_create = this.fb.group({
      name: ["", Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      picture: [null, Validators.required],
      category: [null, [Validators.required, Validators.pattern("^[0-9]+$")]]
    })
  }

  public handleSave() {
    this.errors = true;
    this.isCategory = true //refresh
    //check if category is valid / existing:
    let category = this.form_create.get("category").value
    console.log(category)
    if (category !== "") {
      if (category < 1 || category > 5) {
        this.isCategory = false
      } else {
        //check form validation:
        if (this.form_create.controls.name.errors === null &&
          this.form_create.controls.price.errors === null &&
          this.form_create.controls.picture.errors === null &&
          this.form_create.controls.category.errors === null &&
          this.isImage) {
          this.addItem()
        }
      }
    }
  }

  public addItem() {
    let newURL: string = null;
    let tmp: any
    //quantity of items:
    this._ss.getItems().subscribe(
      res => {
        tmp = res
        newURL = 'http://localhost:1000/upload/' + (tmp.length + 1) + '.jpg'
        console.log(newURL)        
        this._ss.createNewItem({ name: this.form_create.get("name").value, category_id: this.form_create.get("category").value, price: this.form_create.get("price").value, img_url: newURL }).subscribe(
          res => {
            console.log("added new item", res)
            this._ss.getItemsByCategoryId(this.localChoise).subscribe(
              res => this.data.changeItemsToShow(JSON.parse(res)),
              err => console.log(err)
            )
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
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
