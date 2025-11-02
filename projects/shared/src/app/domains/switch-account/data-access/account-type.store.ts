import { Injectable, inject } from "@angular/core";
import { AuthHttpService } from "@shared/auth/auth-http.service";
import { Observable } from "rxjs";
import { AccountType } from "./account.type";


interface AccountTypeResponse {
  accountType: AccountType;
}

@Injectable({ providedIn: 'root' })
export class AccountTypeStore {
  private http = inject(AuthHttpService);
  private readonly baseUrl = 'http://localhost:8080/mbe-user/api/v1';

  checkAccountType(username: string): Observable<AccountTypeResponse> {
    return this.http.get<AccountTypeResponse>(`${this.baseUrl}/users/check-account-type?username=${username}`);
  }

  switchAccountType(newAccountType: AccountType): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/switch-account-type`, {
      accountType: newAccountType
    });
  }
}
