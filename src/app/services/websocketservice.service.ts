import { Injectable } from '@angular/core';
import { Server } from 'ws';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebsocketserviceService {

  ws: WebSocket;

  constructor() {

  }

  createObserverableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(ob => {
      this.ws.onmessage = (event) => ob.next(event.data),
        this.ws.onerror = (event) => ob.error(event),
        this.ws.onclose = (event) => ob.complete(),
        this.ws.onopen = (event) => this.sendMessage({ productID: id })
      return () => { this.ws.close(); }
    }).pipe(map(message => JSON.parse(message)));
  }

  sendMessage(message: any): void {
    this.ws.send(JSON.stringify(message));
  }
}
