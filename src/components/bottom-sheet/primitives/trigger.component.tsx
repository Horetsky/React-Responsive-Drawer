"use client";

import { type ComponentProps } from "react";
import { useBottomSheet } from "../bottom-sheet.context.ts";

import styles from "../bottom-sheet.module.scss";
import cx from "classnames";

export namespace BottomSheetTrigger {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetTrigger = ({ className, ...props }: BottomSheetTrigger.Props) => {
    const { store } = useBottomSheet();

    return (
        <div
            className={cx(
                styles.bottomSheet__triger,
                className,
            )}
            onClick={() => store.setOpen(true)}
            {...props}
        />
    );
};