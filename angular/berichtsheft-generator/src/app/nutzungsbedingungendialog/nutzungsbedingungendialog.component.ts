import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { APIProfileService } from '../api/apiprofile.service';

@Component({
  selector: 'app-nutzungsbedingungendialog',
  templateUrl: './nutzungsbedingungendialog.component.html',
  styleUrls: ['./nutzungsbedingungendialog.component.scss']
})
export class NutzungsbedingungendialogComponent implements OnInit {
  private acceptAGB = false;
  private acceptDSGVO = false;

  constructor(
    public dialogRef: MatDialogRef<NutzungsbedingungendialogComponent>,
    private apiProfile: APIProfileService,
  ) { }

  ngOnInit() {
  }
  async accept() {
    (await this.apiProfile.accept())
    .subscribe((res) => {
      this.dialogRef.close(true);
    });
  }
}
