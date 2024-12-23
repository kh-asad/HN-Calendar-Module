import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.css']
})
export class InfoTooltipComponent implements OnInit {

  @Input() event: any;
  visible = false;
  positionX = 0;
  positionY = 0;

  constructor() { }

  ngOnInit(): void {
    console.log('called')
  }

  showTooltip(x: number, y: number) {
    this.positionX = x;
    this.positionY = y;
    this.visible = true;
  }

  hideTooltip() {
    this.visible = false;
  }

}
