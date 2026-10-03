interface AppState {
    draggedElement: HTMLElement | null;
    originalIndex: number | undefined;
    offsetX: number;
    offsetY: number;
}

const state: AppState = $state({
    draggedElement: null,
    originalIndex: undefined,
    offsetX: 0,
    offsetY: 0,
});

export default state;