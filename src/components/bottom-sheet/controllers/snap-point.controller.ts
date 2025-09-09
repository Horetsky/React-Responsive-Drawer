import type {
    BottomSheetSnapPoint,
    IBottomSheetInternalConfig,
    BottomSheetSnapFactorParams,
    IBottomSheetSnapPointController,
} from "../types";

export class BottomSheetSnapPointController implements IBottomSheetSnapPointController {
    readonly snapPointsArrPx: number[];
    private readonly config: IBottomSheetInternalConfig;

    constructor(
        config: IBottomSheetInternalConfig,
    ) {
        this.config = config;

        /**
         * Order is important (ASC)
         */
        this.snapPointsArrPx = config.snapPoints
            .map(ratio => this.getSnapPointValuePxByRation(ratio))
            .sort((a, b) => a - b);
    }

    get boundTop(): number {
        return this.snapPointsArrPx[0];
    }

    get boundBottom(): number {
        return this.snapPointsArrPx[this.config.snapPointsCount - 1] || this.snapPointsArrPx[0];
    }

    getPositionPxByIndex(index: number): number {
        return this.snapPointsArrPx[index] || this.boundTop;
    }

    getSnapPointValuePxByRation(ratio: BottomSheetSnapPoint): number {
        if(ratio === "fit-content") return this.config.contentHeight;

        if (ratio === undefined || ratio < 0 || ratio > 1) {
            return this.boundTop;
        }
        return this.config.clientHeight - this.config.clientHeight * ratio;
    }

    determineSnapPointIndex(
        activeSnapPointIndex: number,
        velocity: number,
        offset: number,
        params?: BottomSheetSnapFactorParams,
    ): number {
        const snapVelocityThreshold = params?.snapVelocityThreshold || 100,
            slowSwipeThreshold = params?.slowSwipeThreshold || 10,
            hysteresisFactor = params?.hysteresisFactor || 0.1,
            attractionDistanceFactor = params?.attractionDistanceFactor || 0.2;

        const currentSnapY = this.snapPointsArrPx[activeSnapPointIndex] ?? 0;
        const predictedY = currentSnapY + offset;

        if (Math.abs(velocity) > snapVelocityThreshold) {
            return velocity > 0
                ? Math.min(activeSnapPointIndex + 1, this.config.snapPointsCount - 1)
                : Math.max(activeSnapPointIndex - 1, 0);
        }

        if (Math.abs(velocity) > slowSwipeThreshold) {
            const delta = predictedY - currentSnapY;
            if (delta > 10 && velocity > 0) {
                return Math.min(activeSnapPointIndex + 1, this.config.snapPointsCount - 1);
            } else if (delta < -10 && velocity < 0) {
                return Math.max(activeSnapPointIndex - 1, 0);
            }
        }

        let closestIndex = activeSnapPointIndex;
        let minDistance = Infinity;

        for (let i = 0; i < this.config.snapPointsCount; i++) {
            const distance = Math.abs(this.snapPointsArrPx[i] - predictedY);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        const distanceToClosest = Math.abs(this.snapPointsArrPx[closestIndex] - predictedY);
        const distanceToCurrent = Math.abs(this.snapPointsArrPx[activeSnapPointIndex] - predictedY);

        const dir = predictedY > this.snapPointsArrPx[activeSnapPointIndex] ? 1 : -1;
        const neighborIndex = Math.min(Math.max(closestIndex + dir, 0), this.config.snapPointsCount - 1);
        const normalizedHysteresis = Math.abs(this.snapPointsArrPx[neighborIndex] - this.snapPointsArrPx[activeSnapPointIndex]) * hysteresisFactor;

        if (distanceToClosest < distanceToCurrent - normalizedHysteresis) {
            return closestIndex;
        }

        if (distanceToClosest < Math.abs(this.snapPointsArrPx[closestIndex] - this.snapPointsArrPx[activeSnapPointIndex]) * attractionDistanceFactor) {
            return closestIndex;
        }

        return activeSnapPointIndex;
    }
}