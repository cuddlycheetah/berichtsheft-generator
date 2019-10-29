import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { APIProfileService } from '../api/apiprofile.service';
import { MatDialog } from '@angular/material';
import { NutzungsbedingungendialogComponent } from '../nutzungsbedingungendialog/nutzungsbedingungendialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor (
    private authService: AuthService,
    public dialog: MatDialog,
    public apiProfile: APIProfileService,
  ) { }

  ngOnInit() {
    this.checkAndAnnoy();
  }
  public async checkAndAnnoy() {
    (await this.apiProfile.fetch())
    .subscribe((res) => {
      console.log(res);
      if (!!res.accepted) { return true; }// AGB/TOS akzeptiert
      const dialogRef = this.dialog.open(NutzungsbedingungendialogComponent, {
        width: '90%',
        height: '75%',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.checkAndAnnoy();
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}
