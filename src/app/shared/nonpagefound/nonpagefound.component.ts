import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nonpagefound',
  templateUrl: './nonpagefound.component.html',
  styleUrls: ['./nonpagefound.component.css']
})
export class NonpagefoundComponent implements OnInit {

  public currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
