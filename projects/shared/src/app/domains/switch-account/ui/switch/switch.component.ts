import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfe-shared-switch',
  host: { class: 'z-10 cursor-pointer absolute top-[0rem] right-[-.25rem] hover:scale-105 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md mt-3 mr-3' },
  template: `
  <i class="fa-solid fa-repeat"></i>
  `
})
export class SwitchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
