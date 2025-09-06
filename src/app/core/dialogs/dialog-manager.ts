// src/app/core/services/dialog-manager.service.ts
import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef, DialogData } from './dialog';

interface ComponentType<T> {
  new (...args: any[]): T;
}

/**
 * Servicio central para manejar diálogos en la app.
 * Usa `Dialog` (basado en Angular CDK Overlay) y
 * mantiene un registro de componentes por nombre.
 */
@Injectable({ providedIn: 'root' })
export class DialogManager {
  private dialog = inject(Dialog);

  // Registro interno de componentes que se pueden abrir como diálogos
  private componentRegistry = new Map<string, ComponentType<any>>();

  /** Registrar un componente individual */
  registerComponent<T>(name: string, component: ComponentType<T>) {
    this.componentRegistry.set(name, component);
    return this; // permite chaining
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
  }): DialogRef {
    return this.dialog.openDialog(component, config);
  }

  /** Cerrar el diálogo activo */
  closeDialog() {
    this.dialog.closeDialog();
  }

  /** Obtener lista de nombres registrados */
  getRegisteredComponents(): string[] {
    return Array.from(this.componentRegistry.keys());
  }
}
