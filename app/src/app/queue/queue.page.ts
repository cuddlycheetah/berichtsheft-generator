import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIQueueService } from '../api/apiqueue.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit, OnDestroy {
  private session;
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
    .subscribe((data: any) => this.socketData.next(data));
  }
  ngOnDestroy() {
    if (!!this.session) { this.session.unsubscribe(); }
  }

}
