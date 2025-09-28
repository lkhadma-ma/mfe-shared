import { Injectable, signal, WritableSignal } from '@angular/core';

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
  get alerts() { return this._alerts; }
  private nextId = 1;

  show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', timeout = 5000, icon?: string) {
    const alert: Alert = { id: this.nextId++, message, type, timeout, icon };
    this._alerts.set([...this._alerts(), alert]);

    if (timeout > 0) {
      setTimeout(() => this.close(alert.id), timeout);
    }
    return alert.id;
  }

  close(id: number) {
    this._alerts.set(this._alerts().filter(a => a.id !== id));
  }

  clear() {
    this._alerts.set([]);
  }
}
