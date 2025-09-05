// src/app/core/services/dialog.service.ts
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { inject, Injectable, TemplateRef, ViewContainerRef, Injector } from "@angular/core";
import { filter, merge, Subject } from "rxjs";

interface ComponentType<T> {
    new (...args: any[]): T;
}

export interface DialogData {
    [key: string]: any;
}

export interface DialogRef<T = any> {
    close: (result?: T) => void;
    data?: DialogData;
}

@Injectable({
  providedIn: 'root'
})
export class Dialog {
    private overlay = inject(Overlay);
    private overlayRef!: OverlayRef;
    private dialogRef = new Subject<DialogRef>();

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
        const overlayConfig = this.getOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);
        this.overlayRef = overlayRef;

        // Crear referencia del dialog
        const dialogRef: DialogRef = {
            close: (result?: any) => {
                this.closeDialog();
                this.dialogRef.next(result);
            },
            data: config?.data
        };

        let portal: ComponentPortal<T> | TemplatePortal<T>;
        
        if(componentOrTemplate instanceof TemplateRef) {
            if(!config?.viewContainerRef) return dialogRef;
            portal = new TemplatePortal(componentOrTemplate, config.viewContainerRef);
        } else {
            // Crear injector personalizado para pasar datos
            const injector = Injector.create({
                providers: [
                    { provide: dialogRef, useValue: dialogRef }
                ]
            });
            portal = new ComponentPortal(componentOrTemplate, null, injector);
        }

        const componentRef = overlayRef.attach(portal);
        
        // Pasar datos al componente si es ComponentPortal
        if (componentRef?.instance && config?.data) {
            Object.assign(componentRef.instance, config.data);
        }

        if (!config?.disableClose) {
            this.overlayDetachment(overlayRef);
        }

        return dialogRef;
    }

    getOverlayConfig(config?: any): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
            panelClass: 'float-window',
            hasBackdrop: true,
            width: config?.width || 'auto',
            height: config?.height || 'auto',
        });
        return state;
    }

    overlayDetachment(overlayRef: OverlayRef) {
        const backdropClick$ = overlayRef.backdropClick();
        const escapeKey$ = overlayRef.keydownEvents()
            .pipe(
                filter((event: KeyboardEvent) => event.key === 'Escape')
            );

        merge(backdropClick$, escapeKey$).subscribe(() => {
            this.closeDialog();
        });
    }

    closeDialog() {
        this.overlayRef?.dispose();
    }
}