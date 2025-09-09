import type { ComponentProps, ReactNode } from "react";

import styles from "../bottom-sheet.module.scss";
import cx from "classnames";

export namespace BottomSheetContent {
    export type Props = Omit<ComponentProps<"div">, "children"> & {
        children: ReactNode | (() => ReactNode)
    };
}

export const BottomSheetContent = ({
    className,
    children,
    ...props
}: BottomSheetContent.Props) => {
    return (
        <div
            className={cx(styles.bottomSheet__content, className)}
            {...props}
        >
            {
                typeof children === "function" ? children() : children
            }
        </div>
    );
};
