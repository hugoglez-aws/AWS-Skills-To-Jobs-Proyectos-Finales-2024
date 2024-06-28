import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.css']
})
export class ThemeButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.showActiveTheme(this.getPreferredTheme());
    this.setupDropdownMenu();
  }

  setupDropdownMenu(): void {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remover clase activa de todos los elementos
        dropdownItems.forEach(i => i.classList.remove('active'));
        // Agregar clase activa al elemento clickeado
        item.classList.add('active');
        const theme = item.getAttribute('data-theme');
        if (theme !== null) {
          this.switchTheme(theme);
        }
      });
    });
  }

  getStoredTheme(): string | null {
    return localStorage.getItem('theme');
  }

  setStoredTheme(theme: string): void {
    localStorage.setItem('theme', theme);
  }

  getPreferredTheme(): string {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme: string): void {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  showActiveTheme(theme: string, focus = false): void {
    // Implementar la lógica para mostrar el tema activo aquí
  }

  switchTheme(theme: string): void {
    this.setStoredTheme(theme);
    this.setTheme(theme);
    this.showActiveTheme(theme, true);
  }
}
