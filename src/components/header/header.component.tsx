import type { ComponentProps, ReactNode } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Header {
    export type Props = ComponentProps<"header"> & {
        iconBefore?: ReactNode;
        iconAfter?: ReactNode;
    };
}

export const Header = ({
    iconBefore,
    iconAfter,
    className,
    children,
    ...props
}: Header.Props) => {
    return (
        <header
            className={cx(styles.header, className)}
            {...props}
        >
            <div className={styles.header__left}>
                { iconBefore }
            </div>
            <h2 className={styles.header__title}>
                { children }
            </h2>
            <div className={styles.header__right}>
                { iconAfter }
            </div>
        </header>
    );
};
