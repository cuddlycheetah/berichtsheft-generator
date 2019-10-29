import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-nutzungsbedingungendialog',
  templateUrl: './nutzungsbedingungendialog.component.html',
  styleUrls: ['./nutzungsbedingungendialog.component.scss']
})
export class NutzungsbedingungendialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NutzungsbedingungendialogComponent>
  ) { }

  ngOnInit() {
  }

}
