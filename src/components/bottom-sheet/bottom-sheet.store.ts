import { action, makeObservable, observable } from "mobx";
import type { IBottomSheetInternalConfig, IBottomSheetStore } from "./types";

export class BottomSheetStore implements IBottomSheetStore {
    positionPx = 0;

    open = false;
    activeSnapPoint: number = 0;
    settledSnapPoint: number = 0;

    constructor(rootConfig: IBottomSheetInternalConfig) {
        makeObservable(this, {
            open: observable,
            activeSnapPoint: observable,
            settledSnapPoint: observable,

            setOpen: action,
            setActiveSnapPoint: action,
            setSettledSnapPoint: action,
        });

        this.open = rootConfig.defaultOpen;
        this.activeSnapPoint = rootConfig.defaultSnapPointIndex;
    }

    setPositionPx(px: number) {
        this.positionPx = px;
    }

    setOpen(state: boolean) {
        this.open = state;
    }

    setActiveSnapPoint(snapPoint: number) {
        this.activeSnapPoint = snapPoint;
    }

    setSettledSnapPoint(index: number) {
        this.settledSnapPoint = index;
    }
}