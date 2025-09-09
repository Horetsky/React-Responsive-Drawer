import type { RefObject } from "react";
import type { IBottomSheetInternalConfig } from "./configs";
import type { BoundingBox, DragControls, LegacyAnimationControls, PanInfo } from "motion/react";
import type { IBottomSheetStore } from "./store";
import type { Transition } from "motion";

export interface IBottomSheetRootController {
    internalConfig: IBottomSheetInternalConfig;
    dragControls: DragControls;
    animationControls: LegacyAnimationControls;

    dragConstraints: BoundingBox

    store: IBottomSheetStore;

    attach(container: HTMLElement | null): void;

    open(): void;
    close(): void;
    settleSnapPoint(): void;
    setSnapPoint(index: number): void;
    setPositionBySnapIndex(index: number): void;

    getTransitionParams(target: number, start?: number, max?: number): Transition

    drag(info: PanInfo): void;
}

export interface IBottomSheetSnapPointController {
    boundTop: number;
    boundBottom: number;

    /**
     * Calculates and returns the position in pixels for the given index.
     *
     * @param {number} index - The index for which the pixel position should be calculated.
     * @return {number} The position in pixels corresponding to the given index.
     */
    getPositionPxByIndex(index: number): number

    /**
     * Determines the index of the snap point based on the active snap point index, the velocity of the motion,
     * the offset, and optional snap factor parameters.
     *
     * @param {number} activeSnapPointIndex - The current index of the active snap point.
     * @param {number} velocity - The velocity of the motion, which may influence the snap point determination.
     * @param {number} offset - The offset or distance from the current position to the potential snap point.
     * @param {BottomSheetSnapFactorParams} [params] - Optional parameters that can affect the calculation or thresholds for snapping.
     * @return {number} The index of the determined snap point.
     */
    determineSnapPointIndex(
        activeSnapPointIndex: number,
        velocity: number,
        offset: number,
        params?: BottomSheetSnapFactorParams
    ): number
}

export type BottomSheetExternalController = RefObject<IBottomSheetRootController | null>;

export type BottomSheetSnapFactorParams = {
    snapVelocityThreshold?: number,
    slowSwipeThreshold?: number,
    hysteresisFactor?: number,
    attractionDistanceFactor?: number,
};