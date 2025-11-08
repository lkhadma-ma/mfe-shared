import { Injectable, inject } from '@angular/core';
import { AuthHttpService } from '@shared/auth/auth-http.service';
import { UserShortView } from './user';

@Injectable({providedIn: 'root'})
export class UserService {
    authHttpService =inject(AuthHttpService);
    private readonly baseUrl = 'http://localhost:8080/mbe-user/api/v1';
    
    loadShortUserView() {
        return this.authHttpService.get<UserShortView>(`${this.baseUrl}/users/mfe-shared/view`);
    }
}