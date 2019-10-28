import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIQueueService } from '../api/apiqueue.service';
import { BehaviorSubject } from 'rxjs';

const R_QUEUE_PENDING   = -1,
      R_QUEUE_STARTED   =  0,
      R_QUEUE_ERROR     =  1,
      R_QUEUE_FINISHED  =  2;

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit, OnDestroy {
  private session;
  private renderStatus = {
    [R_QUEUE_PENDING]: 'Geplant',
    [R_QUEUE_STARTED]: 'In Bearbeitung',
    [R_QUEUE_ERROR]: 'Fehler',
    [R_QUEUE_FINISHED]: 'Fertig',
  };
  public socketData = new BehaviorSubject<any>({
    connectionState: 'Unbekannt',
    queueData: {
      queue: [],
      waiting: [],
    },
  });

  constructor(
    private apiQueue: APIQueueService,
  ) {
  }

  ngOnInit() {
    this.session = this.apiQueue.getSocket()
    .subscribe((data: any) => {
      //data.queueData.queue.sort((a, b) => new Date(a.auftragTime).valueOf() < new Date(b.auftragTime).valueOf()); // sorting
      this.socketData.next(data);
    });
  }
  ngOnDestroy() {
    if (!!this.session) { this.session.unsubscribe(); }
  }

}
