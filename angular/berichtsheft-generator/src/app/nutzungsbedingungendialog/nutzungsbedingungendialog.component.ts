import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { APIProfileService } from '../api/apiprofile.service';

@Component({
  selector: 'app-nutzungsbedingungendialog',
  templateUrl: './nutzungsbedingungendialog.component.html',
  styleUrls: ['./nutzungsbedingungendialog.component.scss']
})
export class NutzungsbedingungendialogComponent implements OnInit {
  public acceptAGB = false;
  public acceptDSGVO = false;

  constructor(
    public dialogRef: MatDialogRef<NutzungsbedingungendialogComponent>,
    private apiProfile: APIProfileService,
  ) { }

  ngOnInit() {
  }
  public async accept() {
    (await this.apiProfile.accept())
    .subscribe((res) => {
      this.dialogRef.close(true);
    });
  }
}
