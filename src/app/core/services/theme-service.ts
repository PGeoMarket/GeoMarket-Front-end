// theme.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'user_theme';
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  public isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // Inicializar después de que la app esté lista
    setTimeout(() => {
      this.initializeTheme();
    });
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.themeKey);
      if (savedTheme) {
        const isDark = savedTheme === 'dark';
        this.isDarkTheme.next(isDark);
        this.applyTheme(isDark);
      } else {
        // Usar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkTheme.next(prefersDark);
        this.applyTheme(prefersDark);
      }
    }
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkTheme.value;
    this.isDarkTheme.next(newTheme);
    this.applyTheme(newTheme);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.themeKey, newTheme ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      
      if (isDark) {
        htmlElement.classList.add('dark');
        htmlElement.style.colorScheme = 'dark';
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.style.colorScheme = 'light';
      }
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}