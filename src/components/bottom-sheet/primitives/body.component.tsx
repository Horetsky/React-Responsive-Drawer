"use client";

import { useCallback, useEffect, useState } from "react";
import { type HTMLMotionProps, motion, MotionValue } from "motion/react";

import { useBottomSheet } from "../bottom-sheet.context";
import { useBottomSheetDrag } from "../hooks";

import { BottomSheetOverlay } from "./overlay.component.tsx";

import styles from "../bottom-sheet.module.scss";
import cx from "classnames";

export namespace BottomSheetBody {
    export type Props = HTMLMotionProps<"div"> & {
        dragYProgress?: MotionValue<number>;
    };
}

export const BottomSheetBody = ({
    style,
    className,
    dragYProgress: externalDragYProgress,
    ...props
}: BottomSheetBody.Props) => {
    const { controller, store } = useBottomSheet();

    const [ready, setReady] = useState(false);

    const containerRef = useCallback((element: HTMLElement | null) => {
        controller.current.attach(element);
        setReady(true);
    }, [controller]);

    const {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
        handleAnimationComplete,
    } = useBottomSheetDrag();

    useEffect(() => {
        if(!externalDragYProgress) return;

        externalDragYProgress.set(dragYProgress.get());

        const unsubscribe = dragYProgress.on("change", (latest) => {
            externalDragYProgress.set(latest);
        });

        return () => unsubscribe();
    }, [dragYProgress, externalDragYProgress]);


    useEffect(() => {
        if(ready && store.open) {
            controller.current.open();
        }
    }, [ready]);

    return (
        <>
            {
                controller.current.internalConfig.overlay && (
                    <BottomSheetOverlay
                        dragYProgress={dragYProgress}
                        threshold={controller.current.internalConfig.fadeThreshold}
                    />
                )
            }
            <motion.div
                drag={"y"}
                style={{
                    y: dragY,
                    height: "100%",
                    touchAction: "none",
                    paddingBottom: controller.current.dragConstraints.top,
                }}
                dragListener={false}
                dragControls={controller.current.dragControls}
                transition={controller.current.getTransitionParams(0)}
                initial={{ y: controller.current.internalConfig.clientHeight }}
                exit={{ y: controller.current.internalConfig.clientHeight }}
                animate={controller.current.animationControls}
                dragDirectionLock
                dragConstraints={controller.current.dragConstraints}
                dragElastic={{
                    top: .07,
                    bottom: controller.current.internalConfig.snapPointsCount === 1 ? .2 : .07,
                }}
                onDragEnd={handleDragEnd}
                onAnimationComplete={handleAnimationComplete}
                className={styles.bottomSheet__dragger}
            >
                <motion.div
                    ref={containerRef}
                    style={{
                        opacity: contentOpacity,
                        ...style,
                    }}
                    className={cx(
                        styles.bottomSheet__body,
                        className,
                    )}
                    onPointerDown={(event) => {
                        if(controller.current.internalConfig.dragListener) {
                            controller.current.dragControls.start(event);
                        }
                        event.stopPropagation();
                    }}
                    {...props}
                />
            </motion.div>
        </>
    );
};
