import type { BottomSheetSnapPoint, IBottomSheetInternalConfig } from "./types";

export class BottomSheetRootConfig implements IBottomSheetInternalConfig {
    clientHeight = 0;
    contentHeight = 0;
    snapPoints: BottomSheetSnapPoint[] = [.97];
    snapPointsCount;

    defaultOpen = false;
    defaultSnapPointIndex = 0;
    overlay = true;
    fadeThreshold = .5;
    dismissible = true;
    handleOnly = false;
    dragListener = true;
    touchEvents = false;

    onClose;
    onSnapPointChange;

    constructor(init: Partial<IBottomSheetInternalConfig>) {
        if(init.snapPoints !== undefined) this.snapPoints = init.snapPoints;
        if(init.defaultOpen !== undefined) this.defaultOpen = init.defaultOpen;
        if(init.defaultSnapPointIndex !== undefined) this.defaultSnapPointIndex = init.defaultSnapPointIndex;
        if(init.overlay !== undefined) this.overlay = init.overlay;
        if(init.fadeThreshold !== undefined) this.fadeThreshold = init.fadeThreshold;
        if(init.dismissible !== undefined) this.dismissible = init.dismissible;
        if(init.handleOnly !== undefined) this.handleOnly = init.handleOnly;
        if(init.dragListener !== undefined) this.dragListener = init.dragListener;
        if(init.touchEvents !== undefined) this.touchEvents = init.touchEvents;
        if(init.onClose !== undefined) this.onClose = init.onClose;
        if(init.onSnapPointChange !== undefined) this.onSnapPointChange = init.onSnapPointChange;

        this.snapPointsCount = this.snapPoints.length;

        if(typeof window !== "undefined") {
            this.clientHeight = window.innerHeight;
        }

        if(init.handleOnly) {
            this.dragListener = false;
        }
    }
}