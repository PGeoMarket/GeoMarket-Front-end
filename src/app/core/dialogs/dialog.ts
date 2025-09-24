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

/** Datos opcionales que se pasan al abrir el diálogo */
export interface DialogData {
  [key: string]: any;
}

/** Referencia que se devuelve al abrir un diálogo */
export interface DialogRef<T = any> {
  close: (result?: T) => void;
  data?: DialogData;
}

/**
 * Servicio bajo nivel que abre/cierra diálogos usando Angular CDK Overlay.
 * Normalmente no lo usas directo: se accede vía `DialogManager`.
 */
@Injectable({ providedIn: 'root' })
export class Dialog {
  private overlay = inject(Overlay);
  private overlayRef!: OverlayRef;
  private dialogRef = new Subject<DialogRef>();

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
      // opcional: callback simple que será llamado cuando se cierre el diálogo
      onClose?: (result?: any) => void;
    }
  ): DialogRef {
    // Configuración base
    const overlayConfig = this.getOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef = overlayRef;

    // función local de cierre que cierra el overlay y notifica al llamador (si pasó onClose)
    const localClose = (result?: any) => {
      // cerrar overlay
      overlayRef.dispose();
      // notificar a quien abrió mediante callback opcional
      if (typeof config?.onClose === 'function') {
        try { config!.onClose(result); } catch (e) { console.error(e); }
      }
      // además notificar al Subject interno (compatibilidad con código existente)
      this.dialogRef.next(result);
    };

    // Crear referencia para poder cerrar el diálogo (usa la localClose)
    const dialogRef: DialogRef = {
      close: (result?: any) => {
        localClose(result);
      },
      data: config?.data
    };

    let portal: ComponentPortal<T> | TemplatePortal<T>;

    if (componentOrTemplate instanceof TemplateRef) {
      // Caso TemplateRef
      if (!config?.viewContainerRef) return dialogRef;
      portal = new TemplatePortal(componentOrTemplate, config.viewContainerRef);
    } else {
      // Caso Componente → mantenemos la creación simple del portal
      // y pasamos la función de cierre vía `data` más abajo.
      portal = new ComponentPortal(componentOrTemplate);
    }

    // Renderizar
    const componentRef = overlayRef.attach(portal);

    // Pasar `data` al componente — inyectamos además la función de cierre simple `_close`
    if (componentRef?.instance) {
      const dataWithClose = Object.assign({}, config?.data, { _close: localClose });
      Object.assign(componentRef.instance, dataWithClose);
    }

    // Cerrar con clic en backdrop o tecla Escape -> usar la misma función localClose
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

  /** Permitir cerrar con clic en backdrop o ESC */
  private overlayDetachment(overlayRef: OverlayRef) {
    const backdropClick$ = overlayRef.backdropClick();
    const escapeKey$ = overlayRef.keydownEvents()
      .pipe(filter((event: KeyboardEvent) => event.key === 'Escape'));

    merge(backdropClick$, escapeKey$).subscribe(() => this.closeDialog());
  }

  /** Cierra el diálogo activo */
  closeDialog() {
    this.overlayRef?.dispose();
  }
}