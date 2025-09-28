import{Component as _,signal as m}from"@angular/core";import{CommonModule as p}from"@angular/common";import{DOCUMENT as R}from"@angular/common";import*as u from"@angular/core";import{inject as A,ANIMATION_MODULE_TYPE as q,\u0275RuntimeError as T,ViewEncapsulation as Y}from"@angular/core";var r=(function(t){return t[t.State=0]="State",t[t.Transition=1]="Transition",t[t.Sequence=2]="Sequence",t[t.Group=3]="Group",t[t.Animate=4]="Animate",t[t.Keyframes=5]="Keyframes",t[t.Style=6]="Style",t[t.Trigger=7]="Trigger",t[t.Reference=8]="Reference",t[t.AnimateChild=9]="AnimateChild",t[t.AnimateRef=10]="AnimateRef",t[t.Query=11]="Query",t[t.Stagger=12]="Stagger",t})(r||{});function h(t,e){return{type:r.Trigger,name:t,definitions:e,options:{}}}function i(t,e=null){return{type:r.Animate,styles:e,timings:t}}function n(t){return{type:r.Style,styles:t,offset:null}}function o(t,e,s=null){return{type:r.Transition,expr:t,animation:e,options:s}}import*as d from"@angular/core";var c=class t{_alerts=m([]);nextId=1;get alerts(){return this._alerts}show(e,s="info",a=5e3,f){let l={id:this.nextId++,message:e,type:s,timeout:a,icon:f};return this._alerts.set([...this._alerts(),l]),a>0&&setTimeout(()=>this.hide(l.id),a),l.id}hide(e){this._alerts.set(this._alerts().filter(s=>s.id!==e))}clear(){this._alerts.set([])}static Component=_({selector:"mfe-shared-alert-container",standalone:!0,imports:[p],template:`
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
    `,animations:[h("fade",[o(":enter",[n({opacity:0,transform:"translateY(-10px)"}),i("200ms ease-out",n({opacity:1,transform:"translateY(0)"}))]),o(":leave",[i("200ms ease-in",n({opacity:0,transform:"translateY(-10px)"}))])])],host:{class:"block w-full fixed top-4 right-4 z-50"}});static AlertContainerComponent;bgClass(e){switch(e){case"success":return"bg-green-100";case"warning":return"bg-yellow-100";case"error":return"bg-red-100";default:return"bg-slate-100"}}textClass(e){switch(e){case"success":return"text-green-600";case"warning":return"text-yellow-600";case"error":return"text-red-600";default:return"text-slate-600"}}static \u0275fac=function(s){return new(s||t)};static \u0275prov=d.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})};export{c as AlertService};
/*! Bundled license information:

@angular/animations/fesm2022/private_export.mjs:
@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v20.1.3
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
