import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-popup',
  standalone: false,
  templateUrl: './common-popup.component.html',
  styleUrl: './common-popup.component.scss'
})
export class CommonPopupComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<CommonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(){
      console.log(this.data);
    }

    closePopup(){
      this.dialogRef.close("cancel");
    }
    onNoClick(): void {
    }

    popupAction(action:any){
      this.dialogRef.close(action)
    }
}
