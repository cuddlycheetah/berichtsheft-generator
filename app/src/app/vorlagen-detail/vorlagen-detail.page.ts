import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Vorlage from '../api/vorlage';
import { APITemplatesService } from '../api/apitemplates.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-vorlagen-detail',
  templateUrl: './vorlagen-detail.page.html',
  styleUrls: ['./vorlagen-detail.page.scss'],
})
export class VorlagenDetailPage implements OnInit {

  public vorlage: FormGroup;
  public vorlagenDetails: Vorlage = {} as Vorlage;
  public vorlagenDetailsInitial: Vorlage = {} as Vorlage;
  public dayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  constructor(
    private formBuilder: FormBuilder,
    private apiTemplates: APITemplatesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.vorlage = this.formBuilder.group({
      tage: this.formBuilder.array([
        this.initDay(0),
        this.initDay(1),
        this.initDay(2),
        this.initDay(3),
        this.initDay(4),
      ]),
    });
    this.vorlagenDetails = this.route.snapshot.data.vorlage;
    this.vorlagenDetailsInitial = JSON.parse(JSON.stringify(this.vorlagenDetails));
  }
  initTaetigkeit() {
    const arr =  this.formBuilder.array([
      this.formBuilder.control(''), // legacy support
      this.formBuilder.control('', [ Validators.required, Validators.maxLength(180) ]),
      this.formBuilder.control('0:00', [ Validators.required, Validators.maxLength(6) ])
    ]);
    return arr;
  }
  initDay(dayIndex) {
    return this.formBuilder.group({
      uuid: [ '' ],
      id: this.formBuilder.control(dayIndex),
      start: [ 0, Validators.required ],
      ende: [ 0, Validators.required ],
      pause: [ 0, Validators.required ],
      krank: [ false ],
      frei: [ '' ],
      taetigkeiten: this.formBuilder.array([
      ]),
    });
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
