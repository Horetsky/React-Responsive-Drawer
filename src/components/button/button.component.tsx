import type { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Button {
    export type Props = ComponentProps<"button">;
}

export const Button = ({
    children,
    className,
    type = "button",
    ...props
}: Button.Props) => {
    return (
        <button
            className={cx(
                styles.button,
                className,
            )}
            type={type}
            {...props}
        >
            <span>
                { children }
            </span>
        </button>
    );
};
