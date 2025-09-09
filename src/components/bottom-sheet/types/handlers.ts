export interface IBottomSheetHandlers {
    /**
     * A callback function that is invoked whenever the snap point changes.
     *
     * @param {number} snapPointIndex - The index of the current snap point.
     */
    onSnapPointChange(snapPointIndex: number): void;

    /**
     * A callback function that gets executed when a close event is triggered.
     * This function typically handles cleanup or state updates required after
     * an element, dialog, or component has been closed.
     */
    onClose(): void;
}