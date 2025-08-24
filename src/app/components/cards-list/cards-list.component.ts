import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../types/location.interface';
import { GetUnitsService } from '../../services/get-units.service';


@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  @Input() unitsList: Location[] = [];

  constructor() {}

  ngOnInit(): void {
  }
}
