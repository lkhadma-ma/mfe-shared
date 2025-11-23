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

  // default icons
  private defaultIcons: Record<string, string> = {
    info: 'M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    success: 'M5 13l4 4L19 7',
    warning: 'M12 9v4m0 4h.01M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z',
    error: 'M6 18L18 6M6 6l12 12'
  };

  show(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    timeout = 5000,
    icon?: string
  ) {
    const alert: Alert = { 
      id: this.nextId++, 
      message, 
      type, 
      timeout, 
      icon: icon ?? this.defaultIcons[type] 
    };
    this._alerts.set([...this._alerts(), alert]);

    if (!this.containerEl) this.createContainer();
    this.render();

    if (timeout > 0) setTimeout(() => this.hide(alert.id), timeout);

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
  
    const isMobile = window.innerWidth < 768;
  
    if (isMobile) {
      // Mobile → bottom center
      Object.assign(this.containerEl.style, {
        position: 'fixed',
        bottom: '4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        minWidth: '350px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column-reverse', // new alerts appear above old ones
        alignItems: 'center',
      });
    } else {
      // Web → top right
      Object.assign(this.containerEl.style, {
        position: 'fixed',
        top: '3rem',
        right: '1rem',
        width: '300px',
        zIndex: '9999',
      });
    }
  
    document.body.appendChild(this.containerEl);
  }
  

  /** Render alerts safely in the DOM */
  private render() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';

    const viewportWidth = window.innerWidth;

    for (const alert of this._alerts()) {
      const el = document.createElement('div');

      // responsive sizing
      let padding = '0.75rem';
      let fontSize = '0.875rem';
      if (viewportWidth < 768) {       // mobile
        padding = '0.5rem';
        fontSize = '0.75rem';
      } else if (viewportWidth < 1024) { // tablet
        padding = '0.65rem';
        fontSize = '0.8125rem';
      }

      Object.assign(el.style, {
        marginTop: '0.75rem',
        padding,
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        fontSize,
        width: '90%',
        transition: 'all 0.2s ease',
        backgroundColor: this.bgColor(alert.type),
        color: this.textColor(alert.type),
      });

      // icon
      if (alert.icon) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('width', fontSize);
        svg.setAttribute('height', fontSize);
        svg.style.marginRight = '0.5rem';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', alert.icon);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');

        svg.appendChild(path);
        el.appendChild(svg);
      }

      // message (safe)
      const span = document.createElement('span');
      span.textContent = alert.message;
      span.style.flex = '1';
      el.appendChild(span);

      // close button
      const btn = document.createElement('button');
      btn.textContent = '×';
      Object.assign(btn.style, {
        position: 'absolute',
        top: '0.25rem',
        right: '0.25rem',
        width: fontSize,
        height: fontSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        background: 'rgba(0,0,0,0.05)',
        fontSize
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
