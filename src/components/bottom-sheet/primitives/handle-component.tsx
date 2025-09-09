"use client";

import type { ComponentProps, PointerEvent } from "react";
import { useBottomSheet } from "../bottom-sheet.context.ts";


import styles from "../bottom-sheet.module.scss";
import cx from "classnames";

export namespace BottomSheetHandle {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetHandle = ({
    className,
    onPointerDown,
    ...props
}: BottomSheetHandle.Props) => {
    const { controller } = useBottomSheet();
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if(controller.current.internalConfig.handleOnly) {
            controller.current.dragControls.start(event);
        }
        onPointerDown?.(event);
    };
    return (
        <div
            className={cx(
                styles.bottomSheet__handle,
                className,
            )}
            onPointerDown={handlePointerDown}
            {...props}
        />
    );
};
