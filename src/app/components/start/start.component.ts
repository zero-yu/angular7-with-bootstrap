import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnChanges {

  constructor() { }

  @Input('startNumber') stars: number = 1;

  @Input('startLimit') limit: number = 5;

  @Output() startNumberChange: EventEmitter<number> = new EventEmitter();

  public listStars: Array<Boolean> = [];

  @Input() private readonly: boolean = true;

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateStarts(this.stars);
  }

  onClick(index: number) {
    if (!this.readonly) {
      this.generateStarts(index + 1);
    }
  }

  generateStarts(startNum: number): void {
    this.listStars = [];
    for (let i = 0; i < this.limit; i++) {
      this.listStars.push((i + 1) > startNum);
    }
    this.stars = startNum;
    this.startNumberChange.emit(startNum);
  }

}
