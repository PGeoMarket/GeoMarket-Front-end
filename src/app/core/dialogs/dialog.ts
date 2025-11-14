// src/app/core/services/dialog.service.ts
import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import {
  inject,
  Injectable,
  TemplateRef,
  ViewContainerRef,
  Injector
} from "@angular/core";
import { filter, merge, Subject } from "rxjs";

interface ComponentType<T> {
  new(...args: any[]): T;
}

export interface DialogData {
  [key: string]: any;
}

export interface DialogRef<T = any> {
  close: (result?: T) => void;
  data?: DialogData;
  overlayRef: OverlayRef; // Agregamos referencia al overlay
}

@Injectable({ providedIn: 'root' })
export class Dialog {
  private overlay = inject(Overlay);
  private activeDialogs: DialogRef[] = []; // Array para trackear diálogos activos

  /**
   * Abre un diálogo basado en un Componente o TemplateRef.
   */
  openDialog<T = unknown>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    config?: {
      data?: DialogData;
      viewContainerRef?: ViewContainerRef;
      disableClose?: boolean;
      width?: string;
      height?: string;
      onClose?: (result?: any) => void;
    }
  ): DialogRef {
    // Configuración base
    const overlayConfig = this.getOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);

    // función local de cierre
    const localClose = (result?: any) => {
      // Remover de la lista de diálogos activos
      const index = this.activeDialogs.findIndex(dialog => dialog.overlayRef === overlayRef);
      if (index > -1) {
        this.activeDialogs.splice(index, 1);
      }
      
      // cerrar overlay
      overlayRef.dispose();
      
      // notificar al llamador mediante callback
      if (typeof config?.onClose === 'function') {
        try { config!.onClose(result); } catch (e) { console.error(e); }
      }
    };

    // Crear referencia del diálogo
    const dialogRef: DialogRef = {
      close: (result?: any) => {
        localClose(result);
      },
      data: config?.data,
      overlayRef: overlayRef
    };

    // Agregar a la lista de diálogos activos
    this.activeDialogs.push(dialogRef);

    let portal: ComponentPortal<T> | TemplatePortal<T>;

    if (componentOrTemplate instanceof TemplateRef) {
      if (!config?.viewContainerRef) return dialogRef;
      portal = new TemplatePortal(componentOrTemplate, config.viewContainerRef);
    } else {
      portal = new ComponentPortal(componentOrTemplate);
    }

    // Renderizar
    const componentRef = overlayRef.attach(portal);

    // Pasar data al componente
    if (componentRef?.instance) {
      const dataWithClose = Object.assign({}, config?.data, { _close: localClose });
      Object.assign(componentRef.instance, dataWithClose);
    }

    // Cerrar con clic en backdrop o tecla Escape
    if (!config?.disableClose) {
      const backdropClick$ = overlayRef.backdropClick();
      const escapeKey$ = overlayRef.keydownEvents()
        .pipe(filter((event: KeyboardEvent) => event.key === 'Escape'));

      merge(backdropClick$, escapeKey$).subscribe(() => localClose());
    }

    return dialogRef;
  }

  /** Configuración de overlay */
  private getOverlayConfig(config?: any): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: new GlobalPositionStrategy()
        .centerHorizontally()
        .centerVertically(),
      panelClass: 'float-window',
      hasBackdrop: true,
      width: config?.width || 'auto',
      height: config?.height || 'auto',
    });
  }

  /** Cierra el diálogo activo (último abierto) */
  closeDialog() {
    if (this.activeDialogs.length > 0) {
      const lastDialog = this.activeDialogs.pop();
      lastDialog?.overlayRef.dispose();
    }
  }

  /** Cierra todos los diálogos activos */
  closeAllDialogs() {
    // Cerrar en orden inverso (del más reciente al más antiguo)
    while (this.activeDialogs.length > 0) {
      const dialog = this.activeDialogs.pop();
      dialog?.overlayRef.dispose();
    }
  }

  /** Obtiene el número de diálogos activos */
  getDialogCount(): number {
    return this.activeDialogs.length;
  }

  /** Obtiene la referencia del diálogo activo (último) */
  getActiveDialog(): DialogRef | null {
    return this.activeDialogs.length > 0 ? this.activeDialogs[this.activeDialogs.length - 1] : null;
  }
}