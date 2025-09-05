// src/app/core/services/dialog-manager.service.ts
import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef, DialogData } from './dialog';

interface ComponentType<T> {
    new (...args: any[]): T;
}

@Injectable({ providedIn: 'root' })
export class DialogManager {
    private dialog = inject(Dialog);
    
    // Registro de componentes disponibles
    private componentRegistry = new Map<string, ComponentType<any>>();
    
    // Registrar componente
    registerComponent<T>(name: string, component: ComponentType<T>) {
        this.componentRegistry.set(name, component);
        return this; // Para chaining
    }

    // Registrar múltiples componentes
    registerComponents(components: { [name: string]: ComponentType<any> }) {
        Object.entries(components).forEach(([name, component]) => {
            this.registerComponent(name, component);
        });
        return this;
    }

    // Abrir dialog por nombre
    openDialog(componentName: string, config?: {
        data?: DialogData;
        disableClose?: boolean;
        width?: string;
        height?: string;
    }): DialogRef | null {
        const component = this.componentRegistry.get(componentName);
        if (!component) {
            console.error(`Component "${componentName}" not registered`);
            return null;
        }

        return this.dialog.openDialog(component, config);
    }

    // Abrir dialog directamente con componente
    openDialogComponent<T>(component: ComponentType<T>, config?: {
        data?: DialogData;
        disableClose?: boolean;
        width?: string;
        height?: string;
    }): DialogRef {
        return this.dialog.openDialog(component, config);
    }

    // Cerrar dialog actual
    closeDialog() {
        this.dialog.closeDialog();
    }

    // Obtener componentes registrados
    getRegisteredComponents(): string[] {
        return Array.from(this.componentRegistry.keys());
    }

    
}