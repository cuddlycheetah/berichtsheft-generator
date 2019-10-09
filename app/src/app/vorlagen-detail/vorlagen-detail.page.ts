import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Vorlage from '../api/vorlage';
import { APITemplatesService } from '../api/apitemplates.service';

@Component({
  selector: 'app-vorlagen-detail',
  templateUrl: './vorlagen-detail.page.html',
  styleUrls: ['./vorlagen-detail.page.scss'],
})
export class VorlagenDetailPage implements OnInit {

  public vorlagenDetails: Vorlage = {} as Vorlage;

  constructor(
    private apiTemplates: APITemplatesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.vorlagenDetails = this.route.snapshot.data.vorlage;
  }
  hasDay(dayIndex) {
    return this.vorlagenDetails.tage.filter(tag => tag.index === dayIndex).length > 0;
  }
  addTag(changed) {
    console.log(changed);
  }

}
