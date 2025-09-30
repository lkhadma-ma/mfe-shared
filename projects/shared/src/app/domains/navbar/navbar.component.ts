import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkItemComponent } from "./components/link-item/link-item.component";
import { AuthHttpService } from '@shared/auth/auth-http.service';

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

  authHttpService = inject(AuthHttpService);

  ngOnInit() {
  }

}
