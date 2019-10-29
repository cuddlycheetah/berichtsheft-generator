import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIBetriebService } from '../api/apibetrieb.service';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import Betrieb from '../api/betrieb';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public dataBetriebe: Observable<Betrieb[]>;

  public loginFormGroup: FormGroup;
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public apiBetrieb: APIBetriebService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      username: [this.storage.get('$username') || '', Validators.required],
      password: ['', Validators.required],
      betrieb: [this.storage.get('$betrieb') || '', Validators.required],
    });
  }
  async ngOnInit() {
    this.dataBetriebe = this.apiBetrieb.getAll();
    await this.authService.getStatus();
  }
  login() {
    this.storage.set('$username', this.loginFormGroup.value.username);
    this.storage.set('$betrieb', this.loginFormGroup.value.betrieb);
    this.authService.login(this.loginFormGroup.value);
  }
}
