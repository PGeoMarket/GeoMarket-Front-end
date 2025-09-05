import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { inject, Injectable, TemplateRef, ViewContainerRef } from "@angular/core";
import { filter, merge } from "rxjs";

interface ComponentType<T> {
    new (...args: any[]): T;
}


@Injectable({
  providedIn: 'root'
})
export class Dialog {
  private overlay = inject(Overlay);

    private overlayRef!: OverlayRef;

    openDialog<T = unknown>(componentOrTemplate: ComponentType<T> | TemplateRef<T>, viewContainerRef?: ViewContainerRef) {
        const config = this.getOverlayConfig();
        const overlayRef = this.overlay.create(config);
        this.overlayRef = overlayRef;
        let portal: ComponentPortal<T> | TemplatePortal<T>;
        if(componentOrTemplate instanceof TemplateRef) {
            if(!viewContainerRef) return;
            portal = new TemplatePortal(componentOrTemplate, viewContainerRef);
        } else {
            portal = new ComponentPortal(componentOrTemplate);
        }

        overlayRef.attach(portal);
        this.overlayDetachment(overlayRef);
    }

    getOverlayConfig(): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
            panelClass: 'float-window',
            hasBackdrop: true,
        });
        return state;
    }

    overlayDetachment(overlayRef: OverlayRef) {
        const backdropClick$ = overlayRef.backdropClick();
        const escapeKey$ = overlayRef.keydownEvents()
            .pipe(
                filter((event: KeyboardEvent) => event.key === 'Escape')
            );


            //Click fuera del panelClass o ESC cierra ventana
        /* merge(backdropClick$, escapeKey$).subscribe(() => {
            this.overlayRef.dispose();
        }) */
    }

    closeDialog() {
        this.overlayRef?.dispose();
    }  
}
