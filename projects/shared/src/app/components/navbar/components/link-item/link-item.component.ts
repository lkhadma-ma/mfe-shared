import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-item',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent {
  @Input() label!: string;
  @Input() href!: string;
  @Input() alert: string = '';
  @Input() notification: boolean = false;
  @Input() home: boolean = false;

  @ContentChild('icon') iconTemplate!: TemplateRef<any>;
}

