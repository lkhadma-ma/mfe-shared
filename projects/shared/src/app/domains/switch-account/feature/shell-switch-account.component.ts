import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwitchComponent } from "projects/shared/src/app/domains/switch-account/ui/switch/switch.component";
import { AccountTypeStore } from '../data-access/account-type.store';
import { AccountType } from '../data-access/account.type';

@Component({
  selector: 'mfe-shared-switch-account',
  imports: [SwitchComponent],
  template: `
   <div class="w-full border rounded-xl bg-white">
    <div class="w-full relative aspect-[16/3] p-4 space-y-4">
      <div class="w-full flex flex-col">
        <div>
          <p class="text-xl font-semibold flex justify-between items-center">
            <span>Switch Account</span>
            <mfe-shared-switch (click)="switchAccoutType()"></mfe-shared-switch>
          </p>
          <p class="text-gray-500">{{switchToAccountType}}</p>
        </div>
      </div>
      
    </div>
  </div>
  `
})
export class ShellSwitchAccountComponent implements OnInit {

  #accountTypeStore = inject(AccountTypeStore);
  #route = inject(ActivatedRoute);
  switchToAccountType: AccountType = AccountType.PERSONAL;

  ngOnInit() {
    this.#route.params.subscribe(params => {
      const username = params['username'];
      this.#accountTypeStore.checkAccountType(username).subscribe(response => {
        this.switchToAccountType = response.accountType === AccountType.PERSONAL ? AccountType.COMPANY : AccountType.PERSONAL;
      });
    });
  }

  switchAccoutType() {
    this.#accountTypeStore.switchAccountType(this.switchToAccountType).subscribe(() => {
      window.location.reload();
    });
  }


}
