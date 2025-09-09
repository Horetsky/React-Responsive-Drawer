import { type PanInfo, useMotionValue, useTransform } from "motion/react";

import { useBottomSheet } from "../bottom-sheet.context";

export function useBottomSheetDrag() {
    const { controller } = useBottomSheet();

    const dragY = useMotionValue(0);
    const dragYProgress = useTransform(
        dragY,
        [
            controller.current.dragConstraints.top === controller.current.dragConstraints.bottom
                ? controller.current.internalConfig.clientHeight
                : controller.current.dragConstraints.bottom,
            controller.current.dragConstraints.top,
        ],
        [0, 1],
    );

    const contentOpacity = useTransform(
        dragY,
        [
            controller.current.internalConfig.clientHeight,
            controller.current.internalConfig.clientHeight - 100,
        ],
        [0, 1],
    );

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) return;
        controller.current.drag(info);
    };

    const handleAnimationComplete = () => {
        controller.current.settleSnapPoint();
    };

    return {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
        handleAnimationComplete,
    };
}