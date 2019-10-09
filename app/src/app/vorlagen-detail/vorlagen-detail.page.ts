import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Vorlage from '../api/vorlage';

@Component({
  selector: 'app-vorlagen-detail',
  templateUrl: './vorlagen-detail.page.html',
  styleUrls: ['./vorlagen-detail.page.scss'],
})
export class VorlagenDetailPage implements OnInit {

  public vorlagenDetails: Vorlage = {} as Vorlage;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.vorlagenDetails = this.route.snapshot.data.vorlage;
  }

}
