import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface DialogData {
  quantity: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public router: Router, public _data: DataService) {
    //disable click outside mat-dialog to close it:
    dialogRef.disableClose = true;
  }

  //handle cancel for shopping page:
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {    
  }
}
