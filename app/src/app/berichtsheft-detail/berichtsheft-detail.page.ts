import { Component, OnInit } from '@angular/core';
import { Berichtsheft } from '../api/berichtsheft';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-berichtsheft-detail',
  templateUrl: './berichtsheft-detail.page.html',
  styleUrls: ['./berichtsheft-detail.page.scss'],
})
export class BerichtsheftDetailPage implements OnInit {

  public berichtsheftDetails: Berichtsheft = {} as Berichtsheft;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.berichtsheftDetails = this.route.snapshot.data.berichtsheft;
  }

}
