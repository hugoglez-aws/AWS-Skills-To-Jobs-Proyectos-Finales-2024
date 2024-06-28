declare var google: any;

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor(private router: Router) {
    const storedRole = sessionStorage.getItem('Rol');
    if (storedRole) {
      this.roleSubject.next(storedRole);
    }
  }

  setRole(role: string) {
    sessionStorage.setItem('Rol', role);
    this.roleSubject.next(role);
  }

  getRole(): string | null {
    return sessionStorage.getItem('Rol');
  }

  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.clear();
    this.roleSubject.next(null);
    this.router.navigate(['/']);
  }

}
