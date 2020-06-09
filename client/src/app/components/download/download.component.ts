import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
  providers: [StoreService] 
})
export class DownloadComponent implements OnInit {
  public localOrders: any

  constructor(public _ss: StoreService) { }

  ngOnInit() {
  }

  public download() {
    let filename: string = null
    let num: string = null
    this._ss.getOrders().subscribe(
      res => {
        this.localOrders = res
        num = this.localOrders.length
        filename = "bill_" + num + ".txt"
        console.log(filename, 'FILE NAME')
        this._ss.downloadBill(filename).subscribe(
          blob => importedSaveAs(blob, "your_bill.txt"),
          err => console.log(err)            
        )
      },
      err => console.log(err)
    )   
  }
}
