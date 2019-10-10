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
  public vorlagenDetailsInitial: Vorlage = {} as Vorlage;
  public dayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  constructor(
    private apiTemplates: APITemplatesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.vorlagenDetails = this.route.snapshot.data.vorlage;
    this.vorlagenDetailsInitial = JSON.parse(JSON.stringify(this.vorlagenDetails));
  }
  hasDay(dayIndex) {
    return this.vorlagenDetails.tage.filter(tag => tag.id === dayIndex).length > 0;
  }
  addDay(dayToAdd) {
    dayToAdd = Number(dayToAdd);
    console.log(dayToAdd);
    const tage = this.vorlagenDetails.tage || [];
    let isBeforeAvailable = {
      start: 0,
      ende: 0,
      pause: 0,
      erweitert: 0,
      krank: false,
      frei: '',
      taetigkeiten: [],
    };

    if (tage.length > 0) {
      isBeforeAvailable = tage[tage.length - 1]
    }

    this.vorlagenDetails.tage[dayToAdd] = {
      uuid: false,
      id: dayToAdd,

      krank: isBeforeAvailable.krank || true,
      frei: isBeforeAvailable.frei || '',

      start: isBeforeAvailable.start || 0,
      ende: isBeforeAvailable.ende || 0,

      pause: isBeforeAvailable.pause || 0,
      erweitert: isBeforeAvailable.erweitert || 0,

      taetigkeiten: isBeforeAvailable.taetigkeiten || [],
    };
  }

  save() {

  }

}
