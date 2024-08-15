import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../desktop/person';

@Component({
  selector: 'ftapp-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() person!: Person;
  @Input() top: number = 0;  // Y-coordinate
  @Input() left: number = 0; // X-coordinate
}
