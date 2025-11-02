import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="md:hidden">
  <div class="fixed bottom-0 flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white">
    <a routerLink="/lk/feed" class="flex flex-col items-center justify-center">
      <i class="fa-solid fa-house-chimney-crack text-xl"></i>
      <span class="text-xs">Home</span>
    </a>

    <!-- <a routerLink="/" class="flex flex-col items-center justify-center">
      <i class="fa-solid fa-users text-xl"></i>
      <span class="text-xs">My Network</span>
    </a> -->

    <!-- <a routerLink="/" class="flex flex-col items-center justify-center">
      <i class="fa-solid fa-square-plus text-xl"></i>
      <span class="text-xs">Post</span>
    </a> -->

    <a routerLink="/" class="flex flex-col items-center justify-center">
      <i class="fa-solid fa-briefcase text-xl"></i>
      <span class="text-xs">Jobs</span>
    </a>

    <!-- <a routerLink="/" class="flex flex-col items-center justify-center">
      <i class="fa-solid fa-bell text-xl"></i>
      <span class="text-xs">Notifications</span>
    </a> -->

    <a routerLink="/" class="flex flex-col items-center justify-center">
      <i class="fa-solid fa-user text-xl"></i>
      <span class="text-xs">Profile</span>
    </a>
  </div>
</div>
  
  `
})
export class ShellFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
