import { Component, OnInit } from '@angular/core';
import { APIBerichtshefteService } from '../api/apiberichtshefte.service';
import { Berichtsheft } from '../api/berichtsheft';

@Component({
  selector: 'app-berichtsheft',
  templateUrl: './berichtsheft.page.html',
  styleUrls: ['./berichtsheft.page.scss'],
})
export class BerichtsheftPage implements OnInit {
  private displayedColumns = ['name', 'kwoffset', 'uuid'];
  public listBerichtshefte: Berichtsheft[] = [];

  constructor(
    private apiBerichtsheft: APIBerichtshefteService,
  ) { }
  ngOnInit() {
    this.refresh();
  }
  selectBerichtsheft(row) {
    console.log(row);
  }
  async refresh() {
    (await this.apiBerichtsheft.getAll())
    .subscribe((data: Berichtsheft[]) => {
      this.listBerichtshefte = data;
    });
  }

}
