import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Vorlage from '../api/vorlage';
import { APITemplatesService } from '../api/apitemplates.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

const arrayToObject = (array, keyField) => array.reduce(
  (obj, item) => {
    obj[item[keyField]] = item;
    return obj;
}, {});

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
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.vorlagenDetails = this.route.snapshot.data.vorlage;
    this.vorlagenDetailsInitial = JSON.parse(JSON.stringify(this.vorlagenDetails));

    this.vorlage = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      tage: this.formBuilder.array([
        this.initDay(0),
        this.initDay(1),
        this.initDay(2),
        this.initDay(3),
        this.initDay(4),
      ]),
    });

    this.vorlage.get('name').setValue(this.vorlagenDetailsInitial.name);
    if (this.vorlagenDetailsInitial.tage.length === 0) {
      this.vorlage.setControl('tage',
        this.formBuilder.array([
          this.initDay(0),
          this.initDay(1),
          this.initDay(2),
          this.initDay(3),
          this.initDay(4),
        ])
      );
    } else {
      this.vorlage.setControl('tage', this.formBuilder.array(
        this.vorlagenDetailsInitial.tage.map(tag => {
          return this.formBuilder.group({
            uuid: [ tag.uuid || false ],
            id: this.formBuilder.control(tag.id),
            start: this.formBuilder.control(tag.start, Validators.required),
            ende: this.formBuilder.control(tag.ende, Validators.required),
            pause: this.formBuilder.control(tag.pause, Validators.required),
            krank: [ tag.krank ],
            frei: [ tag.frei ],
            taetigkeiten: this.formBuilder.array(
              tag.taetigkeiten.map(taetigkeit => {
                return this.formBuilder.array([
                  this.formBuilder.control(taetigkeit[0] || ''), // legacy support
                  this.formBuilder.control(taetigkeit[1] || '', [ Validators.required, Validators.maxLength(180) ]),
                  this.formBuilder.control(taetigkeit[2] || '0:00', [ Validators.required, Validators.maxLength(6) ])
                ]);
              })
            ),
          });
        })
      ));
    }
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
      uuid: [ false ],
      id: this.formBuilder.control(dayIndex),
      start: this.formBuilder.control(0, Validators.required),
      ende: this.formBuilder.control(0, Validators.required),
      pause: this.formBuilder.control(0, Validators.required),
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

  async save() {
    const data = this.vorlage.value; // modified data
    const objTage = JSON.parse(
      JSON.stringify(
        arrayToObject(this.vorlagenDetailsInitial.tage, 'id')
      )
    ); // original day array
    console.log('ORIGINAL', this.vorlagenDetailsInitial);
    console.log('MODIFIED', data);
    const diffAddUpdate = {
      tage: data.tage.filter((_) => {
        if (_.uuid === false) {return true; }
        if (objTage[_.id] === undefined) {return true; }
        if (objTage[_.id].start !== _.start) {return true; }
        if (objTage[_.id].ende !== _.ende) {return true; }
        if (objTage[_.id].pause !== _.pause) {return true; }
        if (objTage[_.id].erweitert !== _.erweitert) {return true; }
        if (objTage[_.id].krank !== _.krank) {return true; }
        if (objTage[_.id].frei !== _.frei) { return true; }
        if (JSON.stringify(objTage[_.id].taetigkeiten) !== JSON.stringify(_.taetigkeiten)) { return true; }
      })
      .map((_) => {
        const update = {
          uuid: _.uuid
        } as any;

        if (_.uuid === false) {
          update.id = '' + _.id;
        }
        if (objTage[_.id] === undefined) {
          console.log('insert tagesbericht')
          if (_.start) { update.start = _.start; }
          if (_.ende) { update.ende = _.ende; }

          if (_.pause) { update.pause = _.pause; }
          if (_.erweitert) { update.erweitert = _.erweitert; }

          if (_.taetigkeiten) { update.taetigkeiten = _.taetigkeiten; }

          if (_.krank) { update.krank = _.krank; }
          if (_.frei) { update.frei = _.frei; }
          return update;
        }

        if (objTage[_.id].start !== _.start) { update.start = _.start; }
        if (objTage[_.id].ende !== _.ende) { update.ende = _.ende; }
        if (objTage[_.id].pause !== _.pause) { update.pause = _.pause; }
        if (objTage[_.id].erweitert !== _.erweitert) { update.erweitert = _.erweitert; }

        if (objTage[_.id].krank !== _.krank) { update.krank = _.krank; }
        if (objTage[_.id].frei !== _.frei) { update.frei = _.frei; }

        if (JSON.stringify(objTage[_.id].taetigkeiten) !== JSON.stringify(_.taetigkeiten)) { update.taetigkeiten = _.taetigkeiten; }
        return update;
      })
    };
    const diffDelete = {
      tage: this.vorlagenDetailsInitial.tage.filter((_) => {
        // ! look at this, its shitty old legacy code
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.tage.length; i++) {
          const tagesBericht = data.tage[i];
          if (tagesBericht && tagesBericht.uuid === _._id) {
            return false;
          }
        }
        // console.log(_._id, data.tage)
        return true;
      }).map(_ => {
        return _._id;
      })
    };
    console.log('DIFF ADD UPDATE', diffAddUpdate);
    console.log('DIFF DELETE', diffDelete);

    (await this.apiTemplates.update(this.vorlagenDetailsInitial.uuid, {
      addUpdate: diffAddUpdate,
      delete: diffDelete
    }))
    .subscribe((res) => {
      this.router.navigate(['main', 'vorlagen']);
    });
        /*$scope.wochentemplates.update(data.uuid, {
          addUpdate: diffAddUpdate,
          delete: diffDelete
        })
      }, modalFactory.nop)*/
  }

}
