import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.style.css'],
})
export class CardListComponent implements OnInit {
  title = 'Dashboard';

  constructor() {}

  ngOnInit() {}
}
