import { Injectable, inject, signal } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { User } from './user';

@Injectable({providedIn: 'root'})
export class UserStore {
    http = inject(AuthHttpService);
    private readonly baseUrl = 'http://localhost:8080/mbe-user/api/v1';

    private userSignal = signal<User | null>(null);

    user = this.userSignal.asReadonly();

    loadUser() {
        this.http.get<User>(`${this.baseUrl}/users/mfe-shared/view`)
            .subscribe({
                next: (user)=>{
                    this.userSignal.set(user);
                },
                error: ()=>{
                    this.userSignal.set(null);
                }
            });
    }
}