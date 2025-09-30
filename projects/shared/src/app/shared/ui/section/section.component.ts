import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'mfe-shared-section',
  templateUrl: './section.component.html',
  imports: [NgClass]
})
export class SectionComponent {
  ngxClass = input<string>()
}
