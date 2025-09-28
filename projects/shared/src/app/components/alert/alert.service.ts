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
  private nextId = 1;
  private containerEl?: HTMLElement;

  get alerts() { return this._alerts; }

  show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', timeout = 5000, icon?: string) {
    const alert: Alert = { id: this.nextId++, message, type, timeout, icon };
    this._alerts.set([...this._alerts(), alert]);

    if (!this.containerEl) this.createContainer();
    this.render();

    if (timeout > 0) {
      setTimeout(() => this.hide(alert.id), timeout);
    }

    return alert.id;
  }

  hide(id: number) {
    this._alerts.set(this._alerts().filter(a => a.id !== id));
    this.render();
  }

  clear() {
    this._alerts.set([]);
    this.render();
  }

  /** Create the root container in the DOM */
  private createContainer() {
    this.containerEl = document.createElement('div');
    Object.assign(this.containerEl.style, {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      width: '300px',
      zIndex: '9999',
    });
    document.body.appendChild(this.containerEl);
  }

  /** Render alerts safely in the DOM */
  private render() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';

    for (const alert of this._alerts()) {
      const el = document.createElement('div');
      Object.assign(el.style, {
        marginTop: '0.75rem',
        padding: '0.75rem',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
        backgroundColor: this.bgColor(alert.type),
        color: this.textColor(alert.type),
      });

      // Icon
      if (alert.icon) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('class', 'w-5 h-5 mr-2');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', alert.icon);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
        el.appendChild(svg);
      }

      // Message (safe)
      const span = document.createElement('span');
      span.textContent = alert.message;
      span.style.flex = '1';
      el.appendChild(span);

      // Close button
      const btn = document.createElement('button');
      btn.textContent = '×';
      Object.assign(btn.style, {
        position: 'absolute',
        top: '0.25rem',
        right: '0.25rem',
        width: '1.5rem',
        height: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        background: 'rgba(0,0,0,0.05)',
      });
      btn.onclick = () => this.hide(alert.id);
      el.appendChild(btn);

      this.containerEl.appendChild(el);
    }
  }

  /** Helper colors */
  private bgColor(type?: Alert['type']): string {
    switch (type) {
      case 'success': return '#d1fae5';
      case 'warning': return '#fef3c7';
      case 'error': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }

  private textColor(type?: Alert['type']): string {
    switch (type) {
      case 'success': return '#065f46';
      case 'warning': return '#78350f';
      case 'error': return '#991b1b';
      default: return '#374151';
    }
  }
}
