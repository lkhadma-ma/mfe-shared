import { Injectable, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

export interface Alert {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _alerts: WritableSignal<Alert[]> = signal([]);
  private nextId = 1;

  // --- reactive alert state ---
  get alerts() { return this._alerts; }

  show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', timeout = 5000, icon?: string) {
    const alert: Alert = { id: this.nextId++, message, type, timeout, icon };
    this._alerts.set([...this._alerts(), alert]);

    if (timeout > 0) {
      setTimeout(() => this.hide(alert.id), timeout);
    }
    return alert.id;
  }

  hide(id: number) {
    this._alerts.set(this._alerts().filter(a => a.id !== id));
  }

  clear() {
    this._alerts.set([]);
  }

  // --- embedded alert container component ---
  static Component = Component({
    selector: 'mfe-shared-alert-container',
    standalone: true,
    imports: [CommonModule],
    template: `
      <div *ngFor="let alert of alertService.alerts()"
           @fade
           role="alert"
           class="mt-3 relative flex w-full p-3 text-sm rounded-md"
           [ngClass]="bgClass(alert.type) + ' ' + textClass(alert.type)">
        
        <ng-container *ngIf="alert.icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="2" stroke="currentColor" class="h-5 w-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="alert.icon"></path>
          </svg>
        </ng-container>

        <span class="flex-1">{{ alert.message }}</span>

        <button (click)="alertService.hide(alert.id)" type="button"
                class="flex items-center justify-center transition-all w-8 h-8 rounded-md hover:bg-slate-200 active:bg-slate-200 absolute top-1.5 right-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" class="h-5 w-5 text-slate-600" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `,
    animations: [
      trigger('fade', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
        ])
      ])
    ],
    host: { class: 'block w-full fixed top-4 right-4 z-50' }
  })
  public static AlertContainerComponent: any;

  // --- helper methods for styles ---
  bgClass(type: Alert['type']) {
    switch (type) {
      case 'success': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'error': return 'bg-red-100';
      default: return 'bg-slate-100';
    }
  }

  textClass(type: Alert['type']) {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-slate-600';
    }
  }
}
