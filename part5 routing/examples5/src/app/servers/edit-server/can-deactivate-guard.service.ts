import { CanComponentDeactivated } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivated> {

  constructor() { }

  canDeactivate(component: CanComponentDeactivated,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

                  return component.canDeactivate();

  }
}

export interface CanComponentDeactivated {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
