import type { IBottomSheetHandlers } from "./handlers";

export type BottomSheetSnapPoint = number | "fit-content";

export interface IBottomSheetConfigParams extends Partial<IBottomSheetHandlers> {
    snapPoints: BottomSheetSnapPoint[];
    defaultOpen: boolean;
    defaultSnapPointIndex: number;
    overlay: boolean;
    fadeThreshold: number;
    dismissible: boolean;
    handleOnly: boolean;
    touchEvents: boolean;
    dragListener: boolean | undefined;
}

export interface IBottomSheetInternalConfig extends IBottomSheetConfigParams {
    clientHeight: number;
    contentHeight: number;
    snapPointsCount: number;
}