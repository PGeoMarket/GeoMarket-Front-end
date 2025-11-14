// src/app/core/services/dialog-manager.service.ts
import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef, DialogData } from './dialog';

interface ComponentType<T> {
  new (...args: any[]): T;
}

@Injectable({ providedIn: 'root' })
export class DialogManager {
  private dialog = inject(Dialog);

  // Registro interno de componentes
  private componentRegistry = new Map<string, ComponentType<any>>();

  /** Registrar un componente individual */
  registerComponent<T>(name: string, component: ComponentType<T>) {
    this.componentRegistry.set(name, component);
    return this;
  }

  /** Registrar múltiples componentes de golpe */
  registerComponents(components: { [name: string]: ComponentType<any> }) {
    Object.entries(components).forEach(([name, component]) =>
      this.registerComponent(name, component)
    );
    return this;
  }

  /** Abrir un diálogo a partir del nombre registrado */
  openDialog(componentName: string, config?: {
    data?: DialogData;
    disableClose?: boolean;
    width?: string;
    height?: string;
    onClose?: (result?: any) => void;
  }): DialogRef | null {
    const component = this.componentRegistry.get(componentName);

    if (!component) {
      console.error(`Componente "${componentName}" no está registrado`);
      return null;
    }

    return this.dialog.openDialog(component, config);
  }

  /** Abrir un diálogo directamente con el componente (sin usar registro) */
  openDialogComponent<T>(component: ComponentType<T>, config?: {
    data?: DialogData;
    disableClose?: boolean;
    width?: string;
    height?: string;
    onClose?: (result?: any) => void;
  }): DialogRef {
    return this.dialog.openDialog(component, config);
  }

  /** Cierra el diálogo activo (último abierto) */
  closeDialog() {
    this.dialog.closeDialog();
  }

  /** Cierra todos los diálogos activos */
  closeAllDialogs() {
    this.dialog.closeAllDialogs();
  }

  /** Obtiene el número de diálogos activos */
  getDialogCount(): number {
    return this.dialog.getDialogCount();
  }

  /** Obtiene la referencia del diálogo activo */
  getActiveDialog(): DialogRef | null {
    return this.dialog.getActiveDialog();
  }

  /** Obtener lista de nombres registrados */
  getRegisteredComponents(): string[] {
    return Array.from(this.componentRegistry.keys());
  }
}