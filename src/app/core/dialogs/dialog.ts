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
  new (...args: any[]): T;
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
    }
  ): DialogRef {
    // Configuración base
    const overlayConfig = this.getOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef = overlayRef;

    // Crear referencia para poder cerrar el diálogo
    const dialogRef: DialogRef = {
      close: (result?: any) => {
        this.closeDialog();
        this.dialogRef.next(result);
      },
      data: config?.data
    };

    let portal: ComponentPortal<T> | TemplatePortal<T>;
    
    if (componentOrTemplate instanceof TemplateRef) {
      // Caso TemplateRef
      if (!config?.viewContainerRef) return dialogRef;
      portal = new TemplatePortal(componentOrTemplate, config.viewContainerRef);
    } else {
      // Caso Componente → inyectamos dialogRef como dependencia
      const injector = Injector.create({
        providers: [{ provide: dialogRef, useValue: dialogRef }]
      });
      portal = new ComponentPortal(componentOrTemplate, null, injector);
    }

    // Renderizar
    const componentRef = overlayRef.attach(portal);

    // Pasar `data` al componente
    if (componentRef?.instance && config?.data) {
      Object.assign(componentRef.instance, config.data);
    }

    // Cerrar con clic en backdrop o tecla Escape
    if (!config?.disableClose) {
      this.overlayDetachment(overlayRef);
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
