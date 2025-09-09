"use client";

import { type HTMLMotionProps, motion, useTransform } from "motion/react";
import { MotionValue } from "motion";

import styles from "../bottom-sheet.module.scss";
import cx from "classnames";

export namespace BottomSheetOverlay {
    export type Props = HTMLMotionProps<"div"> & {
        dragYProgress: MotionValue<number>;
        threshold: number;
    };
}

export const BottomSheetOverlay = ({
    dragYProgress,
    threshold,
    className,
    ...props
}: BottomSheetOverlay.Props) => {
    const overlayOpacity = useTransform(
        dragYProgress,
        [0, threshold, 1],
        [0, 0, 1],
    );

    return (
        <motion.div
            style={{ opacity: overlayOpacity }}
            className={cx(
                styles.bottomSheet__overlay,
                className,
            )}
            {...props}
        />
    );
};
