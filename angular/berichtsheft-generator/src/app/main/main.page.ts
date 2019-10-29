import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor (
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
