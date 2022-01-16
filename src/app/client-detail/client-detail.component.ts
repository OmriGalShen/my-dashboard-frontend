import { Component, Input, OnInit } from '@angular/core';
import { ClientDetails } from '../models/API_Classes';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
  @Input() details: ClientDetails;
  constructor() {}

  ngOnInit(): void {}
}
