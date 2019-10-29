import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { APIBerichtshefteService } from '../api/apiberichtshefte.service';

@Injectable({
  providedIn: 'root'
})
export class BerichtsheftDetailResolveService implements Resolve<any> {

  constructor(
    private apiBerichtsheft: APIBerichtshefteService,
  ) { }
  resolve(route: ActivatedRouteSnapshot):
  Promise<any> {
    const berichtsheft = route.paramMap.get('berichtsheft');
    return new Promise(async (res, rej) => {
      (await this.apiBerichtsheft.get(berichtsheft)).subscribe(res, rej);
    });
  }
}
