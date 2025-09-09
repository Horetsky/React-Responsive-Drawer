import { lerp, normalize } from "../utils/normalize";
import { BottomSheetSnapPointController } from "./snap-point.controller";

import {
    type LegacyAnimationControls,
    type BoundingBox,
    type PanInfo,
    type Transition,
    DragControls,
} from "motion/react";

import type {
    IBottomSheetRootController,
    IBottomSheetStore,
    IBottomSheetSnapPointController,
    IBottomSheetInternalConfig,
} from "../types";

export class BottomSheetRootController implements IBottomSheetRootController {
    private readonly _dragControls: DragControls;
    private readonly _internalConfig: IBottomSheetInternalConfig;
    private readonly _store: IBottomSheetStore;
    private readonly _animationControls: LegacyAnimationControls;

    private snapPointController: IBottomSheetSnapPointController;

    constructor(
        rootConfig: IBottomSheetInternalConfig,
        store: IBottomSheetStore,
        animationControls: LegacyAnimationControls,
    ) {
        this._store = store;
        this._animationControls = animationControls;
        this._internalConfig = rootConfig;
        this._dragControls = new DragControls();
        this.snapPointController = new BottomSheetSnapPointController(rootConfig);
    }

    get internalConfig(): IBottomSheetInternalConfig {
        return this._internalConfig;
    }
    get store(): IBottomSheetStore {
        return this._store;
    }
    get dragControls(): DragControls {
        return this._dragControls;
    }
    get animationControls(): LegacyAnimationControls {
        return this._animationControls;
    }
    get dragConstraints(): BoundingBox {
        return {
            top: this.snapPointController.boundTop,
            bottom: this.snapPointController.boundBottom,
            left: 0, right: 0,
        };
    }

    attach(container: HTMLElement | null) {
        if(container) {
            this._internalConfig.contentHeight = window.innerHeight - container.clientHeight;
            this.snapPointController = new BottomSheetSnapPointController(this._internalConfig);
        }
    }

    open() {
        this._store.setOpen(true);
        this.setPositionBySnapIndex(this._internalConfig.defaultSnapPointIndex);
    }

    close() {
        this._store.setOpen(false);
        this._internalConfig.onClose?.();
        this._store.setPositionPx(0);
        this._store.setActiveSnapPoint(0);
        this._store.setSettledSnapPoint(0);
    }

    settleSnapPoint() {
        this._store.setSettledSnapPoint(this._store.activeSnapPoint);
    }

    setSnapPoint(index: number) {
        this._store.setActiveSnapPoint(index);
        this._internalConfig.onSnapPointChange?.(index);
    }

    drag(info: PanInfo) {
        const velocity = info.velocity.y;
        const position = info.offset.y;

        const currentSnapPointIndex = this._store.activeSnapPoint;
        const lastSnapPointIndex = this._internalConfig.snapPointsCount - 1;
        const isAtBottom = currentSnapPointIndex === lastSnapPointIndex;

        if (velocity >= 30 && isAtBottom) {
            if(this._internalConfig.dismissible) {
                this.close();
            }
            return;
        }

        const snapIndex = this.snapPointController.determineSnapPointIndex(
            currentSnapPointIndex,
            velocity,
            position,
        );

        this.setPositionBySnapIndex(snapIndex);
    }

    setPositionBySnapIndex(index: number) {
        if(index < 0 || index >= this._internalConfig.snapPointsCount) return;

        const y = this.snapPointController.getPositionPxByIndex(index);
        if(y === this._store.positionPx) return;

        this.animationControls.start(
            { y },
            this.getTransitionParams(
                y,
                this._store.positionPx,
                this.snapPointController.boundBottom,
            ),
        );

        this.setSnapPoint(index);
        this._store.setPositionPx(y);
    };

    getTransitionParams(target: number, start: number = 0, max: number = 600): Transition {
        const distance = Math.abs(target - start);
        const normalized = normalize(0, max, distance);

        const minDuration = 0.35;
        const maxDuration = 0.55;
        const duration = lerp(minDuration, maxDuration, normalized);

        return {
            type: "tween",
            duration,
            ease: [0.22, 1, 0.36, 1],
        };
    }
}