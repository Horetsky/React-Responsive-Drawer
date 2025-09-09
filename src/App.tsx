import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot, BottomSheetTrigger,
} from "./components/bottom-sheet";

import { IconArrowLeft } from "./components/icons";
import { Header } from "./components/header";
import { Button } from "./components/button";

import styles from "./app.module.scss";
import { useRef } from "react";
import type { IBottomSheetRootController } from "./components/bottom-sheet/types";

function App() {
    const controller = useRef<IBottomSheetRootController | null>(null);

    return (
        <BottomSheetRoot externalController={controller} snapPoints={["fit-content", .14]}>
            <BottomSheetTrigger>
                <Button>
                    Open
                </Button>
            </BottomSheetTrigger>
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent className={styles.drawer}>
                        <BottomSheetHandle>
                            <Header iconBefore={<IconArrowLeft />}>
                                Location
                            </Header>
                        </BottomSheetHandle>
                        <div className={styles.content}>
                            <div>
                                <h1 className={styles.content__title}>Where’s It Happening?</h1>
                                <p className={styles.content__subtitle}>
                                    Mark the location of your event or specify if it’s online.
                                </p>
                            </div>
                            <Button
                                onClick={() => controller.current?.close()}
                            >
                                Allow location access
                            </Button>
                        </div>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
}

export default App;
