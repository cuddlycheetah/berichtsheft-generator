import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { APITemplatesService } from '../api/apitemplates.service';
import { from, Observable } from 'rxjs';
import Vorlage from '../api/vorlage';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from '../api/host';
@Injectable({
  providedIn: 'root'
})
export class VorlagenDetailResolveService implements Resolve<any> {

  constructor(
    private apiTemplates: APITemplatesService,
  ) { }
  resolve(route: ActivatedRouteSnapshot):
  Promise<any> {
    const vorlage = route.paramMap.get('vorlage');
    return new Promise(async (res, rej) => {
      (await this.apiTemplates.get(vorlage)).subscribe(res, rej);
    });
  }
}
