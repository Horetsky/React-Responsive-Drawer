# Advanced React Bottom Sheet

[](https://opensource.org/licenses/MIT)

**Advanced React Bottom Sheet** is a high-performance and highly customizable bottom sheet component for React, written in TypeScript. Its architecture is designed for maximum flexibility, control, and an excellent developer and user experience.

## ✨ Features

* **Multiple Snap Points:** Define any number of snap points using percentages or `"fit-content"` to adapt to the content's height.
* **High-Performance Animations:** Powered by `Framer Motion` for smooth, responsive, and interruptible animations with a dynamic duration based on travel distance.
* **Highly Configurable:** A rich set of props to customize behavior: overlays, dismissibility, handle-only drag, and more.
* **Advanced Drag Physics:** Intuitive snapping logic that considers velocity, direction, and hysteresis for a natural feel.
* **Full State Control:** Manage the component declaratively via props or imperatively from anywhere in your app using the `externalController`.
* **Declarative API:** A simple and intuitive API built with familiar React components (`<BottomSheetRoot>`, `<BottomSheetTrigger>`, `<BottomSheetContent>`).
* **Written in TypeScript:** A 100% typed codebase for ultimate reliability and a great developer experience.

## 🛠️ Usage

The component is designed to be straightforward and easy to integrate.

```jsx
// Usage example
import { useRef } from 'react';
import { Button } from './your-ui-kit';
import { 
    BottomSheetRoot, 
    BottomSheetTrigger, 
    BottomSheetPortal, 
    BottomSheetBody, 
    BottomSheetContent, 
    BottomSheetHandle 
} from './components';
import type { IBottomSheetRootController } from './types';

function App() {
    const controller = useRef<IBottomSheetRootController | null>(null);

    return (
        <BottomSheetRoot externalController={controller} snapPoints={["fit-content", 0.14]}>
            <BottomSheetTrigger>
                <Button>Open</Button>
            </BottomSheetTrigger>
            
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent className={styles.drawer}>
                        <BottomSheetHandle>
                            <Header>Location</Header>
                        </BottomSheetHandle>
                        <div className={styles.content}>
                            {/* ... Your content goes here ... */}
                            <Button onClick={() => controller.current?.close()}>
                                Allow location access
                            </Button>
                        </div>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
}
```

## 🔌 API & Configuration

The component is controlled via props passed to the `<BottomSheetRoot>` component.

| Prop                  | Type                               | Default          | Description                                                                     |
| :-------------------- | :--------------------------------- | :--------------- | :------------------------------------------------------------------------------ |
| `snapPoints`          | `(number \| "fit-content")[]`      | `[0.97]`         | An array of snap points (0 is the top of the screen, 1 is the bottom).          |
| `defaultOpen`         | `boolean`                          | `false`          | If `true`, the sheet will be open on initial render.                            |
| `defaultSnapPointIndex`| `number`                           | `0`              | The index of the snap point to open to by default.                              |
| `overlay`             | `boolean`                          | `true`           | If `true`, a semi-transparent overlay will be rendered in the background.       |
| `dismissible`         | `boolean`                          | `true`           | If `true`, the sheet can be closed by swiping down past the last snap point.    |
| `handleOnly`          | `boolean`                          | `false`          | If `true`, the sheet can only be dragged by the `BottomSheetHandle` component.  |
| `onClose`             | `() => void`                       | `undefined`      | Callback function that is called when the sheet closes.                         |
| `onSnapPointChange`   | `(index: number) => void`          | `undefined`      | Callback function that is called when the active snap point changes.            |
| `externalController`  | `React.MutableRefObject`           | `undefined`      | A ref to get access to the sheet's controller for imperative actions.           |

## 🏛️ Architectural Deep Dive

To ensure maximum flexibility, testability, and separation of concerns, the component's logic is decoupled into several classes:

* **`BottomSheetRootConfig`**: A dedicated class that accepts and validates all initial props, serving as a single source of truth for configuration.
* **`BottomSheetStore`**: A `MobX` store holding the reactive state of the component (e.g., `isOpen`, `activeSnapPoint`).
* **`BottomSheetRootController`**: A central "brain" that contains all the core logic (drag handlers, snap calculations, animations) and is completely independent of the React component tree.
* **`BottomSheetSnapPointController`**: A specialized class responsible for the complex calculations of snap point positions.

This MVC-like pattern inside the component ensures the system is robust, maintainable, and highly extensible.