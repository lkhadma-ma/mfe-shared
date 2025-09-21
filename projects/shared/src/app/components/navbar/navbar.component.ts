import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkItemComponent } from "./components/link-item/link-item.component";

@Component({
  selector: 'app-navbar',
  imports: [
    NgTemplateOutlet,
    LinkItemComponent,
    RouterLink
],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
