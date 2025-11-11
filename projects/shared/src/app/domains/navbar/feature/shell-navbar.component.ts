import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LinkItemComponent } from '../ui/link-item/link-item.component';
import { UserService } from '../data-access/user.store';
import { UserShortView } from '../data-access/user';

@Component({
  selector: 'app-navbar',
  imports: [NgTemplateOutlet, LinkItemComponent, RouterLink],
  template: `
    @if (user()) {
    <main class="fixed w-full top-0 z-20 hidden px-8 shadow bg-white md:block">
      <div class="flex items-center max-w-6xl mx-auto md:justify-between">
        <ng-container *ngTemplateOutlet="leftNavItems"></ng-container>
        <ng-container *ngTemplateOutlet="rightNavItems"></ng-container>
      </div>
    </main>
    }

    <ng-template #leftNavItems>
      <div class="flex flex-1 items-center space-x-2">
        <!-- Logo -->
        <a routerLink="/home">
          <img class="w-8 h-8" src="logoNoBg.png" alt="Me" />
        </a>

        <!-- Search (visible only on lg and up) -->
        <div class="w-full hidden md:block">
          <div
            class="flex transition-all duration-300 items-center xl:w-80 focus-within:w-[90%] w-60 space-x-3 py-1.5 px-3 rounded bg-[#EEF3F7]"
          >
            <i class="fa-solid fa-search text-gray-500 text-sm"></i>
            <input
              (focus)="goToSearchRoute()"
              (input)="onInput($event)"
              type="text"
              placeholder="Search"
              class="bg-[#EEF3F7] w-full focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #rightNavItems>
      <div>
        <div class="flex items-center space-x-8 text-gray-500">
          <!-- Home -->
          <app-link-item label="feeds" href="/lk/feed" [home]="true" alert="">
            <ng-template #icon>
              <i class="fa-solid fa-house-chimney-crack text-xl"></i>
            </ng-template>
          </app-link-item>

          <!-- My Network -->
          <!-- <app-link-item label="My Network" href="/my-network">
            <ng-template #icon>
              <i class="fa-solid fa-users text-xl"></i>
            </ng-template>
          </app-link-item> -->

          <!-- Job -->
          <app-link-item label="Job" href="/job">
            <ng-template #icon>
              <i class="fa-solid fa-briefcase text-xl"></i>
            </ng-template>
          </app-link-item>

          <!-- Messaging -->
          <!-- <app-link-item label="Messaging" href="/chat">
            <ng-template #icon>
              <i class="fa-solid fa-comment-dots text-xl"></i>
            </ng-template>
          </app-link-item> -->

          <!-- Notifications -->
          <!-- <app-link-item
            label="Notifications"
            href="/Notifications"
            [notification]="true"
            alert="1">
            <ng-template #icon>
              <i class="fa-solid fa-bell text-xl"></i>
            </ng-template>
          </app-link-item> -->

          <!-- Avatar -->
          <a
            [routerLink]="['/lk', user()?.username]"
            class="flex flex-col items-center justify-center"
          >
            <img class="rounded-full w-7 h-7" [src]="user()?.avatar" alt="Me" />
            <div class="hidden lg:block">
              <span class="flex items-center text-xs">
                Me
                <i class="ti ti-arrow-sorted-down ml-1 text-base"></i>
              </span>
            </div>
          </a>

          <!-- Divider -->
          <div class="border-r border-gray-200 h-14"></div>

          <!-- Work -->
          <app-link-item label="Work" href="/work">
            <ng-template #icon>
              <i class="fa-solid fa-grip text-xl"></i>
            </ng-template>
          </app-link-item>

          <!-- Learning -->
          <app-link-item label="Learning" href="/learning">
            <ng-template #icon>
              <i class="fa-solid fa-graduation-cap text-xl"></i>
            </ng-template>
          </app-link-item>
        </div>
      </div>
    </ng-template>

    <main class="md:hidden">
      <!-- Top bar: avatar + search + chat -->
      <div class="max-w-6xl px-5 py-2 mx-auto bg-white">
        <div class="w-full flex items-center justify-between space-x-2">
          <!-- Left: avatar + search -->
          <div class="w-full flex items-center space-x-2">
            <a routerLink="/">
              <img class="w-8 h-8" src="logoNoBg.png" alt="Me" />
            </a>

            <div
              class="w-full flex items-center py-1.5 px-3 rounded bg-[#EEF3F7]"
            >
              <i class="fa-solid fa-search text-gray-500 text-sm"></i>
              <input
                (focus)="goToSearchRoute()"
                (input)="onInput($event)"
                type="text"
                placeholder="Search"
                class="w-full bg-[#EEF3F7] focus:outline-none ml-2"
              />
            </div>
          </div>

          <!-- Right: chat -->
          <!-- <a routerLink="/chat">
            <i class="fa-solid fa-comment-dots text-gray-500 text-xl"></i>
          </a> -->
        </div>
      </div>
    </main>
  `,
})
export class ShellNavbarComponent implements OnInit {

  private router = inject(Router);
  user = signal<UserShortView | null>(null);
  userService = inject(UserService);

  ngOnInit() {
    this.userService.loadShortUserView().subscribe((user) => {
      this.user.set(user);
    });
  }

  goToSearchRoute() {
    this.router.navigate(['/lk/search']);
  }

  /**
   * this parte has dependency outside of microfrontend with "mfe-search"
   */
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const safe = value.replace(/<[^>]*>/g, '').trim();
    window.dispatchEvent(new CustomEvent('mfe-search:domains:all', { detail: safe }));
  }
  
}
